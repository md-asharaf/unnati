
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
import { Course, CreateCourse } from "@/schemas";
import { CustomAlertDialog } from "@/components/dashboard/common/custom-alert-dialog";
import { CourseFormDialog } from "./course-form-dialog";
import { fetchCourses, createCourse, updateCourse, deleteCourse } from "@/queries/courses";

export function CoursesTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["courses", { page, limit }],
    queryFn: async () => await fetchCourses(page, limit),
  });

  const courses = data?.data.courses ?? [];
  const totalPages = data?.data.totalPages ?? 1;
  const filteredCourses = useMemo(
    () =>
      courses.filter(
        (course: Course) =>
          course.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      ),
    [courses, searchTerm],
  );

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      setIsOpen(false);
      toast.success("Course deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: () => {
      setIsOpen(false);
      toast.error("Failed to delete course. Please try again.");
    },
  });

  const updatemutation = useMutation({
    mutationFn: async (values: CreateCourse) => {
      if (!editingCourse) return;
      const data = await updateCourse(editingCourse?.id!, values);
      return data.course;
    },
    onSuccess: () => {
      toast.success("Course updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      setEditingCourse(null);
    },
    onError: () => {
      toast.error("Failed to update course. Please try again.");
    },
  });
  const createMutation = useMutation({
    mutationFn: async (values: CreateCourse) => {
      const data = await createCourse(values);
      return data.course;
    },
    onSuccess: () => {
      toast.success("Course created successfully!");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      setIsCreateDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to create course. Please try again.");
    },
  });

  return (
    <Card>
      <CardHeader>
        <TableHeaderControls
          title="Courses"
          count={filteredCourses?.length ?? 0}
          countNoun="course"
          isFetching={isFetching}
          onRefresh={refetch}
          onCreate={() => setIsCreateDialogOpen(true)}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          searchPlaceholder="Search courses..."
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
                <TableHead>Title</TableHead>
                <TableHead>Subtitle</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead className="w-16">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableLoadingRows
                  rows={6}
                  columns={["h-4 w-36", "h-4 w-36", "h-4 w-36", "h-4 w-36", "h-4 w-36", "h-4 w-36", "h-8 w-12 rounded"]}
                />
              ) : filteredCourses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="p-6">
                    <EmptyState
                      title="No courses found"
                      description="Try a different search."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {filteredCourses.map((course: Course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.subtitle}</TableCell>
                      <TableCell>{course.description}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>{course.language.join(", ")}</TableCell>
                      <TableCell>{course.mode.join(", ")}</TableCell>
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
                              onClick={() => setEditingCourse(course)}
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2 text-destructive"
                              onClick={() => {
                                setIsOpen(true);
                                pendingDeleteId = course.id;
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

      <CourseFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={(data) => createMutation.mutate(data as CreateCourse)}
        initialData={undefined}
        isLoading={createMutation.isPending}
      />

      <CourseFormDialog
        key={editingCourse?.id || "edit-dialog"}
        open={!!editingCourse}
        onOpenChange={(open) => !open && setEditingCourse(null)}
        onSubmit={(data) => updatemutation.mutate(data as CreateCourse)}
        initialData={editingCourse || undefined}
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
