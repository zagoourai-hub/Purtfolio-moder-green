---
name: ai-service
description: Implementasi fitur AI service (FastAPI/Python ATAU Node.js/TypeScript). Gunakan saat diminta membuat endpoint AI, integrasi LLM, prompt engineering, provider switching, API key management, atau logic AI apapun.
allowed-tools: Read Write Bash(pip *) Bash(python3 *) Bash(uvicorn *) Bash(npm *) Bash(npx *) Bash(node *) Bash(docker *)
argument-hint: "deskripsi fitur AI"
---

# AI Service Skill — FastAPI (Python) atau Node.js (TypeScript)

ai-service bisa dibangun dengan **dua runtime**. KEDUANYA pakai standar yang sama: multi-provider LLM, **AES-256-GCM**, Redis cache, prompt guard 5-layer, BYOK (key terenkripsi server-side).

## Pilih Runtime

| Runtime | Kapan dipakai |
|---------|---------------|
| **Node.js (TypeScript)** | ai-service = gateway LLM murni (chat, summarize, analysis). Mau satu bahasa dengan frontend/backend, shared types, monorepo rapi. **Default untuk mayoritas project.** |
| **Python (FastAPI)** | Ada dependency Python-only: MetaTrader5 (ForexAI), XGBoost/scikit-learn native, pandas/numpy berat, transformers / local model inference. |

> Kalau servicenya cuma gateway LLM tipis, boleh juga jadi modul di backend NestJS (`src/modules/ai/`) tanpa service terpisah. Service terpisah dipakai saat butuh scaling independen atau isolasi bahasa.

---

# 🐍 Runtime A — Python / FastAPI

## Tech Stack (Python)

- **Framework:** FastAPI (Python 3.12+)
- **AI Providers:** Gemini, OpenAI, OpenRouter, Ollama, Groq, DeepSeek, Mistral, Together AI, Cerebras
- **Default Provider:** Gemini (primary) + Ollama (local fallback)
- **Key Encryption:** AES-256-GCM (authenticated encryption) + BLAKE2b keyed hash
- **Caching:** Redis (model response cache, TTL 5 min)
- **Validation:** Pydantic v2

> Standar enkripsi terkunci: **AES-256-GCM** (256-bit, authenticated, nonce unik per operasi). Konsisten dengan standar keamanan project lain (mis. RentEase). JANGAN turun ke AES-128-CBC.

## Folder Structure

```
ai-service/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── chat.py
│   │   │   │   ├── analysis.py
│   │   │   │   └── health.py
│   │   │   └── router.py
│   │   └── deps.py            # Dependencies (auth, rate limit)
│   ├── core/
│   │   ├── config.py          # Pydantic Settings
│   │   ├── security.py        # AES-256-GCM + BLAKE2b
│   │   ├── logging.py         # Structured logger
│   │   └── exceptions.py      # Custom exceptions
│   ├── providers/
│   │   ├── base.py            # Abstract base provider
│   │   ├── gemini.py
│   │   ├── openai.py
│   │   ├── openrouter.py
│   │   ├── ollama.py
│   │   ├── groq.py
│   │   ├── deepseek.py
│   │   ├── mistral.py
│   │   ├── together.py
│   │   ├── cerebras.py
│   │   └── factory.py         # Provider factory
│   ├── schemas/
│   │   ├── chat.py            # Request/Response schemas
│   │   ├── provider.py        # Provider config schemas
│   │   └── common.py          # Shared schemas
│   ├── services/
│   │   ├── chat_service.py
│   │   ├── analysis_service.py
│   │   └── cache_service.py   # Redis cache wrapper
│   ├── prompts/
│   │   └── templates/         # Prompt templates (.txt/.jinja2)
│   ├── middleware/
│   │   ├── rate_limit.py
│   │   └── prompt_guard.py    # Prompt injection protection
│   └── main.py
├── tests/
├── requirements.txt
├── Dockerfile
└── .env.example
```

## Implementation Rules

