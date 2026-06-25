"use client";

import React, { useEffect, useState } from "react";
import { useHero, useUpdateHero } from "@/hooks/use-hero";
import ImageUploader from "@/components/cms/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";

export default function HeroSettingsPage() {
  const { data: hero, isLoading } = useHero();
  const updateHeroMutation = useUpdateHero();

  const [formData, setFormData] = useState({
    greeting: "",
    name: "",
    tagline: "",
    description: "",
    ctaLabel: "",
    ctaUrl: "",
    avatarUrl: "" as string | null,
  });

  useEffect(() => {
    if (hero) {
      setFormData({
        greeting: hero.greeting || "",
        name: hero.name || "",
        tagline: hero.tagline || "",
        description: hero.description || "",
        ctaLabel: hero.ctaLabel || "",
        ctaUrl: hero.ctaUrl || "",
        avatarUrl: hero.avatarUrl || null,
      });
    }
  }, [hero]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (url: string | null) => {
    setFormData((prev) => ({ ...prev, avatarUrl: url }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  const isPending = updateHeroMutation.isPending;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Hero Section</h1>
        <p className="text-sm text-zinc-400">
          Manage the introduction area of your portfolio website.
        </p>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-zinc-100">Edit Hero Section</CardTitle>
          <CardDescription className="text-zinc-400">
            This information will be displayed at the very top of your homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="greeting" className="text-zinc-300">Greeting</Label>
                <Input
                  id="greeting"
                  name="greeting"
                  value={formData.greeting}
                  onChange={handleChange}
                  placeholder="e.g. Hi, I'm"
                  required
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-300">Full Name / Display Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  required
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline" className="text-zinc-300">Tagline / Role</Label>
              <Input
                id="tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="e.g. Full-Stack Developer & UI/UX Designer"
                required
                disabled={isPending}
                className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-zinc-300">Brief Introduction Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a welcoming short introduction paragraph about yourself..."
                required
                rows={4}
                disabled={isPending}
                className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ctaLabel" className="text-zinc-300">CTA Button Label</Label>
                <Input
                  id="ctaLabel"
                  name="ctaLabel"
                  value={formData.ctaLabel}
                  onChange={handleChange}
                  placeholder="e.g. View My Work"
                  required
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ctaUrl" className="text-zinc-300">CTA Button URL</Label>
                <Input
                  id="ctaUrl"
                  name="ctaUrl"
                  value={formData.ctaUrl}
                  onChange={handleChange}
                  placeholder="e.g. #projects or /contact"
                  required
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <ImageUploader
                value={formData.avatarUrl}
                onChange={handleAvatarChange}
                label="Avatar / Profile Image"
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
