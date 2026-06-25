"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useService, useUpdateService } from "@/hooks/use-services";
import ImageUploader from "@/components/cms/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, X } from "lucide-react";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default function EditServicePage({ params }: EditServicePageProps) {
  const router = useRouter();
  const { id } = use(params);

  const { data: service, isLoading } = useService(id);
  const updateServiceMutation = useUpdateService(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    order: 0,
    published: false,
    iconUrl: "" as string | null,
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || "",
        description: service.description || "",
        price: service.price || "",
        order: service.order || 0,
        published: service.published || false,
        iconUrl: service.iconUrl || null,
      });
    }
  }, [service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  const handleIconChange = (url: string | null) => {
    setFormData((prev) => ({ ...prev, iconUrl: url }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      title: formData.title,
      description: formData.description,
      price: formData.price || null,
      order: formData.order,
      published: formData.published,
      iconUrl: formData.iconUrl,
    };

    updateServiceMutation.mutate(submitData, {
      onSuccess: () => {
        router.push("/dashboard/services");
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

  const isPending = updateServiceMutation.isPending;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Edit Service</h1>
          <p className="text-sm text-zinc-400">Modify the service package details.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/dashboard/services")}
          className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>

      <Card className="border-zinc-800 bg-zinc-900/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-zinc-100">Service Details</CardTitle>
          <CardDescription className="text-zinc-400">
            Modify the fields below to update the service.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-zinc-300">Service Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Custom Web Development"
                required
                disabled={isPending}
                className="bg-zinc-950 border-zinc-800 text-zinc-100 focus-visible:ring-violet-600 focus-visible:border-violet-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-zinc-300">Price Range / Tag (Optional)</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. From $500, Custom Pricing"
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

            <div className="space-y-2">
              <Label htmlFor="description" className="text-zinc-300">Service Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what services you offer under this category and what clients get..."
                required
                rows={4}
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
              <ImageUploader
                value={formData.iconUrl}
                onChange={handleIconChange}
                label="Service Icon (Optional)"
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
                    Update Service
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
