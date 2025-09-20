"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
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
import {
    createCompany,
    deleteCompany,
    fetchCompanies,
    updateCompany,
} from "@/queries/companies";
import type { Company, CreateCompany, UpdateCompany } from "@/schemas";
import { CustomAlertDialog } from "../common/custom-alert-dialog";
import { CompanyFormDialog } from "./company-form-dialog";

export function CompaniesTable() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [editingCompany, setEditingCompany] = useState<Company | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const queryClient = useQueryClient();
    const { data, isLoading, isFetching, refetch } = useQuery({
        queryKey: ["companies", { page, limit }],
        queryFn: async () => await fetchCompanies(page, limit),
    });

    const companies = data?.data.companies ?? [];
    const totalPages = data?.data.totalPages ?? 1;
    const filteredCompanies = useMemo(
        () =>
            companies.filter(
                (company: Company) =>
                    company.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    company.id.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        [companies, searchTerm],
    );

    const deleteMutation = useMutation({
        mutationFn: deleteCompany,
        onSuccess: () => {
            setIsOpen(false);
            toast.success("Company deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["companies"] })
        },
        onError: () => {
            setIsOpen(false);
            toast.error("Failed to delete company. Please try again.");
        },
    });

    const updatemutation = useMutation({
        mutationFn: async (values: UpdateCompany) => {
            if (!editingCompany) return;
            const { data } = await updateCompany(editingCompany?.id!, values);
            return data.company;
        },
        onSuccess: () => {
            toast.success("Company updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["companies"] });
            setEditingCompany(null);
        },
        onError: () => {
            toast.error("Failed to update company. Please try again.");
        },
    });
    const createMutation = useMutation({
        mutationFn: async (values: CreateCompany) => {
            const { data } = await createCompany(values);
            return data.company;
        },
        onSuccess: ( ) => {
            toast.success("Company created successfully!");
            queryClient.invalidateQueries({ queryKey: ["companies"] });
            setIsCreateDialogOpen(false);
        },
        onError: () => {
            toast.error("Failed to create company. Please try again.");
        },
    });

    return (
        <Card>
            <CardHeader>
                <TableHeaderControls
                    title="Companies"
                    count={filteredCompanies?.length ?? 0}
                    countNoun="company"
                    isFetching={isFetching}
                    onRefresh={refetch}
                    onCreate={() => setIsCreateDialogOpen(true)}
                    searchTerm={searchTerm}
                    onSearch={setSearchTerm}
                    searchPlaceholder="Search companies..."
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
                                <TableHead>Logo</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>isPremium</TableHead>
                                <TableHead>Updated</TableHead>
                                <TableHead className="w-16">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableLoadingRows
                                    rows={6}
                                    columns={[
                                        "h-12 w-40 rounded-md",
                                        "h-4 w-40",
                                        "h-4 w-40",
                                        "h-4 w-40",
                                        "h-8 w-12 rounded",
                                    ]}
                                />
                            ) : filteredCompanies.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="p-6">
                                        <EmptyState
                                            title="No companies found"
                                            description="Try a different search."
                                        />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    {filteredCompanies.map((company: Company) => (
                                        <TableRow key={company.id}>
                                            <TableCell>
                                                <Image
                                                    src={
                                                        company.logo?.url ||
                                                        "/placeholder.svg"
                                                    }
                                                    width={50}
                                                    height={50}
                                                    alt={company.name}
                                                    className="h-12 w-12 rounded-md object-cover"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium max-w-xs">
                                                <div className="truncate" title={company.name}>
                                                    {company.name}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground font-mono text-sm">
                                                {company.isPremium ? "Yes" : "No"}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {new Date(
                                                    company.updatedAt,
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
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
                                                            onClick={() =>
                                                                setEditingCompany(company)
                                                            }
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="gap-2 text-destructive"
                                                            onClick={() => {
                                                                setIsOpen(true);
                                                                pendingDeleteSlug =
                                                                    company.name;
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

            <CompanyFormDialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
                onSubmit={(data) =>
                    createMutation.mutate({
                        ...data,
                        logo: data.logo!,
                    })
                }
            />

            <CompanyFormDialog
                key={editingCompany?.name || "edit-dialog"}
                open={!!editingCompany}
                onOpenChange={(open) => !open && setEditingCompany(null)}
                onSubmit={(data) => updatemutation.mutate(data)}
                initialData={editingCompany || undefined}
            />

            <CustomAlertDialog
                isOpen={isOpen}
                onCancel={() => setIsOpen(false)}
                onContinue={() => {
                    if (pendingDeleteSlug)
                        deleteMutation.mutate(pendingDeleteSlug);
                }}
            />
        </Card>
    );
}

let pendingDeleteSlug: string | null = null;
