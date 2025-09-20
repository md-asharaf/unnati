import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Course, CreateCourse } from "@/schemas";

interface CourseFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateCourse) => void;
  initialData?: Course;
}

export function CourseFormDialog({ open, onOpenChange, onSubmit, initialData }: CourseFormDialogProps) {
  const form = useForm<CreateCourse>({
    defaultValues: {
      title: initialData?.title || "",
      subtitle: initialData?.subtitle || "",
      description: initialData?.description || "",
      duration: initialData?.duration || "",
      language: Array.isArray(initialData?.language)
        ? initialData?.language : [""],
      mode: Array.isArray(initialData?.mode)
        ? initialData?.mode : [""],
    },
  });

  const languageArr = form.watch("language");
  const modeArr = form.watch("mode");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Course" : "Create Course"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Subtitle *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course subtitle..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter course description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Duration *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course duration..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Languages *</FormLabel>
            <div className="space-y-2">
              {languageArr.map((lang, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`language.${idx}` as any}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input placeholder={`Language ${idx + 1}`} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {languageArr.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => {
                      const updated = [...languageArr];
                      updated.splice(idx, 1);
                      form.setValue("language", updated, { shouldDirty: true });
                    }}>
                      <span className="text-destructive">×</span>
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="icon" className="mt-2" onClick={() => {
                form.setValue("language", [...languageArr, ""], { shouldDirty: true });
              }}>
                +
              </Button>
            </div>
            <FormLabel>Modes *</FormLabel>
            <div className="space-y-2">
              {modeArr.map((mode, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`mode.${idx}` as any}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input placeholder={`Mode ${idx + 1}`} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {modeArr.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => {
                      const updated = [...modeArr];
                      updated.splice(idx, 1);
                      form.setValue("mode", updated, { shouldDirty: true });
                    }}>
                      <span className="text-destructive">×</span>
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="icon" className="mt-2" onClick={() => {
                form.setValue("mode", [...modeArr, ""], { shouldDirty: true });
              }}>
                +
              </Button>
            </div>
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