### Provider Abstraction Layer

```python
# providers/base.py
from abc import ABC, abstractmethod
from pydantic import BaseModel


class LLMResponse(BaseModel):
    content: str
    model: str
    provider: str
    tokens_used: int | None = None
    latency_ms: float | None = None


class BaseLLMProvider(ABC):
    def __init__(self, api_key: str | None = None, base_url: str | None = None) -> None:
        self.api_key = api_key
        self.base_url = base_url

    @abstractmethod
    async def generate(
        self,
        prompt: str,
        system_prompt: str | None = None,
        model: str | None = None,
        temperature: float = 0.7,
        max_tokens: int = 2048,
    ) -> LLMResponse: ...

    @abstractmethod
    async def health_check(self) -> bool: ...
```

### Provider Factory

```python
# providers/factory.py
from .base import BaseLLMProvider
from .gemini import GeminiProvider
from .openai import OpenAIProvider
from .openrouter import OpenRouterProvider
from .ollama import OllamaProvider
from .groq import GroqProvider
from .deepseek import DeepSeekProvider
from .mistral import MistralProvider
from .together import TogetherProvider
from .cerebras import CerebrasProvider

PROVIDERS: dict[str, type[BaseLLMProvider]] = {
    "gemini": GeminiProvider,
    "openai": OpenAIProvider,
    "openrouter": OpenRouterProvider,
    "ollama": OllamaProvider,
    "groq": GroqProvider,
    "deepseek": DeepSeekProvider,
    "mistral": MistralProvider,
    "together": TogetherProvider,
    "cerebras": CerebrasProvider,
}


def create_provider(
    provider_name: str,
    api_key: str | None = None,
    base_url: str | None = None,
) -> BaseLLMProvider:
    provider_class = PROVIDERS.get(provider_name.lower())
    if not provider_class:
        raise ValueError(f"Unknown provider: {provider_name}")
    return provider_class(api_key=api_key, base_url=base_url)
```

### API Key Encryption — AES-256-GCM (Zero-Exposure)

```python
# core/security.py
import base64
import os

from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from hashlib import blake2b

# ENCRYPTION_KEY: 32 byte (256-bit), base64url. Generate sekali, simpan di secret manager.
# HASH_PEPPER: string rahasia untuk keyed-hash (lookup tanpa expose plaintext).
_KEY = base64.urlsafe_b64decode(os.environ["ENCRYPTION_KEY"])
_PEPPER = os.environ["HASH_PEPPER"].encode()

if len(_KEY) != 32:
    raise ValueError("ENCRYPTION_KEY harus 32 byte (256-bit) setelah base64 decode")


def encrypt_api_key(raw_key: str) -> str:
    """Enkripsi authenticated. Nonce 96-bit unik per operasi, disimpan bersama ciphertext."""
    aesgcm = AESGCM(_KEY)
    nonce = os.urandom(12)
    ciphertext = aesgcm.encrypt(nonce, raw_key.encode(), None)
    return base64.urlsafe_b64encode(nonce + ciphertext).decode()


def decrypt_api_key(token: str) -> str:
    data = base64.urlsafe_b64decode(token.encode())
    nonce, ciphertext = data[:12], data[12:]
    aesgcm = AESGCM(_KEY)
    return aesgcm.decrypt(nonce, ciphertext, None).decode()


def hash_api_key(raw_key: str) -> str:
    """Keyed hash (peppered) untuk indexing/verifikasi tanpa menyimpan plaintext."""
    return blake2b(raw_key.encode(), key=_PEPPER, digest_size=32).hexdigest()


def generate_encryption_key() -> str:
    """Helper: hasilkan ENCRYPTION_KEY baru (jalankan sekali)."""
    return base64.urlsafe_b64encode(os.urandom(32)).decode()
```

> Generate key sekali:
> ```bash
> python3 -c "import os,base64; print(base64.urlsafe_b64encode(os.urandom(32)).decode())"
> ```

### Structured Logging

