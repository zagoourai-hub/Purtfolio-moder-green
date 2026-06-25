"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateSkill } from "@/hooks/use-skills";
import ImageUploader from "@/components/cms/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save, X } from "lucide-react";

export default function NewSkillPage() {
  const router = useRouter();
  const createSkillMutation = useCreateSkill();

  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    level: 80,
    order: 0,
    iconUrl: "" as string | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" || name === "order" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (val: string | null) => {
    setFormData((prev) => ({ ...prev, category: val || "Frontend" }));
  };

  const handleIconChange = (url: string | null) => {
    setFormData((prev) => ({ ...prev, iconUrl: url }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSkillMutation.mutate(formData, {
      onSuccess: () => {
        router.push("/dashboard/skills");
      },
    });
  };

  const isPending = createSkillMutation.isPending;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Add New Skill</h1>
          <p className="text-sm text-zinc-400">Create a new skill item for your skills section.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/dashboard/skills")}
          className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-zinc-100">Skill Details</CardTitle>
          <CardDescription className="text-zinc-400">
            Define the skill name, category, proficiency level, and sort order.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">Skill Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. React, Next.js, Node.js"
                required
                disabled={isPending}
                className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-zinc-300">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                  disabled={isPending}
                >
                  <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-100 focus:ring-violet-600">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-100">
                    <SelectItem value="Frontend">Frontend</SelectItem>
                    <SelectItem value="Backend">Backend</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="Design">UI/UX Design</SelectItem>
                    <SelectItem value="Database">Database</SelectItem>
                    <SelectItem value="Mobile">Mobile App</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
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

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="level" className="text-zinc-300">Proficiency Level ({formData.level}%)</Label>
              </div>
              <input
                id="level"
                name="level"
                type="range"
                min="0"
                max="100"
                value={formData.level}
                onChange={handleChange}
                disabled={isPending}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
              />
            </div>

            <div className="space-y-2">
              <ImageUploader
                value={formData.iconUrl}
                onChange={handleIconChange}
                label="Skill Icon (Optional)"
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
                    Save Skill
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
