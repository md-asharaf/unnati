"use client"
import { AppSidebar } from "@/components/dashboard/sidebar";
import Loader from "@/components/ui/loader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BreadcrumbHeader } from "@/components/dashboard/common/breadcrumb-header";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { loading, admin } = useAuth();
    const [defaultOpen, setDefaultOpen] = useState(true);
    const router = useRouter();
    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = window.localStorage.getItem("sidebar_state");
        setDefaultOpen(stored === "true" || stored === null);
    }, []);
    useEffect(() => {
        if (!loading && !admin) {
            router.push("/login")
        }
    }, [admin, loading, router])
    if (loading) {
        return <Loader text="Loading..." />;
    }
    if (!admin) {
        return null;
    }
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar admin={admin} />
            <main className="flex-grow">
                <BreadcrumbHeader />
                {children}
            </main>
        </SidebarProvider>
    );
}