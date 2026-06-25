"use client";

import React, { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

interface ImageUploaderProps {
  value: string | null | undefined;
  onChange: (url: string | null) => void;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Upload Image",
}: ImageUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload JPEG, PNG, or WEBP.");
      return;
    }

    // Validasi ukuran file (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size is too large. Maximum size is 5MB.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to upload image");
      }

      const data = await res.json();
      onChange(data.url);
      toast.success("Image uploaded successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const removeImage = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Image removed");
  };

  return (
    <div className="space-y-2">
      {label && (
        <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
          {label}
        </span>
      )}

      {value ? (
        // Preview State
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/20 aspect-video flex items-center justify-center group max-w-lg">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover transition duration-300 group-hover:brightness-50"
            unoptimized // Bypass untuk image path lokal agar lancar
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={removeImage}
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full shadow-lg"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        // Dropzone State
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 cursor-pointer aspect-video max-w-lg flex flex-col items-center justify-center text-center transition-all duration-200 ${
            isDragActive
              ? "border-violet-500 bg-violet-500/5 text-violet-400"
              : "border-zinc-850 bg-zinc-900/10 hover:border-zinc-700/80 text-zinc-500 hover:text-zinc-400"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
          />

          {uploading ? (
            <div className="space-y-2 flex flex-col items-center">
              <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
              <p className="text-sm font-medium text-zinc-300 animate-pulse">
                Uploading image...
              </p>
            </div>
          ) : (
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-zinc-900/80 flex items-center justify-center border border-zinc-800 text-zinc-400">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-300">
                  Drag & Drop or Click to upload
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  Supports WEBP, PNG, JPG (Max 5MB)
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