```python
# core/logging.py
import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    stream=sys.stdout,
)

logger = logging.getLogger("ai-service")
```

### Pydantic Schema Pattern

```python
# schemas/chat.py
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=10000)
    provider: str = Field(default="gemini")
    model: str | None = None
    temperature: float = Field(default=0.7, ge=0.0, le=2.0)
    max_tokens: int = Field(default=2048, ge=1, le=16384)
    system_prompt: str | None = None


class ChatResponse(BaseModel):
    content: str
    model: str
    provider: str
    tokens_used: int | None = None
    latency_ms: float | None = None
```

### Endpoint Pattern (error di-log, tidak bocor ke client)

```python
# api/v1/endpoints/chat.py
from fastapi import APIRouter, Depends, HTTPException

from app.api.deps import get_chat_service
from app.core.logging import logger
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    service: ChatService = Depends(get_chat_service),
) -> ChatResponse:
    try:
        return await service.generate(request)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:  # noqa: BLE001 - boundary handler
        logger.exception("Unhandled error in chat endpoint: %s", exc)
        raise HTTPException(status_code=500, detail="AI service error") from exc
```

### Prompt Injection Protection (Defense-in-Depth, 5 Layer)

```python
# middleware/prompt_guard.py
import re

# CATATAN: regex hanya Layer 1 dan MUDAH dibypass. Jangan dijadikan satu-satunya proteksi.
# Pertahanan utama = isolasi system/user prompt (Layer 3) + output validation (Layer 4).
INJECTION_PATTERNS = [
    r"ignore\s+(all\s+)?previous\s+instructions",
    r"you\s+are\s+now\s+",
    r"system\s*:\s*",
    r"<\|im_start\|>",
    r"```system",
]


def sanitize_input(text: str) -> str:
    """Layer 1: Regex pattern matching (heuristik, bukan jaminan)."""
    for pattern in INJECTION_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            raise ValueError("Input contains prohibited patterns")
    return text


def enforce_max_length(text: str, max_len: int = 10000) -> str:
    """Layer 2: Length enforcement."""
    if len(text) > max_len:
        raise ValueError(f"Input exceeds maximum length of {max_len}")
    return text


# Layer 3: System prompt isolation — kirim system & user sebagai message terpisah,
#          JANGAN concat string mentah.
# Layer 4: Output validation — cek output untuk kebocoran data/secret.
# Layer 5: Rate limiting (per-user, per-IP).
```

### Redis Cache Pattern

```python
# services/cache_service.py
import hashlib
import json

from redis.asyncio import Redis


class CacheService:
    def __init__(self, redis: Redis, default_ttl: int = 300) -> None:
        self.redis = redis
        self.default_ttl = default_ttl

    def _make_key(self, provider: str, model: str, prompt: str) -> str:
        content = f"{provider}:{model}:{prompt}"
        return f"ai:cache:{hashlib.sha256(content.encode()).hexdigest()}"

    async def get(self, provider: str, model: str, prompt: str) -> dict | None:
        key = self._make_key(provider, model, prompt)
        data = await self.redis.get(key)
        return json.loads(data) if data else None

    async def set(self, provider: str, model: str, prompt: str, response: dict) -> None:
        key = self._make_key(provider, model, prompt)
        await self.redis.set(key, json.dumps(response), ex=self.default_ttl)
