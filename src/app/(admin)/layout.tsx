import "@/app/globals.css";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/auth-provider";
export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className="antialiased"
            >
                <AuthProvider>
                    <QueryProvider>
                        <main className="min-h-screen">{children}</main>
                    </QueryProvider>
                </AuthProvider>
                <Toaster richColors />
            </body>
        </html>
    );
}
