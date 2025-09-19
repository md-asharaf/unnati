"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import { cn } from "@/lib/utils";

export function Breadcrumb({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return <nav aria-label="Breadcrumb" className={className} {...props} />;
}

export function BreadcrumbList({
    className,
    ...props
}: React.HTMLAttributes<HTMLOListElement>) {
    return (
        <ol
            className={cn(
                "flex items-center gap-1 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                className,
            )}
            {...props}
        />
    );
}

export function BreadcrumbItem({
    className,
    ...props
}: React.LiHTMLAttributes<HTMLLIElement>) {
    return (
        <li
            className={cn("flex items-center gap-1 shrink-0", className)}
            {...props}
        />
    );
}

export function BreadcrumbSeparator({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            role="presentation"
            className={cn("mx-1 text-muted-foreground", className)}
            {...props}
        >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
    );
}

type BreadcrumbLinkProps = React.ComponentProps<typeof Link> & {
    asChild?: boolean;
};

export function BreadcrumbLink({ className, ...props }: BreadcrumbLinkProps) {
    return (
        <Link
            className={cn("hover:text-foreground transition-colors", className)}
            {...props}
        />
    );
}

export function BreadcrumbPage({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            className={cn("text-foreground font-medium", className)}
            {...props}
        />
    );
}