```

### requirements.txt (inti)

```
fastapi
uvicorn[standard]
pydantic
pydantic-settings
cryptography
redis
httpx
slowapi
```

## Larangan

- JANGAN expose API key di response/log — selalu encrypt (AES-256-GCM) / hash
- JANGAN pakai enkripsi non-authenticated atau < 256-bit untuk key sensitif
- JANGAN concat user input langsung ke system prompt — isolasi selalu
- JANGAN skip validation — semua input via Pydantic schema
- JANGAN hardcode provider/model — selalu via config atau request param
- JANGAN buat endpoint tanpa error handling — selalu try/except + HTTPException + logger
- JANGAN return raw LLM error ke client — sanitize, log detail di server

---

# 🟢 Runtime B — Node.js / TypeScript

## Tech Stack (Node.js)

- **Framework:** Fastify (HTTP server ringan, cocok untuk gateway)
- **AI Layer:** Vercel AI SDK 6 (`ai`) — unified `generateText` / `streamText`
- **AI Providers:** `@ai-sdk/google` (Gemini), `@ai-sdk/openai`, `@ai-sdk/groq`, `@ai-sdk/mistral`, `@openrouter/ai-sdk-provider`, `ollama-ai-provider-v2`
- **Key Encryption:** AES-256-GCM via `node:crypto` (built-in, TANPA library) + HMAC-SHA256 keyed hash
- **Caching:** Redis (`ioredis`)
- **Validation:** Zod
- **Runtime:** Node.js >= 20, TypeScript (ESM)

> AI SDK 6 menyatukan semua provider di balik satu API. Ganti provider = ganti 1-2 baris. Streaming, tool calling, dan structured output (`Output.object`) sudah built-in.

## Folder Structure (Node.js)

```
ai-service/
├── src/
│   ├── routes/
│   │   ├── chat.ts            # POST /api/v1/chat
│   │   ├── analysis.ts
│   │   └── health.ts
│   ├── core/
│   │   ├── config.ts          # env loader + validasi Zod
│   │   ├── security.ts        # AES-256-GCM + HMAC
│   │   └── logger.ts          # pino
│   ├── providers/
│   │   └── factory.ts         # resolveModel() — multi-provider
│   ├── schemas/
│   │   └── chat.ts            # Zod request/response
│   ├── services/
│   │   ├── chat.service.ts
│   │   └── cache.service.ts   # Redis wrapper
│   ├── middleware/
│   │   ├── rate-limit.ts      # @fastify/rate-limit
│   │   └── prompt-guard.ts    # prompt injection protection
│   ├── app.ts                 # build Fastify instance
│   └── main.ts                # bootstrap
├── tests/
├── Dockerfile
├── tsconfig.json
├── .env.example
└── package.json
```

## Implementation Rules (Node.js)

### Provider Factory — AI SDK 6 (BYOK-ready)

```typescript
// src/providers/factory.ts
import type { LanguageModel } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { createGroq } from "@ai-sdk/groq";
import { createMistral } from "@ai-sdk/mistral";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createOllama } from "ollama-ai-provider-v2";

export type ProviderName =
  | "gemini"
  | "openai"
  | "openrouter"
  | "ollama"
  | "groq"
  | "mistral";

/**
 * Kembalikan model AI SDK. `apiKey` opsional (BYOK) — kalau null pakai env.
 * Key BYOK yang masuk WAJIB sudah didekripsi (AES-256-GCM) dari storage.
 */
export function resolveModel(
  provider: ProviderName,
  model: string,
  apiKey?: string,
): LanguageModel {
  switch (provider) {
    case "gemini":
      return createGoogleGenerativeAI({ apiKey: apiKey ?? process.env.GEMINI_API_KEY })(model);
    case "openai":
      return createOpenAI({ apiKey: apiKey ?? process.env.OPENAI_API_KEY })(model);
    case "groq":
      return createGroq({ apiKey: apiKey ?? process.env.GROQ_API_KEY })(model);
    case "mistral":
      return createMistral({ apiKey: apiKey ?? process.env.MISTRAL_API_KEY })(model);
    case "openrouter":
      return createOpenRouter({ apiKey: apiKey ?? process.env.OPENROUTER_API_KEY })(model);
    case "ollama":
      return createOllama({ baseURL: process.env.OLLAMA_BASE_URL })(model);
    default:
      throw new Error(`Unknown provider: ${provider satisfies never}`);
  }
}
```

### API Key Encryption — AES-256-GCM (built-in `node:crypto`)

```typescript
// src/core/security.ts
import { randomBytes, createCipheriv, createDecipheriv, createHmac } from "node:crypto";

