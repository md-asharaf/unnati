
"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CreateSetting, createSettingSchema } from "@/schemas";
import { fetchSettings, updateSetting } from "@/queries/settings";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RefreshButton } from "../common/refresh-button";
import { useEffect } from "react";

export const SettingsCard = () => {
  const queryClient = useQueryClient();
  const form = useForm<CreateSetting>({
    resolver: zodResolver(createSettingSchema),
  });
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });
  const setting = data?.setting;
  useEffect(() => {
    if (setting)
      form.reset({
        welcomeText: setting?.welcomeText || "",
        introParagraph: setting?.introParagraph || "",
        email: setting?.email || "",
        phone: setting?.phone || "",
        address: setting?.address || "",
        facebook: setting?.facebook || "",
        twitter: setting?.twitter || "",
        linkedin: setting?.linkedin || "",
        instagram: setting?.instagram || "",
      })
  }, [setting])

  const updateMutation = useMutation({
    mutationFn: async (values: CreateSetting) => await updateSetting(values),
    onSuccess: () => {
      toast.success("Settings saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: () => {
      toast.error("Failed to save settings. Please try again.");
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Settings</h2>
          <RefreshButton spinning={isFetching} onClick={() => refetch()} ariaLabel="Refresh Settings" />
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit((data) => updateMutation.mutate(data))}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="welcomeText"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Welcome Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="introParagraph"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intro Paragraph</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="facebook"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="twitter"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="linkedin"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="instagram"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-6">
              <Button type="submit" variant="secondary" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}