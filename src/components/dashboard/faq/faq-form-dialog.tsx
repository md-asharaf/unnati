"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { type CreateFaq, createFaqSchema, type Faq, Topic } from "@/schemas";
import { createTopic, fetchTopics } from "@/queries/topics";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData?: Faq;
    onSubmit: (values: CreateFaq) => void;
};

export function FaqFormDialog({
    open,
    onOpenChange,
    initialData,
    onSubmit,
}: Props) {
    const queryClient = useQueryClient();
    const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
    const [newTopicName, setNewTopicName] = useState("");

    const { data = [] } = useQuery({
        queryKey: ["topics", { page: 1, limit: 20 }],
        queryFn: async (): Promise<Topic[]> => {
            const { data } = await fetchTopics(1, 20);
            return data.topics;
        },
    });

    const form = useForm<CreateFaq>({
        resolver: zodResolver(createFaqSchema),
        defaultValues: {
            question: initialData?.question || "",
            answer: initialData?.answer || "",
            topicId: initialData?.topic.id || "",
        },
    });

    const createTopicMutation = useMutation({
        mutationFn: async (name: string) => {
            const { data } = await createTopic({ name });
            return data.topic;
        },
        onSuccess: (topic) => {
            if (!topic) return;
            toast.success("Topic created successfully");
            queryClient.invalidateQueries({ queryKey: ["topics"] });
            queryClient.setQueryData(["topics"], (old: Topic[] = []) => [
                ...old,
                topic,
            ]);
            setIsCreateTopicOpen(false);
            setNewTopicName("");
        },
        onError: () => {
            toast.error("Failed to create topic");
        }
    });

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            {initialData ? "Edit FAQ" : "Create FAQ"}
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit((values) =>
                                onSubmit(values),
                            )}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="question"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Question *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter question"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="answer"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Answer *</FormLabel>
                                        <FormControl>
                                            <textarea
                                                placeholder="Enter answer"
                                                className="min-h-28 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="topicId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Topic *</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={(val) => {
                                                    if (val === "__create__") {
                                                        setIsCreateTopicOpen(true);
                                                        return;
                                                    }
                                                    field.onChange(val);
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a topic" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {data?.map((t) => (
                                                        <SelectItem
                                                            key={t.id}
                                                            value={t.id}
                                                        >
                                                            {t.name}
                                                        </SelectItem>
                                                    ))}
                                                    <SelectItem value="__create__">
                                                        + Create new topic
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                >
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

            {/* Create Topic Dialog */}
            <Dialog open={isCreateTopicOpen} onOpenChange={setIsCreateTopicOpen}>
                <DialogContent className="w-sm">
                    <DialogHeader>
                        <DialogTitle>Create Topic</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 ">
                        <Input
                            placeholder="Topic name"
                            value={newTopicName}
                            onChange={(e) => setNewTopicName(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsCreateTopicOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={createTopicMutation.isPending || newTopicName.trim().length === 0}
                                onClick={() =>
                                    createTopicMutation.mutate(newTopicName.trim())
                                }
                            >
                                {createTopicMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
