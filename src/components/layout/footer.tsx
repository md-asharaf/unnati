import Image from "next/image";
import { Instagram, Phone, Globe } from "lucide-react";
import Link from "next/link";

interface FooterProps {
    logoUrl: string;
}

export const Footer = ({ logoUrl }: FooterProps) => {
    return (
        <div className="bg-primary text-primary-foreground">
            <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 gap-10 md:grid-cols-4">
                {/* Logo + Tagline */}
                <div className="flex sm:flex-col space-x-4 sm:space-y-4">
                    <Image
                        src={logoUrl}
                        alt="Logo"
                        width={140}
                        height={60}
                        className="object-contain"
                    />
                    <p className="text-sm max-w-xs leading-relaxed text-primary-foreground/80">
                        Empowering students with knowledge and skills for a
                        brighter tomorrow.
                    </p>
                </div>

                {/* Course List 1 */}
                <div>
                    <h3 className="text-primary-foreground font-semibold mb-4 text-lg">
                        Course List One
                    </h3>
                    <ul className="space-y-2 text-sm">
                        {["Name 1", "Name 2", "Name 3"].map((item, i) => (
                            <li key={i}>
                                <Link
                                    href="#"
                                    className="text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Course List 2 */}
                <div>
                    <h3 className="text-primary-foreground font-semibold mb-4 text-lg">
                        Course List Two
                    </h3>
                    <ul className="space-y-2 text-sm">
                        {["Name 1", "Name 2", "Name 3"].map((item, i) => (
                            <li key={i}>
                                <Link
                                    href="#"
                                    className="text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Links */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-primary-foreground font-semibold mb-4 text-lg">
                        Connect With Us
                    </h3>
                    <Link
                        href="https://instagram.com"
                        className="flex items-center space-x-2 text-primary-foreground/70 transition-colors hover:text-accent"
                    >
                        <Instagram size={18} /> <span>Instagram</span>
                    </Link>
                    <Link
                        href="tel:+123456789"
                        className="flex items-center space-x-2 text-primary-foreground/70 transition-colors hover:text-accent"
                    >
                        <Phone size={18} /> <span>+1 234 567 89</span>
                    </Link>
                    <Link
                        href="https://example.com"
                        className="flex items-center space-x-2 text-primary-foreground/70 transition-colors hover:text-accent"
                    >
                        <Globe size={18} /> <span>Other Social</span>
                    </Link>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-primary-foreground/20">
                <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm">
                    <p className="text-primary-foreground/70">
                        © {new Date().getFullYear()} Your Company. All rights
                        reserved.
                    </p>
                    <div className="flex space-x-4 mt-2 md:mt-0">
                        <Link
                            href="/privacy"
                            className="text-primary-foreground/70 hover:text-accent transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-primary-foreground/70 hover:text-accent transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
