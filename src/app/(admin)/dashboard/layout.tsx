"use client"
import { AppSidebar } from "@/components/dashboard/sidebar";
import Loader from "@/components/ui/loader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/providers/auth-provider";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { loading } = useAuth();
    const [defaultOpen, setDefaultOpen] = useState(true);

    useEffect(() => {
        if(typeof window === "undefined") return;
        const stored = window.localStorage.getItem("sidebar_state");
        setDefaultOpen(stored === "true" || stored === null);
    }, []);

    if (loading) {
        return <Loader text="Loading Dashboard..." />;
    }
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="flex-grow">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}