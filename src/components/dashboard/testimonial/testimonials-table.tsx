
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
import { Testimonial, CreateTestimonial } from "@/schemas";
import { CustomAlertDialog } from "@/components/dashboard/common/custom-alert-dialog";
import { TestimonialFormDialog } from "./testimonial-form-dialog";
import { fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "@/queries/testimonials";

export function TestimonialsTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["testimonials", { page, limit }],
    queryFn: async () => await fetchTestimonials(page, limit),
  });

  const testimonials = data?.testimonials ?? [];
  const totalPages = data?.totalPages ?? 1;
  const filteredTestimonials = useMemo(
    () =>
      testimonials.filter(
        (testimonial: Testimonial) =>
          testimonial.content
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      ),
    [testimonials, searchTerm],
  );

  const deleteMutation = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      setIsOpen(false);
      toast.success("Testimonial deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: () => {
      setIsOpen(false);
      toast.error("Failed to delete testimonial. Please try again.");
    },
  });

  const updatemutation = useMutation({
    mutationFn: async (values: CreateTestimonial) => {
      if (!editingTestimonial) return;
      const data = await updateTestimonial(editingTestimonial?.id!, values);
      return data.testimonial;
    },
    onSuccess: () => {
      toast.success("Testimonial updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setEditingTestimonial(null);
    },
    onError: () => {
      toast.error("Failed to update testimonial. Please try again.");
    },
  });
  const createMutation = useMutation({
    mutationFn: async (values: CreateTestimonial) => {
      const data = await createTestimonial(values);
      return data.testimonial;
    },
    onSuccess: () => {
      toast.success("Testimonial created successfully!");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setIsCreateDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to create testimonial. Please try again.");
    },
  });

  return (
    <Card>
      <CardHeader>
        <TableHeaderControls
          title="Testimonials"
          count={filteredTestimonials?.length ?? 0}
          countNoun="testimonial"
          isFetching={isFetching}
          onRefresh={refetch}
          onCreate={() => setIsCreateDialogOpen(true)}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          searchPlaceholder="Search testimonials..."
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
                <TableHead>Content</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Placement</TableHead>
                <TableHead className="w-16">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableLoadingRows
                  rows={6}
                  columns={["h-4 w-40", "h-4 w-40", "h-4 w-40", "h-8 w-12 rounded"]}
                />
              ) : filteredTestimonials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="p-6">
                    <EmptyState
                      title="No testimonials found"
                      description="Try a different search."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {filteredTestimonials.map((testimonial: Testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate" title={testimonial.content}>
                          {testimonial.content}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground font-mono text-sm">
                        {testimonial.rating}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {testimonial.placement?.name}
                      </TableCell>
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
                              onClick={() => setEditingTestimonial(testimonial)}
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2 text-destructive"
                              onClick={() => {
                                setIsOpen(true);
                                pendingDeleteId = testimonial.id;
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

      <TestimonialFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={(data) => createMutation.mutate(data as CreateTestimonial)}
        initialData={undefined}
        isLoading={createMutation.isPending}
      />

      <TestimonialFormDialog
        key={editingTestimonial?.id || "edit-dialog"}
        open={!!editingTestimonial}
        onOpenChange={(open) => !open && setEditingTestimonial(null)}
        onSubmit={(data) => updatemutation.mutate(data as CreateTestimonial)}
        initialData={editingTestimonial || undefined}
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
