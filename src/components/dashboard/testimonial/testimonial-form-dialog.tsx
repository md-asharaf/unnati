import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { CreateTestimonial, createTestimonialSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

interface TestimonialFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateTestimonial) => void;
  initialData?: CreateTestimonial;
}

export function TestimonialFormDialog({ open, onOpenChange, onSubmit, initialData }: TestimonialFormDialogProps) {
  const form = useForm<CreateTestimonial>({
    resolver: zodResolver(createTestimonialSchema),
    defaultValues: {
      content: initialData?.content || "",
      rating: initialData?.rating || 1,
      placementId: initialData?.placementId || "",
    },
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
                  <FormLabel>Placement ID *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter placement ID..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {initialData ? "Save" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
