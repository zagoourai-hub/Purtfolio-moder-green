import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import fs from "fs";
import path from "path";

// Batasan upload
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: Request) {
  // 1. Proteksi autentikasi admin
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    // 2. Validasi Ukuran File
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "File size exceeds the 5MB limit" },
        { status: 400 }
      );
    }

    // 3. Validasi Tipe File
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { message: "Invalid file type. Only JPEG, PNG, and WEBP are allowed" },
        { status: 400 }
      );
    }

    // 4. Ubah file ke Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. Sanitasi Nama File & Path
    const cleanFileName = file.name
      .replace(/\s+/g, "-") // ganti spasi dengan strip
      .replace(/[^a-zA-Z0-9.\-_]/g, ""); // buang karakter aneh

    const timestamp = Date.now();
    const finalFileName = `${timestamp}-${cleanFileName}`;

    // Target upload folder di public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Pastikan folder uploads sudah dibuat
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const finalPath = path.join(uploadDir, finalFileName);

    // 6. Simpan File ke Disk
    fs.writeFileSync(finalPath, buffer);

    // 7. Kembalikan URL statis
    return NextResponse.json({
      url: `/uploads/${finalFileName}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Failed to upload file" },
      { status: 500 }
    );
  }
}
