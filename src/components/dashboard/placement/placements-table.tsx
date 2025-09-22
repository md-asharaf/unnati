
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import TableLoadingRows from "@/components/dashboard/common/table-loading-rows";
import { EmptyState } from "@/components/dashboard/common/empty-state";
import { OverlaySpinner as CommonOverlaySpinner } from "@/components/dashboard/common/overlay-spinner";
import { PaginationControls } from "@/components/dashboard/common/pagination-controls";
import TableHeaderControls from "@/components/dashboard/common/table-header-controls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Placement, CreatePlacement } from "@/schemas";
import { CustomAlertDialog } from "@/components/dashboard/common/custom-alert-dialog";
import { PlacementFormDialog } from "./placement-form-dialog";
import { fetchPlacements, createPlacement, updatePlacement, deletePlacement } from "@/queries/placements";

export function PlacementsTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPlacement, setEditingPlacement] = useState<Placement | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["placements", { page, limit }],
    queryFn: async () => await fetchPlacements(page, limit),
  });

  const placements = data?.data.placements ?? [];
  const totalPages = data?.data.totalPages ?? 1;
  const filteredPlacements = useMemo(
    () =>
      placements.filter(
        (placement: Placement) =>
          placement.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      ),
    [placements, searchTerm],
  );

  const deleteMutation = useMutation({
    mutationFn: deletePlacement,
    onSuccess: () => {
      setIsOpen(false);
      toast.success("Placement deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["placements"] });
    },
    onError: () => {
      setIsOpen(false);
      toast.error("Failed to delete placement. Please try again.");
    },
  });

  const updatemutation = useMutation({
    mutationFn: async (values: CreatePlacement) => {
      if (!editingPlacement) return;
      const data = await updatePlacement(editingPlacement?.id!, values);
      return data.placement;
    },
    onSuccess: () => {
      toast.success("Placement updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["placements"] });
      setEditingPlacement(null);
    },
    onError: () => {
      toast.error("Failed to update placement. Please try again.");
    },
  });
  const createMutation = useMutation({
    mutationFn: async (values: CreatePlacement) => {
      const data = await createPlacement(values);
      return data.placement;
    },
    onSuccess: () => {
      toast.success("Placement created successfully!");
      queryClient.invalidateQueries({ queryKey: ["placements"] });
      setIsCreateDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to create placement. Please try again.");
    },
  });

  return (
    <Card>
      <CardHeader>
        <TableHeaderControls
          title="Placements"
          count={filteredPlacements?.length ?? 0}
          countNoun="placement"
          isFetching={isFetching}
          onRefresh={refetch}
          onCreate={() => setIsCreateDialogOpen(true)}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          searchPlaceholder="Search placements..."
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
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead className="w-16">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableLoadingRows
                  rows={6}
                  columns={["h-4 w-40", "h-4 w-40", "h-4 w-40", "h-4 w-40", "h-8 w-12 rounded"]}
                />
              ) : filteredPlacements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="p-6">
                    <EmptyState
                      title="No placements found"
                      description="Try a different search."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {filteredPlacements.map((placement: Placement) => (
                    <TableRow key={placement.id}>
                      <TableCell>{placement.name}</TableCell>
                      <TableCell>{placement.role}</TableCell>
                      <TableCell>{placement.company?.name}</TableCell>
                      <TableCell>{placement.photoUrl ? <img src={placement.photoUrl} alt="photo" className="h-8 w-8 rounded-full" /> : "-"}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="gap-2"
                              onClick={() => setEditingPlacement(placement)}
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2 text-destructive"
                              onClick={() => {
                                setIsOpen(true);
                                pendingDeleteId = placement.id;
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

      <PlacementFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={(data) => createMutation.mutate(data as CreatePlacement)}
        initialData={undefined}
        isLoading={createMutation.isPending}
      />

      <PlacementFormDialog
        key={editingPlacement?.id || "edit-dialog"}
        open={!!editingPlacement}
        onOpenChange={(open) => !open && setEditingPlacement(null)}
        onSubmit={(data) => updatemutation.mutate(data as CreatePlacement)}
        initialData={editingPlacement || undefined}
        isLoading={updatemutation.isPending}
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
