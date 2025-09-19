"use client";

import { useEffect, useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchImages } from "@/queries/images";
import type { Image as ImageEntity, ImageType } from "@/schemas";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageSizeSelect from "@/components/dashboard/common/page-size-select";

import { Image as ImageIcon, Filter } from "lucide-react";
import NextImage from "next/image";
import { RefreshButton } from "@/components/dashboard/common/refresh-button";
import { OverlaySpinner } from "@/components/dashboard/common/overlay-spinner";
import { PaginationControls } from "@/components/dashboard/common/pagination-controls";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { ImagesSkeleton } from "@/components/dashboard/skeletons/images-skeleton";
import { EmptyState } from "@/components/dashboard/common/empty-state";

const ALL = "ALL" as const;
type AllOrType = typeof ALL | ImageType;

const IMAGE_TYPES: ImageType[] = ["HERO", "LOGO", "COMPANY", "BLOG"];

export default function ImagesPage() {
    const [type, setType] = useState<AllOrType>(ALL);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);

    const effectiveType = useMemo<undefined | ImageType>(() => {
        return type === ALL ? undefined : type;
    }, [type]);

    const { data, error, isError, refetch, isLoading, isFetching } = useQuery({
        queryKey: ["images", { type: effectiveType, page, limit }],
        queryFn: async () => await fetchImages(effectiveType as ImageType | undefined, page, limit),
        staleTime: 30_000,
        placeholderData: keepPreviousData,
        retry: 1,
    });

    useEffect(() => {
        if (isError) {
            toast.error((error as Error)?.message ?? "Failed to load images");
        }
    }, [isError, error]);

    const images = (data?.data.images ?? []) as ImageEntity[];
    const totalPages = data?.data.totalPages ?? 1;
    const totalCount: number = (data?.data?.total ?? data?.data?.count ?? (Array.isArray(images) ? images.length : 0)) as number;

    return (
        <div className="space-y-6 max-w-6xl mx-auto p-4">
            <PageHeader icon={ImageIcon} title="Image Gallery" subtitle="See all your images in one place" />

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Filters</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Type</span>
                        </div>
                        <Select
                            value={type}
                            onValueChange={(val) => {
                                setType(val as AllOrType);
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={ALL}>All</SelectItem>
                                {IMAGE_TYPES.map((t) => (
                                    <SelectItem key={t} value={t}>
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Separator orientation="vertical" className="h-6" />

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
                        <Badge variant="secondary">{totalCount} image{totalCount === 1 ? "" : "s"}</Badge>
                        <div className="ml-auto">
                            <RefreshButton spinning={isFetching} onClick={() => refetch()} />
                        </div>
                    </div>
                </CardContent>
            </Card>

                <div className="relative">
                    <OverlaySpinner show={isFetching} />
                    {isLoading ? (
                        <ImagesSkeleton />
                    ) : images.length === 0 ? (
                        <EmptyState
                            title="No images found"
                            description="Try changing filters or refresh the list."
                        />
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {images.map((img: ImageEntity) => (
                                <Card key={img.id} className="overflow-hidden">
                                    <div className="aspect-video overflow-hidden bg-muted">
                                        <NextImage src={img.url} alt={img.id} height={100} width={100} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex items-center justify-between px-4 py-3">
                                        <Badge variant="secondary">{img.type}</Badge>
                                        <span className="text-xs text-muted-foreground">{new Date(img.createdAt).toLocaleString()}</span>
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
