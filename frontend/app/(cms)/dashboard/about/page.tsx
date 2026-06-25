"use client";

import React, { useEffect, useState } from "react";
import { useAbout, useUpdateAbout } from "@/hooks/use-about";
import ImageUploader from "@/components/cms/ImageUploader";
import MarkdownEditor from "@/components/cms/MarkdownEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";

export default function AboutSettingsPage() {
  const { data: about, isLoading } = useAbout();
  const updateAboutMutation = useUpdateAbout();

  const [formData, setFormData] = useState({
    bio: "",
    photoUrl: "" as string | null,
    location: "",
    email: "",
    resumeUrl: "",
  });

  useEffect(() => {
    if (about) {
      setFormData({
        bio: about.bio || "",
        photoUrl: about.photoUrl || null,
        location: about.location || "",
        email: about.email || "",
        resumeUrl: about.resumeUrl || "",
      });
    }
  }, [about]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBioChange = (val?: string) => {
    setFormData((prev) => ({ ...prev, bio: val || "" }));
  };

  const handlePhotoChange = (url: string | null) => {
    setFormData((prev) => ({ ...prev, photoUrl: url }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  const isPending = updateAboutMutation.isPending;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">About Section</h1>
        <p className="text-sm text-zinc-400">
          Manage your personal background biography, contact info, and resume link.
        </p>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-zinc-100">Edit About Section</CardTitle>
          <CardDescription className="text-zinc-400">
            Write a detailed bio in Markdown and upload your profile picture.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-zinc-300">Biography (Markdown)</Label>
              <MarkdownEditor
                value={formData.bio}
                onChange={handleBioChange}
                placeholder="Write your professional bio, experience, and what drives you. Markdown is fully supported!"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-zinc-300">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco, CA"
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">Public Contact Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. contact@domain.com"
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resumeUrl" className="text-zinc-300">Resume / CV Download URL</Label>
                <Input
                  id="resumeUrl"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  placeholder="e.g. /docs/resume.pdf"
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <ImageUploader
                value={formData.photoUrl}
                onChange={handlePhotoChange}
                label="Profile Picture / Bio Photo"
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-violet-600 text-zinc-100 hover:bg-violet-750 transition-all duration-200 gap-2 font-semibold px-6 rounded-xl"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
