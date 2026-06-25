"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTestimonial, useUpdateTestimonial } from "@/hooks/use-testimonials";
import ImageUploader from "@/components/cms/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save, X } from "lucide-react";

interface EditTestimonialPageProps {
  params: Promise<{ id: string }>;
}

export default function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const router = useRouter();
  const { id } = use(params);

  const { data: testimonial, isLoading } = useTestimonial(id);
  const updateTestimonialMutation = useUpdateTestimonial(id);

  const [formData, setFormData] = useState({
    clientName: "",
    clientRole: "",
    company: "",
    content: "",
    rating: 5,
    order: 0,
    featured: false,
    published: false,
    avatarUrl: "" as string | null,
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        clientName: testimonial.clientName || "",
        clientRole: testimonial.clientRole || "",
        company: testimonial.company || "",
        content: testimonial.content || "",
        rating: testimonial.rating || 5,
        order: testimonial.order || 0,
        featured: testimonial.featured || false,
        published: testimonial.published || false,
        avatarUrl: testimonial.avatarUrl || null,
      });
    }
  }, [testimonial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  const handleRatingChange = (val: string | null) => {
    setFormData((prev) => ({ ...prev, rating: Number(val || "5") }));
  };

  const handleAvatarChange = (url: string | null) => {
    setFormData((prev) => ({ ...prev, avatarUrl: url }));
  };

  const handleSwitchChange = (field: "featured" | "published") => {
    return (checked: boolean) => {
      setFormData((prev) => ({ ...prev, [field]: checked }));
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      clientName: formData.clientName,
      clientRole: formData.clientRole || null,
      company: formData.company || null,
      content: formData.content,
      rating: formData.rating,
      order: formData.order,
      featured: formData.featured,
      published: formData.published,
      avatarUrl: formData.avatarUrl,
    };

    updateTestimonialMutation.mutate(submitData, {
      onSuccess: () => {
        router.push("/dashboard/testimonials");
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

  const isPending = updateTestimonialMutation.isPending;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Edit Testimonial</h1>
          <p className="text-sm text-zinc-400">Modify the feedback content and client info.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/dashboard/testimonials")}
          className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-zinc-100">Testimonial Details</CardTitle>
          <CardDescription className="text-zinc-400">
            Modify the fields below to update the testimonial.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-zinc-300">Client Name</Label>
              <Input
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                required
                disabled={isPending}
                className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientRole" className="text-zinc-300">Client Role / Job Title</Label>
                <Input
                  id="clientRole"
                  name="clientRole"
                  value={formData.clientRole}
                  onChange={handleChange}
                  placeholder="e.g. Product Manager, CEO"
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-zinc-300">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Acme Corp"
                  disabled={isPending}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="rating" className="text-zinc-300">Rating Stars</Label>
                <Select
                  value={formData.rating.toString()}
                  onValueChange={handleRatingChange}
                  disabled={isPending}
                >
                  <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-100 focus:ring-violet-600">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border-zinc-800 text-zinc-100">
                    <SelectItem value="5">5 Stars (Excellent)</SelectItem>
                    <SelectItem value="4">4 Stars (Good)</SelectItem>
                    <SelectItem value="3">3 Stars (Average)</SelectItem>
                    <SelectItem value="2">2 Stars (Poor)</SelectItem>
                    <SelectItem value="1">1 Star (Very Poor)</SelectItem>
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
                <Label htmlFor="featured" className="text-zinc-300 cursor-pointer">Featured (Highlighted testimonial)</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-zinc-300">Testimonial Content / Review Feedback</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Paste client review feedback text here..."
                required
                rows={4}
                disabled={isPending}
                className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600 resize-none"
              />
            </div>

            <div className="space-y-2">
              <ImageUploader
                value={formData.avatarUrl}
                onChange={handleAvatarChange}
                label="Client Avatar / Logo Photo"
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
                    Update Testimonial
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
