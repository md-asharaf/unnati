"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star } from "lucide-react";
import { fetchCourses } from "@/queries/courses";
import { Course } from "@/schemas";

interface InitialData {
  courses: Course[];
  page: number;
  limit: number;
  total?: number;
}

export function CoursesInfinite({ initialData }: { initialData: InitialData }) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["courses", initialData.limit],
    initialPageParam: initialData.page,
    queryFn: async ({ pageParam }) => {
      return await fetchCourses(pageParam, initialData.limit);
    },
    getNextPageParam: (lastPage: any, allPages) => {
      const list = lastPage?.courses || [];
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
      entries => {
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

  const courses = data?.pages.flatMap((p: any) => p.courses) || [];

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course: Course) => (
          <Card key={course.id} className="group overflow-hidden border-border/60 hover:shadow-sm transition-shadow">
            <CardHeader className="p-0">
              <div className="relative aspect-[16/9] overflow-hidden">
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:md:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent" />
                <span className="absolute top-2 left-2 rounded-full bg-background/80 backdrop-blur px-2.5 py-1 text-[10px] sm:text-[11px] font-medium tracking-wide line-clamp-1">{course.subtitle}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-3 sm:pt-4 flex flex-col gap-2.5 sm:gap-3">
              <Stars value={Math.random() * 5} />
              <CardTitle className="text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-secondary transition-colors">{course.title}</CardTitle>
              {course.description && (
                <CardDescription className="line-clamp-3 text-[12px] sm:text-sm leading-relaxed">{course.description}</CardDescription>
              )}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px]">
                {course.duration && (
                  <span className="px-2 py-1 rounded-md bg-secondary/15 text-secondary font-medium">{course.duration}</span>
                )}
                {course.mode?.map(m => (
                  <span key={m} className="px-2 py-1 rounded-md bg-accent/15 text-accent font-medium">{m}</span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button asChild variant="secondary" className="w-full h-9 sm:h-10 text-xs sm:text-sm font-medium">
                <Link href={`/courses/${course.id}`}>More Info</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        {isFetchingNextPage && (
          <Card className="border-dashed animate-pulse">
            <CardContent className="h-full flex items-center justify-center text-xs text-muted-foreground">Loading...</CardContent>
          </Card>
        )}
      </div>
      <div ref={sentinelRef} />
      {!hasNextPage && !isFetchingNextPage && courses.length > 0 && (
        <div className="text-center text-[11px] sm:text-xs text-muted-foreground">No more courses</div>
      )}
      {courses.length === 0 && !isFetchingNextPage && (
        <div className="text-center text-sm text-muted-foreground">No courses available</div>
      )}
    </div>
  );
}

function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-0.5 text-amber-400 mb-1" aria-label={`Rating ${value}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < full ? "fill-amber-400" : "fill-transparent"} stroke-amber-400`} />
      ))}
      <span className="ml-2 text-xs font-medium text-muted-foreground">{value.toFixed(1)}</span>
    </div>
  );
}