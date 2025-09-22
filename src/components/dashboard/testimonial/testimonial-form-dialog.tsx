import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { fetchPlacements } from "@/queries/placements";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { CreateTestimonial, createTestimonialSchema, Testimonial } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { FormDialogProps } from "@/types/interfaces";

export function TestimonialFormDialog({ open, onOpenChange, onSubmit, initialData, isLoading }: FormDialogProps<CreateTestimonial, Testimonial>) {
  const form = useForm<CreateTestimonial>({
    resolver: zodResolver(createTestimonialSchema),
    defaultValues: {
      content: initialData?.content || "",
      rating: initialData?.rating || 1,
      placementId: initialData?.placementId || "",
    },
  });

  const { data: placements, isLoading: placementsLoading } = useQuery({
    queryKey: ["placements"],
    queryFn: () => fetchPlacements(1, 100)
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Testimonial" : "Create Testimonial"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Content *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter testimonial content..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Rating *</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} max={5} placeholder="Enter rating (1-5)..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="placementId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Placement *</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={placementsLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={placementsLoading ? "Loading placements..." : "Select a placement"} />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(placements?.data) && placements.data.map((placement: any) => (
                          <SelectItem key={placement.id} value={placement.id}>
                            {placement.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="secondary">
                {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : initialData ? "Save" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
