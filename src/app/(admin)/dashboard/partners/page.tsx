"use client";

import { useEffect, useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Image as Partner } from "@/schemas";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageSizeSelect from "@/components/dashboard/common/page-size-select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { Building2, Trash } from "lucide-react";
import NextImage from "next/image";

import { PartnerUpload } from "@/components/dashboard/partner/partner-upload";
import { CustomAlertDialog } from "@/components/dashboard/common/custom-alert-dialog";
import { deletePartner, fetchPartners } from "@/queries/partners";

import { PageHeader } from "@/components/dashboard/common/page-header";
import { OverlaySpinner } from "@/components/dashboard/common/overlay-spinner";
import { PaginationControls } from "@/components/dashboard/common/pagination-controls";
import { RefreshButton } from "@/components/dashboard/common/refresh-button";
import { PartnersSkeleton } from "@/components/dashboard/skeletons/partners-skeleton";
import { EmptyState } from "@/components/dashboard/common/empty-state";

export default function PartnersPage() {
    const [openId, setOpenId] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);

    const queryClient = useQueryClient();

    const { data, error, isError, refetch, isLoading, isFetching } = useQuery({
        queryKey: ["partners", { page, limit }],
        queryFn: async () => await fetchPartners(page, limit),
        placeholderData: keepPreviousData,
        staleTime: 30_000,
        retry: 1,
    });

    useEffect(() => {
        if (isError) {
            toast.error((error as Error)?.message ?? "Failed to load partners");
        }
    }, [isError, error]);

    const partners = (data?.data.images ?? []) as Partner[];
    const totalPages = data?.data.totalPages ?? 1;
    const totalCount: number = (data?.data?.total ?? data?.data?.count ?? (Array.isArray(partners) ? partners.length : 0)) as number;

    const deleteMutation = useMutation({
        mutationFn: deletePartner,
        onSuccess: (_, deletedId) => {
            toast.success("Partner deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["partners"] });
            queryClient.setQueryData(["partners", { page, limit }], (old: { data?: { images?: Partner[] } } | undefined) => {
                const current = old?.data?.images ?? [];
                return {
                    ...(old ?? {}),
                    data: {
                        ...(old?.data ?? {}),
                        images: current.filter((p) => p.id !== deletedId),
                    },
                } as typeof old;
            });
            setOpenId(null);
        },
        onError: () => {
            toast.error("Failed to delete partner. Please try again.");
        },
    });

    return (
        <div className="space-y-6 max-w-6xl mx-auto p-4">
            <PageHeader icon={Building2} title="Premium Partners" subtitle="Manage and showcase your premium partner logos" />

            <PartnerUpload />

            <Card className="p-4">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                        <PageSizeSelect
                            value={limit}
                            onChange={(val) => {
                                setLimit(Number(val));
                                setPage(1);
                            }}
                        />
                    </div>

                    <Separator orientation="vertical" className="h-6" />
                    <Badge variant="secondary">{totalCount} partner{totalCount === 1 ? "" : "s"}</Badge>
                    <div className="ml-auto">
                        <RefreshButton spinning={isFetching} onClick={() => refetch()} />
                    </div>
                </div>
            </Card>

            <div className="relative">
                <OverlaySpinner show={isFetching} />
                {isLoading ? (
                    <PartnersSkeleton />
                ) : partners.length === 0 ? (
                    <EmptyState
                        title="No partners yet"
                        description="Upload your first partner to get started"
                    />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {partners.map((partner: Partner, index) => (
                            <Card key={partner.id} className="group relative hover:shadow-md transition-all duration-200 hover:scale-[1.02] overflow-hidden">
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="absolute rounded-full top-2 right-2 z-10 p-2 h-auto opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                                    disabled={deleteMutation.isPending}
                                    aria-label="Delete partner"
                                    onClick={() => setOpenId(partner.id)}
                                >
                                    <Trash className="w-4 h-4" />
                                </Button>
                                <CustomAlertDialog
                                    isOpen={openId === partner.id}
                                    description="This action cannot be undone"
                                    onCancel={() => setOpenId(null)}
                                    onContinue={() => deleteMutation.mutate(partner.id)}
                                />
                                <div className="p-4">
                                    <div className="aspect-[3/2] relative bg-muted/20 rounded-lg overflow-hidden">
                                        <NextImage
                                            src={partner.url || "/placeholder.svg"}
                                            alt={`Partner ${index + 1}`}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <PaginationControls
                page={page}
                totalPages={totalPages}
                isFetching={isFetching}
                onPrev={() => setPage((p) => Math.max(1, p - 1))}
                onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
                onPageChange={(p) => setPage(p)}
            />
        </div>
    );
}