// ENCRYPTION_KEY: 32 byte (256-bit), base64url. HASH_PEPPER: string rahasia.
const KEY = Buffer.from(process.env.ENCRYPTION_KEY ?? "", "base64url");
const PEPPER = process.env.HASH_PEPPER ?? "";

if (KEY.length !== 32) {
  throw new Error("ENCRYPTION_KEY harus 32 byte (256-bit) setelah base64url decode");
}

export function encryptApiKey(raw: string): string {
  const iv = randomBytes(12); // nonce 96-bit unik per operasi
  const cipher = createCipheriv("aes-256-gcm", KEY, iv);
  const enc = Buffer.concat([cipher.update(raw, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag(); // 16 byte auth tag
  return Buffer.concat([iv, tag, enc]).toString("base64url");
}

export function decryptApiKey(token: string): string {
  const data = Buffer.from(token, "base64url");
  const iv = data.subarray(0, 12);
  const tag = data.subarray(12, 28);
  const enc = data.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", KEY, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
}

export function hashApiKey(raw: string): string {
  // keyed hash (peppered) untuk lookup/verifikasi tanpa simpan plaintext
  return createHmac("sha256", PEPPER).update(raw).digest("hex");
}
```

> Generate `ENCRYPTION_KEY`:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
> ```

### Zod Schema

```typescript
// src/schemas/chat.ts
import { z } from "zod";

export const chatRequestSchema = z.object({
  message: z.string().min(1).max(10000),
  provider: z.enum(["gemini", "openai", "openrouter", "ollama", "groq", "mistral"]).default("gemini"),
  model: z.string().min(1),
  temperature: z.number().min(0).max(2).default(0.7),
  maxOutputTokens: z.number().int().min(1).max(16384).default(2048),
  systemPrompt: z.string().optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

export interface ChatResponse {
  content: string;
  provider: string;
  model: string;
  tokensUsed?: number;
  latencyMs: number;
}
```

### Chat Service (generateText)

```typescript
// src/services/chat.service.ts
import { generateText } from "ai";
import { resolveModel } from "../providers/factory.js";
import type { ChatRequest, ChatResponse } from "../schemas/chat.js";

export async function generateChat(
  input: ChatRequest & { apiKey?: string },
): Promise<ChatResponse> {
  const start = performance.now();

  const result = await generateText({
    model: resolveModel(input.provider, input.model, input.apiKey),
    system: input.systemPrompt, // isolasi: system & prompt TERPISAH (jangan concat)
    prompt: input.message,
    temperature: input.temperature,
    maxOutputTokens: input.maxOutputTokens,
  });

  return {
    content: result.text,
    provider: input.provider,
    model: input.model,
    tokensUsed: result.usage?.totalTokens,
    latencyMs: Math.round(performance.now() - start),
  };
}
```

> Untuk streaming gunakan `streamText` dari `ai` dan pipe `result.toUIMessageStreamResponse()` / `textStream` ke client (SSE).

### Route Handler (Fastify, error di-log tidak bocor)

```typescript
// src/routes/chat.ts
import type { FastifyInstance } from "fastify";
import { chatRequestSchema } from "../schemas/chat.js";
import { generateChat } from "../services/chat.service.js";
import { sanitizeInput } from "../middleware/prompt-guard.js";

export async function chatRoutes(app: FastifyInstance): Promise<void> {
  app.post("/api/v1/chat", async (request, reply) => {
    const parsed = chatRequestSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten() });
    }

    try {
      sanitizeInput(parsed.data.message); // prompt guard (heuristik)
      const result = await generateChat(parsed.data);
      return reply.send(result);
    } catch (err) {
      request.log.error({ err }, "chat endpoint failed");
      return reply.status(500).send({ error: "AI service error" });
    }
  });
}
```

### Prompt Injection Guard

```typescript
// src/middleware/prompt-guard.ts
// CATATAN: regex hanya Layer 1 & mudah dibypass. Pertahanan utama = isolasi
// system/user prompt (kirim terpisah, jangan concat) + output validation.
const INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /you\s+are\s+now\s+/i,
  /system\s*:\s*/i,
  /<\|im_start\|>/i,
  /```system/i,
];

export function sanitizeInput(text: string): string {
  if (text.length > 10000) throw new Error("Input exceeds maximum length");
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(text)) throw new Error("Input contains prohibited patterns");
  }
  return text;
}
```

### Redis Cache (ioredis)

```typescript
// src/services/cache.service.ts
import { createHash } from "node:crypto";
import type { Redis } from "ioredis";

