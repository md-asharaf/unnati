import Image from "next/image";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

interface FooterProps {
    logoUrl: string;
}

export const Footer = ({ logoUrl }: FooterProps) => {
    const listOne = ["Name 1", "Name 2", "Name 3"];
    const listTwo = ["Name 1", "Name 2", "Name 3"];
    return (
        <footer className="bg-gradient-to-r from-secondary/10 to-secondary text-foreground">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-14 grid grid-cols-1 gap-10 sm:gap-12 md:gap-8 md:grid-cols-4">
                {/* Logo + Tagline */}
                <div className="flex flex-col sm:max-w-xs">
                    <div className="flex items-center gap-3 mb-4">
                        <Image
                            src={logoUrl}
                            alt="Logo"
                            width={140}
                            height={60}
                            className="object-contain w-32 sm:w-36"
                        />
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-foreground/80">
                        Empowering students with knowledge and skills for a brighter tomorrow.
                    </p>
                </div>

                {/* Course List 1 */}
                <div className="flex flex-col">
                    <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base tracking-wide uppercase">
                        Course List One
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm">
                        {listOne.map((item, i) => (
                            <li key={i}>
                                <Link
                                    href="#"
                                    className="transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Course List 2 */}
                <div className="flex flex-col">
                    <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base tracking-wide uppercase">
                        Course List Two
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm">
                        {listTwo.map((item, i) => (
                            <li key={i}>
                                <Link
                                    href="#"
                                    className="transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Legal Links */}
                <div className="flex flex-col text-xs sm:text-sm gap-2 sm:gap-2.5 mt-2 md:mt-0">
                    <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base tracking-wide uppercase">Legal</h3>
                    <Link
                        href="/privacy"
                        className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="/terms"
                        className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
                    >
                        Terms of Service
                    </Link>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-foreground/10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs md:text-sm">
                    <p className="text-center md:text-left leading-snug">
                        © {new Date().getFullYear()} Your Company. All rights reserved.
                    </p>
                    <div className="flex items-center gap-3 sm:gap-4">
                        {[{ icon: Facebook, href: "https://facebook.com" }, { icon: Linkedin, href: "https://linkedin.com" }, { icon: Instagram, href: "https://instagram.com" }, { icon: Twitter, href: "https://x.com" }].map((s, i) => (
                            <Link
                                key={i}
                                href={s.href}
                                className="h-8 w-8 flex items-center justify-center rounded-md bg-foreground/5 hover:bg-foreground/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                                aria-label={s.href}
                            >
                                <s.icon size={16} className="text-foreground" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
