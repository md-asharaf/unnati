import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/layout/header";
import { Footer } from "./components/layout/footer";
import { Hero } from "./components/layout/sections/hero";
import { PremiumPartners } from "./components/layout/sections/premium-partners";

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const logoUrl =
        "https://upload.wikimedia.org/wikipedia/commons/e/ea/Superman_shield.svg";

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="min-h-screen bg-background flex flex-col">
                    <header>
                        <Header logoUrl={logoUrl} />
                    </header>
                    <main className="flex-grow">{children}</main>

                    <footer className="mt-auto">
                        <Footer logoUrl={logoUrl} />
                    </footer>
                </div>
            </body>
        </html>
    );
}
