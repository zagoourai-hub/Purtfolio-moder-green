"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProject, useUpdateProject } from "@/hooks/use-projects";
import ImageUploader from "@/components/cms/ImageUploader";
import MarkdownEditor from "@/components/cms/MarkdownEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, X } from "lucide-react";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const router = useRouter();
  const { id } = use(params);

  const { data: project, isLoading } = useProject(id);
  const updateProjectMutation = useUpdateProject(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverUrl: "" as string | null,
    techStackRaw: "",
    liveUrl: "",
    repoUrl: "",
    featured: false,
    published: false,
    order: 0,
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        coverUrl: project.coverUrl || null,
        techStackRaw: Array.isArray(project.techStack) ? project.techStack.join(", ") : "",
        liveUrl: project.liveUrl || "",
        repoUrl: project.repoUrl || "",
        featured: project.featured || false,
        published: project.published || false,
        order: project.order || 0,
      });
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  const handleDescriptionChange = (val?: string) => {
    setFormData((prev) => ({ ...prev, description: val || "" }));
  };

  const handleCoverChange = (url: string | null) => {
    setFormData((prev) => ({ ...prev, coverUrl: url }));
  };

  const handleSwitchChange = (field: "featured" | "published") => {
    return (checked: boolean) => {
      setFormData((prev) => ({ ...prev, [field]: checked }));
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const techStack = formData.techStackRaw
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const submitData = {
      title: formData.title,
      description: formData.description,
      coverUrl: formData.coverUrl,
      techStack,
      liveUrl: formData.liveUrl || null,
      repoUrl: formData.repoUrl || null,
      featured: formData.featured,
      published: formData.published,
      order: formData.order,
    };

    updateProjectMutation.mutate(submitData, {
      onSuccess: () => {
        router.push("/dashboard/projects");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  const isPending = updateProjectMutation.isPending;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Edit Project</h1>
          <p className="text-sm text-zinc-400">Modify the project details and case study.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/dashboard/projects")}
          className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-zinc-100">Project Details</CardTitle>
          <CardDescription className="text-zinc-400">
            Modify the fields below to update the project case study.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-zinc-300">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. E-Commerce Platform"
                  required
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="techStackRaw" className="text-zinc-300">Tech Stack (comma separated)</Label>
                <Input
                  id="techStackRaw"
                  name="techStackRaw"
                  value={formData.techStackRaw}
                  onChange={handleChange}
                  placeholder="e.g. Next.js, Tailwind CSS, Prisma, PostgreSQL"
                  required
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="liveUrl" className="text-zinc-300">Live URL (Optional)</Label>
                <Input
                  id="liveUrl"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  placeholder="e.g. https://my-app.com"
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repoUrl" className="text-zinc-300">Repository URL (Optional)</Label>
                <Input
                  id="repoUrl"
                  name="repoUrl"
                  value={formData.repoUrl}
                  onChange={handleChange}
                  placeholder="e.g. https://github.com/my-username/my-app"
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order" className="text-zinc-300">Sorting Order</Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  value={formData.order}
                  onChange={handleChange}
                  placeholder="e.g. 0, 1, 2"
                  min="0"
                  required
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-8 items-center bg-zinc-950 p-4 rounded-xl border border-zinc-900">
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={handleSwitchChange("published")}
                  disabled={isPending}
                />
                <Label htmlFor="published" className="text-zinc-300 cursor-pointer">Published (Visible on site)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={handleSwitchChange("featured")}
                  disabled={isPending}
                />
                <Label htmlFor="featured" className="text-zinc-300 cursor-pointer">Featured Project (Highlighted)</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300">Project Description (Markdown)</Label>
              <MarkdownEditor
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Write detail project implementation, challenges faced, solutions, and layout descriptions..."
              />
            </div>

            <div className="space-y-2">
              <ImageUploader
                value={formData.coverUrl}
                onChange={handleCoverChange}
                label="Project Cover Image"
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
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Project
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
