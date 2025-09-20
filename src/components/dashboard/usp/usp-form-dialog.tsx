import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { CreateUsp, createUspSchema, Usp } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

interface UspFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: CreateUsp) => void;
    initialData?: Usp;
}

export const UspFormDialog = ({ open, onOpenChange, onSubmit, initialData }: UspFormDialogProps) => {
    const form = useForm<CreateUsp>({
        resolver: zodResolver(createUspSchema),
        defaultValues: {
            heading: initialData?.heading || "",
            subheading: initialData?.subheading || "",
            bulletPoints: Array.isArray(initialData?.bulletPoints) ? initialData?.bulletPoints : [""]
        },
    });

    const bulletPoints = form.watch("bulletPoints");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{initialData ? "Edit USP" : "Create USP"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                        <FormField
                            control={form.control}
                            name="heading"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Heading *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter heading..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subheading"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Subheading *</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter subheading..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormLabel>Bullet Points *</FormLabel>
                        <div className="space-y-2">
                            {bulletPoints.map((point, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`bulletPoints.${idx}` as any}
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl>
                                                    <Input placeholder={`Bullet point ${idx + 1}`} {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    {bulletPoints.length > 1 && (
                                        <Button type="button" variant="ghost" size="icon" onClick={() => {
                                            const updated = [...bulletPoints];
                                            updated.splice(idx, 1);
                                            form.setValue("bulletPoints", updated, { shouldDirty: true });
                                        }}>
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="icon" className="mt-2" onClick={() => {
                                form.setValue("bulletPoints", [...bulletPoints, ""], { shouldDirty: true });
                            }}>
                                <Plus className="w-4 h-4" />
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