const DEFAULT_TTL = 300; // 5 menit

function makeKey(provider: string, model: string, prompt: string): string {
  const hash = createHash("sha256").update(`${provider}:${model}:${prompt}`).digest("hex");
  return `ai:cache:${hash}`;
}

export function createCacheService(redis: Redis) {
  return {
    async get<T>(provider: string, model: string, prompt: string): Promise<T | null> {
      const data = await redis.get(makeKey(provider, model, prompt));
      return data ? (JSON.parse(data) as T) : null;
    },
    async set(provider: string, model: string, prompt: string, value: unknown): Promise<void> {
      await redis.set(makeKey(provider, model, prompt), JSON.stringify(value), "EX", DEFAULT_TTL);
    },
  };
}
```

### Bootstrap

```typescript
// src/app.ts
import Fastify from "fastify";
import rateLimit from "@fastify/rate-limit";
import { chatRoutes } from "./routes/chat.js";

export function buildApp() {
  const app = Fastify({ logger: true });
  app.register(rateLimit, { max: 10, timeWindow: "1 minute" });
  app.register(chatRoutes);
  app.get("/api/v1/health", () => ({ status: "ok", uptime: process.uptime() }));
  return app;
}

// src/main.ts
import "dotenv/config";
import { buildApp } from "./app.js";

const app = buildApp();
app.listen({ port: Number(process.env.AI_SERVICE_PORT ?? 8000), host: "0.0.0.0" });
```

### package.json (inti)

```jsonc
{
  "type": "module",
  "dependencies": {
    "ai": "^6",
    "@ai-sdk/google": "latest",
    "@ai-sdk/openai": "latest",
    "@ai-sdk/groq": "latest",
    "@ai-sdk/mistral": "latest",
    "@openrouter/ai-sdk-provider": "latest",
    "ollama-ai-provider-v2": "latest",
    "fastify": "^5",
    "@fastify/rate-limit": "latest",
    "ioredis": "latest",
    "zod": "latest",
    "dotenv": "latest"
  },
  "devDependencies": {
    "typescript": "^5.4",
    "tsx": "latest",
    "@types/node": "latest"
  }
}
```

> AGENT RULE: sebelum implement, `web_fetch` halaman provider AI SDK (https://ai-sdk.dev/providers) untuk konfirmasi nama package & API terbaru — provider community (Ollama, OpenRouter) sering update.

### Dockerfile (Node ai-service)

```dockerfile
# docker/ai-service/Dockerfile (varian Node)
FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build   # tsc → dist/

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 appgroup \
  && adduser --system --uid 1001 --ingroup appgroup appuser
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./
USER appuser
EXPOSE 8000
CMD ["node", "dist/main.js"]
```

## Larangan (Node.js)

- JANGAN expose/​log API key — encrypt (AES-256-GCM) sebelum simpan, hash untuk lookup
- JANGAN concat `systemPrompt` + `message` jadi satu string — kirim sebagai field terpisah ke `generateText`
- JANGAN gunakan `any` — type semua request/response (Zod + `z.infer`)
- JANGAN skip validasi — semua input lewat Zod `safeParse`
- JANGAN hardcode provider/model — selalu dari request/config
- JANGAN return raw error LLM ke client — log via `request.log.error`, balas pesan generik

## Task

$ARGUMENTS
