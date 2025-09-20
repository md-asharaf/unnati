
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import TableLoadingRows from "@/components/dashboard/common/table-loading-rows";
import { EmptyState } from "@/components/dashboard/common/empty-state";
import { OverlaySpinner as CommonOverlaySpinner } from "@/components/dashboard/common/overlay-spinner";
import TableHeaderControls from "@/components/dashboard/common/table-header-controls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Usp, CreateUsp } from "@/schemas";
import { CustomAlertDialog } from "@/components/dashboard/common/custom-alert-dialog";
import { UspFormDialog } from "./usp-form-dialog";
import { fetchUsps, createUsp, updateUsp, deleteUsp } from "@/queries/usps";

export function UspsTable() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [editingUsp, setEditingUsp] = useState<Usp | null>(null);
    const queryClient = useQueryClient();
    const { data, isLoading, isFetching, refetch } = useQuery({
        queryKey: ["usps"],
        queryFn: async () => await fetchUsps(),
    });

    const usps = data?.data.usps ?? [];
    const filteredUsps = useMemo(
        () =>
            usps.filter(
                (usp: Usp) =>
                    usp.heading
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            ),
        [usps, searchTerm],
    );

    const deleteMutation = useMutation({
        mutationFn: deleteUsp,
        onSuccess: () => {
            setIsOpen(false);
            toast.success("USP deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["usps"] });
        },
        onError: () => {
            setIsOpen(false);
            toast.error("Failed to delete USP. Please try again.");
        },
    });

    const updatemutation = useMutation({
        mutationFn: async (values: CreateUsp) => {
            if (!editingUsp) return;
            const { data } = await updateUsp(editingUsp?.id!, values);
            return data.usp;
        },
        onSuccess: () => {
            toast.success("USP updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["usps"] });
            setEditingUsp(null);
        },
        onError: () => {
            toast.error("Failed to update USP. Please try again.");
        },
    });
    const createMutation = useMutation({
        mutationFn: async (values: CreateUsp) => {
            const { data } = await createUsp(values);
            return data.usp;
        },
        onSuccess: () => {
            toast.success("USP created successfully!");
            queryClient.invalidateQueries({ queryKey: ["usps"] });
            setIsCreateDialogOpen(false);
        },
        onError: () => {
            toast.error("Failed to create USP. Please try again.");
        },
    });

    return (
        <Card>
            <CardHeader>
                <TableHeaderControls
                    title="USPs"
                    count={filteredUsps?.length ?? 0}
                    countNoun="usp"
                    isFetching={isFetching}
                    onRefresh={refetch}
                    onCreate={() => setIsCreateDialogOpen(true)}
                    searchTerm={searchTerm}
                    onSearch={setSearchTerm}
                    searchPlaceholder="Search USPs..."
                />
            </CardHeader>
            <CardContent>
                <div className="relative rounded-md border">
                    <CommonOverlaySpinner show={isFetching && !isLoading} />
                    {isLoading ? (
                        <TableLoadingRows rows={6} columns={["h-32 w-full"]} />
                    ) : filteredUsps.length === 0 ? (
                        <EmptyState
                            title="No USPs found"
                            description="Try a different search."
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                            {filteredUsps.map((usp: Usp) => (
                                <Card key={usp.id} className="flex flex-col h-full shadow-sm border border-border/30">
                                    <CardHeader className="pb-2">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold mb-1 flex-1">{usp.heading}</h3>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem className="gap-2" onClick={() => setEditingUsp(usp)}>
                                                            <Edit className="h-4 w-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="gap-2 text-destructive" onClick={() => {
                                                            setIsOpen(true);
                                                            pendingDeleteId = usp.id;
                                                        }}>
                                                            <Trash2 className="h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">{usp.subheading}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc pl-4">
                                            {usp.bulletPoints.map((point, idx) => (
                                                <li key={idx} className="text-sm text-foreground mb-1">{point}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>

            <UspFormDialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
                onSubmit={(data) => createMutation.mutate(data)}
            />

            <UspFormDialog
                key={editingUsp?.id || "edit-dialog"}
                open={!!editingUsp}
                onOpenChange={(open) => !open && setEditingUsp(null)}
                onSubmit={(data) => updatemutation.mutate(data)}
                initialData={editingUsp || undefined}
            />

            <CustomAlertDialog
                isOpen={isOpen}
                onCancel={() => setIsOpen(false)}
                onContinue={() => {
                    if (pendingDeleteId)
                        deleteMutation.mutate(pendingDeleteId);
                }}
            />
        </Card>
    );
}

let pendingDeleteId: string | null = null;
