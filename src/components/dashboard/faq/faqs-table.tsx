"use client";

import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import TableLoadingRows from "@/components/dashboard/common/table-loading-rows";
import { EmptyState } from "@/components/dashboard/common/empty-state";
import { OverlaySpinner as CommonOverlaySpinner } from "@/components/dashboard/common/overlay-spinner";
import { PaginationControls } from "@/components/dashboard/common/pagination-controls";
import TableHeaderControls from "@/components/dashboard/common/table-header-controls";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { createFaq, deleteFaq, fetchFaqs, updateFaq } from "@/queries/faqs";
import type { CreateFaq, Faq } from "@/schemas";
import { CustomAlertDialog } from "../common/custom-alert-dialog";
import { FaqFormDialog } from "./faq-form-dialog";
import TableActionsMenu from "@/components/dashboard/common/table-actions-menu";

export function FaqsTable() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const queryClient = useQueryClient();

    const { data, isLoading, isFetching, refetch } = useQuery({
        queryKey: ["faqs", { page, limit }],
        queryFn: async () => await fetchFaqs(undefined, page, limit),
        placeholderData: keepPreviousData,
    });

    const faqs: Faq[] = data?.data.faqs ?? [];
    const totalPages = data?.data.totalPages ?? 1;

    const filteredFaqs = useMemo(
        () =>
            faqs.filter(
                (f: Faq) =>
                    f.question
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    f.answer.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        [faqs, searchTerm],
    );

    const deleteMutation = useMutation({
        mutationFn: deleteFaq,
        onSuccess: () => {
            setIsOpen(false);
            toast.success("FAQ deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
        },
        onError: () => {
            setIsOpen(false);
            toast.error("Failed to delete FAQ. Please try again.");
        },
    });

    const updatemutation = useMutation({
        mutationFn: async (values: CreateFaq) => {
            if (!editingFaq) return;
            const { data } = await updateFaq(editingFaq?.id!, values);
            return data.faq as Faq;
        },
        onSuccess: () => {
            toast.success("FAQ updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
            setEditingFaq(null);
        },
        onError: () => {
            toast.error("Failed to update FAQ. Please try again.");
        },
    });

    const createMutation = useMutation({
        mutationFn: async (values: CreateFaq) => {
            const { data } = await createFaq(values);
            return data.faq;
        },
        onSuccess: () => {
            toast.success("FAQ created successfully!");
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
            setIsCreateDialogOpen(false);
        },
        onError: () => {
            toast.error("Failed to create FAQ. Please try again.");
        },
    });

    

    return (
        <Card>
            <CardHeader>
                <TableHeaderControls
                    title="FAQs"
                    count={filteredFaqs?.length ?? 0}
                    countNoun="FAQ"
                    isFetching={isFetching}
                    onRefresh={refetch}
                    onCreate={() => setIsCreateDialogOpen(true)}
                    searchTerm={searchTerm}
                    onSearch={setSearchTerm}
                    searchPlaceholder="Search FAQs..."
                    pageSize={limit}
                    onChangePageSize={(v) => {
                        const n = Number(v);
                        setLimit(n);
                        setPage(1);
                    }}
                />
            </CardHeader>
            <CardContent>
                <div className="relative rounded-md border">
                    <CommonOverlaySpinner show={isFetching && !isLoading} />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Question</TableHead>
                                <TableHead>Answer</TableHead>
                                <TableHead>Topic</TableHead>
                                <TableHead>Updated</TableHead>
                                <TableHead className="w-16">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableLoadingRows
                                    rows={6}
                                    columns={[
                                        "h-4 w-64",
                                        "h-4 w-80",
                                        "h-6 w-20 rounded-full",
                                        "h-4 w-28",
                                        "h-8 w-8 rounded",
                                    ]}
                                />
                            ) : filteredFaqs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="p-6">
                                        <EmptyState
                                            title="No FAQs found"
                                            description="Try a different search."
                                        />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    {filteredFaqs.map((f: Faq) => (
                                        <TableRow key={f.id}>
                                            <TableCell className="font-medium max-w-xs">
                                                <div className="truncate max-w-xs" title={f.question}>
                                                    {f.question}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground max-w-md">
                                                <div className="truncate max-w-md" title={f.answer}>
                                                    {f.answer}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {f.topic.name}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {new Date(
                                                    f.updatedAt as unknown as string,
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <TableActionsMenu
                                                    onEdit={() => setEditingFaq(f)}
                                                    onDelete={() => {
                                                        setIsOpen(true);
                                                        pendingDeleteId = f.id;
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <PaginationControls
                    page={page}
                    totalPages={totalPages}
                    isFetching={isFetching}
                    onPrev={() => setPage((p) => Math.max(1, p - 1))}
                    onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
                    onPageChange={(p) => setPage(p)}
                />
            </CardContent>

            <FaqFormDialog
                open={isCreateDialogOpen}
                isLoading={createMutation.isPending}
                onOpenChange={setIsCreateDialogOpen}
                onSubmit={(values) => createMutation.mutate(values)}
            />

            <FaqFormDialog
                key={editingFaq?.id || "edit-faq-dialog"}
                open={!!editingFaq}
                onOpenChange={(open) => !open && setEditingFaq(null)}
                onSubmit={(values) => updatemutation.mutate(values)}
                initialData={editingFaq || undefined}
                isLoading={updatemutation.isPending}
            />

            <CustomAlertDialog
                isOpen={isOpen}
                onCancel={() => setIsOpen(false)}
                onContinue={() => {
                    if (pendingDeleteId) deleteMutation.mutate(pendingDeleteId);
                }}
            />
        </Card>
    );
}

let pendingDeleteId: string | null = null;
