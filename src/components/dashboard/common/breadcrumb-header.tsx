"use client";

import { usePathname } from "next/navigation";
import React from "react";
import HeaderUser from "@/components/dashboard/header-user";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { toLabel } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function BreadcrumbHeader() {
    const pathname = usePathname();
    const segments = (pathname || "/").split("/").filter(Boolean);
    const dashIdx = Math.max(segments.indexOf("dashboard"), 0);
    const trail = segments.slice(dashIdx + 1);
    let href = "/dashboard";
    const crumbs: Crumb[] = trail.map((seg, idx) => {
        href += `/${seg}`;
        return {
            label: toLabel(seg),
            href: idx === trail.length - 1 ? undefined : href,
        };
    });

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center justify-between w-full">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/dashboard">
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        {crumbs.length > 0 ? (
                            <>
                                {crumbs.slice(0, -1).map((c, i) => (
                                    <React.Fragment key={`crumb-${i}`}>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink
                                                href={c.href || "#"}
                                            >
                                                {c.label}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                    </React.Fragment>
                                ))}
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {crumbs[crumbs.length - 1]?.label ?? ""}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        ) : (
                            <BreadcrumbItem>
                                <BreadcrumbPage>Overview</BreadcrumbPage>
                            </BreadcrumbItem>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="ml-auto">
                    <HeaderUser />
                </div>
            </div>
        </header>
    );
}

export default BreadcrumbHeader;
