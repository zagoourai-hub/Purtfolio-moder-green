"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreatePost } from "@/hooks/use-blog";
import ImageUploader from "@/components/cms/ImageUploader";
import MarkdownEditor from "@/components/cms/MarkdownEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, X } from "lucide-react";

export default function NewBlogPostPage() {
  const router = useRouter();
  const createPostMutation = useCreatePost();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverUrl: "" as string | null,
    tagsRaw: "",
    published: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (val?: string) => {
    setFormData((prev) => ({ ...prev, content: val || "" }));
  };

  const handleCoverChange = (url: string | null) => {
    setFormData((prev) => ({ ...prev, coverUrl: url }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tags = formData.tagsRaw
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const submitData = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      coverUrl: formData.coverUrl,
      tags,
      published: formData.published,
    };

    createPostMutation.mutate(submitData, {
      onSuccess: () => {
        router.push("/dashboard/blog");
      },
    });
  };

  const isPending = createPostMutation.isPending;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Add New Post</h1>
          <p className="text-sm text-zinc-400">Publish a new article or technical guide.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/dashboard/blog")}
          className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-zinc-100">Post Details</CardTitle>
          <CardDescription className="text-zinc-400">
            Define your blog title, excerpt summary, and tags.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-zinc-300">Blog Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Master React 19 and Next.js 16"
                  required
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagsRaw" className="text-zinc-300">Tags (comma separated)</Label>
                <Input
                  id="tagsRaw"
                  name="tagsRaw"
                  value={formData.tagsRaw}
                  onChange={handleChange}
                  placeholder="e.g. react, nextjs, programming"
                  required
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-zinc-300">Excerpt / Post Summary</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Write a brief, catchy summary of this article to display in lists..."
                required
                rows={3}
                disabled={isPending}
                className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600 resize-none"
              />
            </div>

            <div className="flex items-center space-x-2 bg-zinc-950 p-4 rounded-xl border border-zinc-900">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={handleSwitchChange}
                disabled={isPending}
              />
              <Label htmlFor="published" className="text-zinc-300 cursor-pointer">Published (Visible on site)</Label>
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300">Blog Content (Markdown)</Label>
              <MarkdownEditor
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Start writing your article content in Markdown format..."
              />
            </div>

            <div className="space-y-2">
              <ImageUploader
                value={formData.coverUrl}
                onChange={handleCoverChange}
                label="Blog Post Cover Image"
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-violet-600 text-zinc-100 hover:bg-violet-750 font-semibold px-6 rounded-xl gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Post
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
