import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import QueryProvider from "@/providers/query-provider";
import { fetchSettings } from "@/queries/settings";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Unnati - Learn and Grow",
    description: "Your platform for premium educational courses",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { setting } = await fetchSettings()
    const { email, phone, facebook, instagram, linkedin, twitter } = setting || {};
    const logoUrl =
        "https://upload.wikimedia.org/wikipedia/commons/e/ea/Superman_shield.svg";
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} font-mono antialiased`}
            ><QueryProvider>
                    <div className="min-h-screen flex flex-col">
                        <header>
                            <Header logoUrl={logoUrl} phone={phone} email={email} social={{ facebook, linkedin, instagram, twitter }} />
                        </header>
                        <main className="flex-grow">{children}</main>

                        <footer className="mt-auto">
                            <Footer logoUrl={logoUrl} />
                        </footer>
                    </div>
                </QueryProvider>
            </body>
        </html>
    );
}
