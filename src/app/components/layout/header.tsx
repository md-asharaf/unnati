"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/placements", label: "Placements" },
    { href: "/contact", label: "Contact" },
    { href: "/gallery", label: "Gallery" },
];

interface HeaderProps {
    logoUrl: string;
}

export const Header = ({ logoUrl }: HeaderProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="w-full bg-background border-b border-border shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <Image
                        src={logoUrl || "/placeholder.svg"}
                        alt="Logo"
                        width={50}
                        height={50}
                        className="h-10 w-10 md:h-12 md:w-12"
                    />
                </div>

                {/* Desktop Nav links - Using primary color for main navigation */}
                <ul className="hidden md:flex items-center space-x-4 lg:space-x-8 font-medium text-foreground">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="hover:text-accent transition-colors duration-200 focus:outline-none focus:text-accent"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-3">
                    {/* Search - Secondary interaction */}
                    {/*<button
                        className="p-2 rounded-full hover:bg-secondary transition-colors duration-200 focus:bg-secondary focus:outline-none"
                        aria-label="Search"
                    >
                        <Search size={18} className="text-muted-foreground" />
                    </button>*/}

                    {/* CTA Button - Accent color for primary action */}
                    <Link
                        href="/demo-class"
                        className="rounded-full bg-accent text-accent-foreground px-5 py-2 text-sm font-medium shadow hover:bg-accent/90 transition-colors duration-200"
                    >
                        Demo class
                    </Link>
                </div>

                {/* Mobile Actions */}
                <div className="flex md:hidden items-center space-x-2">
                    {/* Mobile Search */}
                    <button
                        className="p-2 rounded-full hover:bg-secondary transition-colors duration-200 focus:outline-none"
                        aria-label="Search"
                    >
                        <Search size={18} className="text-muted-foreground" />
                    </button>

                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 rounded-full hover:bg-secondary transition-colors duration-200 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <X size={20} className="text-foreground" />
                        ) : (
                            <Menu size={20} className="text-foreground" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Using secondary background */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-secondary shadow-lg">
                    <div className="px-4 py-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block py-3 px-2 text-secondary-foreground hover:text-accent rounded-md transition-all duration-200 font-medium hover:bg-background"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Mobile CTA Button - Accent for primary action */}
                        <div className="pt-4 border-t border-border">
                            <Link
                                href="/demo-class"
                                className="block w-full text-center rounded-full bg-accent text-accent-foreground px-5 py-3 text-sm font-medium shadow-md hover:bg-accent/90 transition-colors duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Demo class
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
