"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchBranches, deleteBranch, updateBranch, createBranch } from "@/queries/branches";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { BranchFormDialog } from "./branch-form-dialog";
import { EmptyState } from "@/components/dashboard/common/empty-state";
import { TableLoadingRows } from "@/components/dashboard/common/table-loading-rows";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { OverlaySpinner } from "../common/overlay-spinner";
import TableHeaderControls from "@/components/dashboard/common/table-header-controls";
import { Branch, CreateBranch } from "@/schemas";
import { CustomAlertDialog } from "../common/custom-alert-dialog";

export function BranchesTable() {
  const qc = useQueryClient();
  const [alertOpen, setAlertOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["branches"],
    queryFn: fetchBranches
  });
  const branches = data?.branches ?? [];
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return branches;
    return branches.filter((b: any) =>
      [b.name, b.phone, b.address].some((v: string) => (v || "").toLowerCase().includes(q))
    );
  }, [branches, searchTerm]);

  const deleteMutation = useMutation({
    mutationFn: deleteBranch,
    onSuccess: () => {
      setAlertOpen(false);
      toast.success("Branch deleted successfully");
      qc.invalidateQueries({ queryKey: ["branches"] });
    },
    onError: () => {
      setAlertOpen(false);
      toast.error("Failed to delete branch. Please try again.");
    },
  });

  const updatemutation = useMutation({
    mutationFn: async (values: CreateBranch) => {
      if (!editingBranch) return;
      const data = await updateBranch(editingBranch?.id!, values);
      return data.branch;
    },
    onSuccess: () => {
      toast.success("Branch updated successfully!");
      qc.invalidateQueries({ queryKey: ["branches"] });
      setEditingBranch(null);
    },
    onError: () => {
      toast.error("Failed to update branch. Please try again.");
    },
  });
  const createMutation = useMutation({
    mutationFn: async (values: CreateBranch) => {
      const data = await createBranch(values);
      return data.branch;
    },
    onSuccess: () => {
      toast.success("Branch created successfully!");
      qc.invalidateQueries({ queryKey: ["branches"] });
      setCreateOpen(false);
    },
    onError: () => {
      toast.error("Failed to create branch. Please try again.");
    },
  });

  return (
    <Card>
      <CardHeader>
        <TableHeaderControls
          title="Branches"
          count={filtered.length}
          countNoun="branch"
          isFetching={isFetching}
          onRefresh={() => qc.invalidateQueries({ queryKey: ["branches"] })}
          onCreate={() => setCreateOpen(true)}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          searchPlaceholder="Search branches..."
        />
      </CardHeader>
      <CardContent>
        <div className="relative rounded-md border">
          <OverlaySpinner show={isFetching && !isLoading} />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Updated</TableHead>
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
                    <EmptyState title="No branches" description={searchTerm ? "Try a different search." : "Create your first branch to get started."} />
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>{b.name}</TableCell>
                    <TableCell>{b.phone}</TableCell>
                    <TableCell>{b.address}</TableCell>
                    <TableCell>{new Date(b.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</TableCell>
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
                              setEditingBranch(b)
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
      <BranchFormDialog
        key={editingBranch?.id || "edit-dialog"}
        open={!!editingBranch}
        onOpenChange={(open) => !open && setEditingBranch(null)}
        onSubmit={(data) => updatemutation.mutate(data)}
        initialData={editingBranch || undefined}
        isLoading={updatemutation.isPending}
      />
      <BranchFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={(data) => {
          createMutation.mutate(data)
        }}
        isLoading={createMutation.isPending}
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

