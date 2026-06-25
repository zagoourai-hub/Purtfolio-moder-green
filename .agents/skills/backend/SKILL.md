---
name: backend
description: Implementasi fitur backend NestJS. Gunakan saat diminta membuat endpoint, service, controller, guard, middleware, DTO, Prisma model, migrasi database, atau logic backend apapun.
allowed-tools: Read Write Bash(npx *) Bash(npm *) Bash(pnpm *) Bash(node *) Bash(docker *)
argument-hint: "deskripsi fitur atau endpoint"
---

# Backend Skill — NestJS v11 + Prisma v7

## Tech Stack

- **Framework:** NestJS v11 (Express v5 adapter — default di NestJS 11)
- **ORM:** Prisma v7 (stable). `provider = "prisma-client"`, output `../generated/prisma`, driver adapter wajib.
- **Database:** PostgreSQL 16
- **Cache:** Redis (via `@nestjs-modules/ioredis` atau `cache-manager`)
- **Auth:** bcryptjs + JWT (httpOnly cookie)
- **Validation:** class-validator + class-transformer
- **Runtime:** Node.js >= 20.19, TypeScript >= 5.4 (syarat Prisma 7)

## ⚠️ Catatan Prisma 7 (WAJIB dibaca sebelum coding)

Prisma 7 (rilis stable Nov 2025) punya breaking change besar dibanding Early Access:

1. **`url` TIDAK BOLEH lagi ada di `datasource` block `schema.prisma`.** Connection string dipindah ke `prisma.config.ts`. Kalau tetap ada → error `P1012`.
2. **`earlyAccess: true` DIHAPUS** dari `prisma.config.ts` (itu flag masa Early Access).
3. **Env tidak auto-load** — wajib `import "dotenv/config"` di `prisma.config.ts`.
4. **Driver adapter wajib** untuk semua database (tidak ada lagi koneksi engine bawaan).
5. **Import client** dari `../generated/prisma/client` (bukan folder-nya langsung).
6. Prisma 7 condong **ESM**. NestJS default CommonJS masih kompatibel via `require(esm)` di Node >= 20.19, tapi pastikan `tsconfig` & `package.json` konsisten.

## Folder Structure

```
backend/
├── src/
│   ├── common/
│   │   ├── decorators/        # Custom decorators (@CurrentUser, @Public)
│   │   ├── filters/           # Exception filters
│   │   ├── guards/            # AuthGuard, RolesGuard
│   │   ├── interceptors/      # Response transform, logging
│   │   ├── middleware/        # Cookie parser, CORS
│   │   ├── pipes/             # Validation pipe config
│   │   └── types/             # Shared types/interfaces
│   ├── config/
│   │   └── app.config.ts      # ConfigModule schema (Zod/Joi)
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── guards/
│   │   │   │   └── jwt-auth.guard.ts
│   │   │   ├── strategies/
│   │   │   │   └── jwt.strategy.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   └── auth.service.ts
│   │   ├── user/
│   │   │   ├── dto/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.module.ts
│   │   │   └── user.service.ts
│   │   └── [feature]/          # Same pattern per feature
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── generated/
│   └── prisma/                 # Prisma client output (di-gitignore)
├── prisma.config.ts            # Prisma v7 config (root)
├── nest-cli.json
├── tsconfig.json
└── package.json
```

## Implementation Rules

### Prisma v7 — `schema.prisma` (TANPA `url`)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  // CATATAN: di Prisma 7 `url` TIDAK ditaruh di sini.
  // Connection string dipindah ke prisma.config.ts.
}
```

### Prisma v7 — `prisma.config.ts` (root project)

```typescript
// prisma.config.ts
import "dotenv/config"; // WAJIB — Prisma 7 tidak auto-load .env
import path from "node:path";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  migrations: {
    path: path.join(__dirname, "prisma", "migrations"),
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Dipakai Prisma CLI untuk migrate/generate
    url: env("DATABASE_URL"),
  },
});
```

> Pastikan `prisma.config.ts` masuk ke `include` di `tsconfig.json`.

### Install Packages

```bash
# Runtime
npm install @prisma/client @prisma/adapter-pg pg dotenv
# Dev
npm install -D prisma @types/pg tsx
```

### Prisma Service (Driver Adapter)

```typescript
// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly pool: Pool;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    super({ adapter: new PrismaPg(pool) });
    this.pool = pool;
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    await this.pool.end(); // tutup pool pg secara eksplisit
  }
}
```

```typescript
// src/prisma/prisma.module.ts
import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

### Module Pattern

```typescript
// modules/user/user.module.ts
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

> `PrismaModule` ditandai `@Global()`, jadi tidak perlu di-import ulang di tiap feature module.

### DTO Pattern

```typescript
// modules/user/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
```

### Service Pattern

```typescript
// modules/user/user.service.ts
import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";

const SAFE_USER_SELECT = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
} as const;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new ConflictException("Email sudah terdaftar");

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    return this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
      select: SAFE_USER_SELECT,
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: SAFE_USER_SELECT,
    });
    if (!user) throw new NotFoundException("User tidak ditemukan");
    return user;
  }
}
```

### Controller Pattern

```typescript
// modules/user/user.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.userService.findById(id);
  }
}
```

### main.ts Essentials (global prefix, cookie, CORS, validation)

```typescript
// src/main.ts
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api"); // semua route jadi /api/*
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
```

### Migration Commands (Prisma 7)

```bash
npx prisma migrate dev --name init     # buat + apply migration (dev)
npx prisma generate                    # generate client ke ../generated/prisma
npx prisma migrate deploy              # apply migration (production)
npx prisma migrate status              # cek status
npx prisma db seed                     # jalankan seed (tsx prisma/seed.ts)
```

## Larangan

- JANGAN taruh `url` di `datasource` block `schema.prisma` (Prisma 7 → error P1012)
- JANGAN pakai `earlyAccess: true` di `prisma.config.ts` (sudah dihapus di v7)
- JANGAN gunakan `any` — selalu type DTO, entity, response
- JANGAN taruh business logic di controller — semua di service
- JANGAN query Prisma langsung di controller — selalu via service
- JANGAN return password/sensitive field — selalu pakai `select` atau `omit`
- JANGAN skip validation — semua input via DTO + class-validator
- JANGAN hardcode config — gunakan `@nestjs/config` ConfigModule
- JANGAN buat file > 200 baris — pecah concern

## Task

$ARGUMENTS
