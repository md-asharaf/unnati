"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { fetchPlacements } from "@/queries/placements";
import { Placement } from "@/schemas";

interface Props {
    initialData: {
        placements: Placement[];
        page: number;
        limit: number;
        total: number;
    };
}

export function PlacementsInfinite({ initialData }: Props) {
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const { data, hasNextPage, isFetchingNextPage, isError, fetchNextPage } = useInfiniteQuery({
        queryKey: ["placements", initialData.limit],
        initialPageParam: initialData.page,
        queryFn: async ({ pageParam }) => {
            const { data } = await fetchPlacements(pageParam, initialData.limit)
            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            const list = (lastPage?.placements || []) as Placement[];
            if (list.length < initialData.limit) return undefined;
            return (allPages.length || 1) + 1;
        },
        initialData: {
            pages: [initialData],
            pageParams: [initialData.page],
        },
        staleTime: 30_000,
    });

    useEffect(() => {
        if (!sentinelRef.current) return;
        const el = sentinelRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { root: null, rootMargin: "200px", threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const placements = data?.pages.flatMap(p => p.placements) || [];
    return (
        <div className="flex flex-col gap-8">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {placements.map((placement) => (
                    <Card key={placement.id} className="group relative overflow-hidden p-0 aspect-[4/5] flex flex-col">
                        {placement.photoUrl && (
                            <div className="relative flex-1 overflow-hidden">
                                <img
                                    src={placement.photoUrl}
                                    alt={placement.name}
                                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background/80" />
                                {placement.company?.logo?.url && (
                                    <img
                                        src={placement.company.logo.url}
                                        alt={placement.company.name + ' Logo'}
                                        className="absolute top-3 right-3 w-12 h-12 rounded object-contain bg-background/70 backdrop-blur p-1 shadow"
                                        loading="lazy"
                                    />
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">{placement.name}</h3>
                                    <p className="text-[11px] text-muted-foreground line-clamp-1">{placement.role}</p>
                                </div>
                            </div>
                        )}
                        <div className="px-4 py-2 flex items-center justify-between text-[11px] text-muted-foreground bg-background/90 backdrop-blur-sm border-t">
                            <span className="truncate">{placement.company?.name}</span>
                            <span>{new Date(placement.createdAt).getFullYear()}</span>
                        </div>
                    </Card>
                ))}
            </div>
            <div ref={sentinelRef} />
            {isFetchingNextPage && (
                <div className="text-center text-sm text-muted-foreground">Loading more...</div>
            )}
            {!hasNextPage && !isFetchingNextPage && (
                <div className="text-center text-xs text-muted-foreground">No more placements</div>
            )}
            {isError && (
                <div className="text-center text-xs text-destructive">Error loading placements</div>
            )}
        </div>
    );
}