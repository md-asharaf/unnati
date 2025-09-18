"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchTrainers, deleteTrainer, updateTrainer, createTrainer } from "@/queries/trainers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { TrainerFormDialog } from "./trainer-form-dialog";
import { EmptyState } from "@/components/dashboard/common/empty-state";
import { TableLoadingRows } from "@/components/dashboard/common/table-loading-rows";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { OverlaySpinner } from "../common/overlay-spinner";
import TableHeaderControls from "@/components/dashboard/common/table-header-controls";
import { Trainer, CreateTrainer } from "@/schemas";
import { CustomAlertDialog } from "../common/custom-alert-dialog";

export function TrainersTable() {
    const qc = useQueryClient();
    const [alertOpen, setAlertOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [createOpen, setCreateOpen] = useState(false);
    const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
    const { data: trainers = [], isLoading, isFetching } = useQuery({
        queryKey: ["trainers"],
        queryFn: async (): Promise<Trainer[]> => {
            const { data } = await fetchTrainers()
            return data.trainers;
        }
    });
    const filtered = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        if (!q) return trainers;
        return trainers.filter((b: any) =>
            [b.name, b.phone, b.address].some((v: string) => (v || "").toLowerCase().includes(q))
        );
    }, [trainers, searchTerm]);

    const deleteMutation = useMutation({
        mutationFn: deleteTrainer,
        onSuccess: (_, id) => {
            setAlertOpen(false);
            toast.success("Trainer deleted successfully");
            qc.invalidateQueries({ queryKey: ["trainers"] });
            qc.setQueryData(["trainers"], (old: Trainer[] = []) =>
                old.filter((trainer) => trainer.id !== id),
            );
        },
        onError: () => {
            setAlertOpen(false);
            toast.error("Failed to delete trainer. Please try again.");
        },
    });

    const updatemutation = useMutation({
        mutationFn: async (values: CreateTrainer) => {
            if (!editingTrainer) return;
            const { data } = await updateTrainer(editingTrainer?.id!, values);
            return data.trainer;
        },
        onSuccess: (updateTrainer) => {
            if (!updateTrainer) return;
            toast.success("Trainer updated successfully!");
            qc.setQueryData(["trainers"], (old: Trainer[] = []) =>
                old.map((trainer) =>
                    trainer.id === updateTrainer.id ? updateTrainer : trainer,
                ),
            );
            setEditingTrainer(null);
        },
        onError: (error) => {
            toast.error("Failed to update trainer. Please try again.");
        },
    });
    const createMutation = useMutation({
        mutationFn: async (values: CreateTrainer) => {
            const { data } = await createTrainer(values);
            return data.trainer;
        },
        onSuccess: (newTrainer) => {
            if (!newTrainer) return;
            toast.success("Trainer created successfully!");
            qc.setQueryData(["trainers"], (old: Trainer[] = []) => [
                ...old,
                newTrainer,
            ]);
            setCreateOpen(false);
        },
        onError: (error) => {
            toast.error("Failed to create trainer. Please try again.");
        },
    });

    return (
        <Card>
            <CardHeader>
                <TableHeaderControls
                    title="Trainers"
                    count={filtered.length}
                    countNoun="trainer"
                    isFetching={isFetching}
                    onRefresh={() => qc.invalidateQueries({ queryKey: ["trainers"] })}
                    onCreate={() => setCreateOpen(true)}
                    searchTerm={searchTerm}
                    onSearch={setSearchTerm}
                    searchPlaceholder="Search trainers..."
                    pageSize={filtered.length || 0}
                    onChangePageSize={() => { }}
                    showPageSize={false}
                />
            </CardHeader>
            <CardContent>
                <div className="relative rounded-md border">
                    <OverlaySpinner show={isFetching && !isLoading} />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Designation</TableHead>
                                <TableHead>Expertise</TableHead>
                                <TableHead>Experience</TableHead>
                                <TableHead className="w-16">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableLoadingRows rows={6} columns={[
                                    "h-8 w-40",
                                    "h-8 w-40",
                                    "h-8 w-40",
                                    "h-8 w-40",
                                    "h-8 w-12 rounded",
                                ]} />
                            ) : filtered.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <EmptyState title="No trainers" description={searchTerm ? "Try a different search." : "Create your first trainer to get started."} />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filtered.map((b) => (
                                    <TableRow key={b.id}>
                                        <TableCell>{b.name}</TableCell>
                                        <TableCell>{b.designation}</TableCell>
                                        <TableCell>{b.expertise}</TableCell>
                                        <TableCell>{b.experience}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        className="gap-2"
                                                        onClick={() =>
                                                            setEditingTrainer(b)
                                                        }
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="gap-2 text-destructive"
                                                        onClick={() => {
                                                            setAlertOpen(true);
                                                            pendingDeleteId = b.id;
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            <TrainerFormDialog
                key={editingTrainer?.id || "edit-dialog"}
                open={!!editingTrainer}
                onOpenChange={(open) => !open && setEditingTrainer(null)}
                onSubmit={(data) => updatemutation.mutate(data)}
                title="Edit Trainer"
                initialData={editingTrainer || undefined}
            />
            <TrainerFormDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
                onSubmit={(data) => {
                    createMutation.mutate(data)
                }}
                title="Create New Trainer"
            />
            <CustomAlertDialog
                isOpen={alertOpen}
                onCancel={() => setAlertOpen(false)}
                onContinue={() => {
                    if (pendingDeleteId) {
                        deleteMutation.mutate(pendingDeleteId);
                    }
                }}
            />
        </Card>
    );
}

let pendingDeleteId: string | null = null;

