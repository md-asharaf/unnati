
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
import { Setting, CreateSetting } from "@/schemas";
import { CustomAlertDialog } from "@/components/dashboard/common/custom-alert-dialog";
import { SettingFormDialog } from "./setting-form-dialog";
import { fetchSettings, createSetting, updateSetting, deleteSetting } from "@/queries/settings";

export function SettingsTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState<Setting | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["settings", { page, limit }],
    queryFn: async () => await fetchSettings(page, limit),
  });

  const settings = data?.data.settings ?? [];
  const totalPages = data?.data.totalPages ?? 1;
  const filteredSettings = useMemo(
    () =>
      settings.filter(
        (setting: Setting) =>
          setting.key
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      ),
    [settings, searchTerm],
  );

  const deleteMutation = useMutation({
    mutationFn: deleteSetting,
    onSuccess: () => {
      setIsOpen(false);
      toast.success("Setting deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: () => {
      setIsOpen(false);
      toast.error("Failed to delete setting. Please try again.");
    },
  });

  const updatemutation = useMutation({
    mutationFn: async (values: CreateSetting) => {
      if (!editingSetting) return;
      const data = await updateSetting(editingSetting?.id!, values);
      return data.setting;
    },
    onSuccess: () => {
      toast.success("Setting updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      setEditingSetting(null);
    },
    onError: () => {
      toast.error("Failed to update setting. Please try again.");
    },
  });
  const createMutation = useMutation({
    mutationFn: async (values: CreateSetting) => {
      const data = await createSetting(values);
      return data.setting;
    },
    onSuccess: () => {
      toast.success("Setting created successfully!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      setIsCreateDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to create setting. Please try again.");
    },
  });

  return (
    <Card>
      <CardHeader>
        <TableHeaderControls
          title="Settings"
          count={filteredSettings?.length ?? 0}
          countNoun="setting"
          isFetching={isFetching}
          onRefresh={refetch}
          onCreate={() => setIsCreateDialogOpen(true)}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          searchPlaceholder="Search settings..."
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
                <TableHead>Key</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-16">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableLoadingRows
                  rows={6}
                  columns={["h-4 w-40", "h-4 w-40", "h-4 w-40", "h-8 w-12 rounded"]}
                />
              ) : filteredSettings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="p-6">
                    <EmptyState
                      title="No settings found"
                      description="Try a different search."
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {filteredSettings.map((setting: Setting) => (
                    <TableRow key={setting.id}>
                      <TableCell>{setting.key}</TableCell>
                      <TableCell>{setting.value}</TableCell>
                      <TableCell>{setting.description || "-"}</TableCell>
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
                              onClick={() => setEditingSetting(setting)}
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2 text-destructive"
                              onClick={() => {
                                setIsOpen(true);
                                pendingDeleteId = setting.id;
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

      <SettingFormDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={(data) => createMutation.mutate(data as CreateSetting)}
        initialData={undefined}
      />

      <SettingFormDialog
        key={editingSetting?.id || "edit-dialog"}
        open={!!editingSetting}
        onOpenChange={(open) => !open && setEditingSetting(null)}
        onSubmit={(data) => updatemutation.mutate(data as CreateSetting)}
        initialData={editingSetting || undefined}
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
