"use client";

import React, { useEffect, useState } from "react";
import { useSettings, useUpdateSettings } from "@/hooks/use-settings";
import ImageUploader from "@/components/cms/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Globe, Share2, BarChart } from "lucide-react";

export default function SettingsPage() {
  const { data: settings, isLoading } = useSettings();
  const updateSettingsMutation = useUpdateSettings();

  const [formData, setFormData] = useState({
    site_title: "",
    site_description: "",
    og_image: "" as string | null,
    social_github: "",
    social_linkedin: "",
    social_twitter: "",
    social_instagram: "",
    google_analytics_id: "",
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        site_title: settings.site_title || "",
        site_description: settings.site_description || "",
        og_image: settings.og_image || null,
        social_github: settings.social_github || "",
        social_linkedin: settings.social_linkedin || "",
        social_twitter: settings.social_twitter || "",
        social_instagram: settings.social_instagram || "",
        google_analytics_id: settings.google_analytics_id || "",
      });
    }
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOgImageChange = (url: string | null) => {
    setFormData((prev) => ({ ...prev, og_image: url }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Map formData to key-value settings map
    const settingsPayload: Record<string, string> = {};
    Object.entries(formData).forEach(([key, val]) => {
      settingsPayload[key] = val || "";
    });

    updateSettingsMutation.mutate(settingsPayload);
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  const isPending = updateSettingsMutation.isPending;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Site Settings</h1>
        <p className="text-sm text-zinc-400">
          Configure site-wide metadata, SEO parameters, social links, and integrations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="seo" className="w-full">
          <TabsList className="bg-zinc-900 border border-zinc-800 p-1 rounded-xl w-full md:w-auto grid grid-cols-3">
            <TabsTrigger
              value="seo"
              className="rounded-lg data-[state=active]:bg-zinc-850 data-[state=active]:text-zinc-100 text-zinc-400 gap-2 px-4 py-2"
            >
              <Globe className="w-4 h-4" />
              SEO & Identity
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="rounded-lg data-[state=active]:bg-zinc-850 data-[state=active]:text-zinc-100 text-zinc-400 gap-2 px-4 py-2"
            >
              <Share2 className="w-4 h-4" />
              Social Links
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="rounded-lg data-[state=active]:bg-zinc-850 data-[state=active]:text-zinc-100 text-zinc-400 gap-2 px-4 py-2"
            >
              <BarChart className="w-4 h-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seo" className="mt-6 space-y-6">
            <Card className="border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-zinc-100">Site Metadata & Search SEO</CardTitle>
                <CardDescription className="text-zinc-400">
                  Control how your portfolio appears in Google search and social shares.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="site_title" className="text-zinc-300">Homepage Site Title</Label>
                  <Input
                    id="site_title"
                    name="site_title"
                    value={formData.site_title}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan | Senior Portfolio Website"
                    required
                    disabled={isPending}
                    className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site_description" className="text-zinc-300">Site Meta Description</Label>
                  <Textarea
                    id="site_description"
                    name="site_description"
                    value={formData.site_description}
                    onChange={handleChange}
                    placeholder="Describe your site details for Google search indexing meta tags..."
                    required
                    rows={4}
                    disabled={isPending}
                    className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <ImageUploader
                    value={formData.og_image}
                    onChange={handleOgImageChange}
                    label="OG (OpenGraph) Social Media Sharing Image"
                  />
                  <p className="text-xs text-zinc-550 mt-1">
                    This image will be displayed when your portfolio URL link is shared on Twitter, Slack, LinkedIn, or Facebook.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="mt-6 space-y-6">
            <Card className="border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-zinc-100">Social Profile Connections</CardTitle>
                <CardDescription className="text-zinc-400">
                  Provide URLs to your professional developer profiles.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="social_github" className="text-zinc-300">GitHub Profile URL</Label>
                    <Input
                      id="social_github"
                      name="social_github"
                      value={formData.social_github}
                      onChange={handleChange}
                      placeholder="e.g. https://github.com/alex-morgan"
                      disabled={isPending}
                      className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="social_linkedin" className="text-zinc-300">LinkedIn Profile URL</Label>
                    <Input
                      id="social_linkedin"
                      name="social_linkedin"
                      value={formData.social_linkedin}
                      onChange={handleChange}
                      placeholder="e.g. https://linkedin.com/in/alex-morgan"
                      disabled={isPending}
                      className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="social_twitter" className="text-zinc-300">Twitter / X URL</Label>
                    <Input
                      id="social_twitter"
                      name="social_twitter"
                      value={formData.social_twitter}
                      onChange={handleChange}
                      placeholder="e.g. https://x.com/alex_morgan"
                      disabled={isPending}
                      className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="social_instagram" className="text-zinc-300">Instagram Profile URL</Label>
                    <Input
                      id="social_instagram"
                      name="social_instagram"
                      value={formData.social_instagram}
                      onChange={handleChange}
                      placeholder="e.g. https://instagram.com/alex_morgan"
                      disabled={isPending}
                      className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="mt-6 space-y-6">
            <Card className="border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-zinc-100">Analytics & Tracking Keys</CardTitle>
                <CardDescription className="text-zinc-400">
                  Track website traffic statistics using Google Analytics.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="google_analytics_id" className="text-zinc-300">Google Analytics Tracking ID (G-XXXXX)</Label>
                  <Input
                    id="google_analytics_id"
                    name="google_analytics_id"
                    value={formData.google_analytics_id}
                    onChange={handleChange}
                    placeholder="e.g. G-1234567890"
                    disabled={isPending}
                    className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t border-zinc-900">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-violet-600 text-zinc-100 hover:bg-violet-750 font-semibold px-6 rounded-xl gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
