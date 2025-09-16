import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
    title: string;
    subtitle: string;
    icon: LucideIcon;
};

export function PageHeader({ title, subtitle, icon: Icon }: Props) {
    return (
        <div className="space-y-2 md:space-y-3">
            <div className="flex items-start gap-3 md:gap-4">
                {Icon ? (
                    <div
                        className={cn(
                            "inline-flex items-center justify-center rounded-xl shadow-sm",
                            "size-10 md:size-12 bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20",
                        )}
                    >
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                ) : null}
                <div>
                    <h1
                        className={cn(
                            "tracking-tight leading-tight text-balance text-2xl md:text-3xl font-semibold md:font-bold",
                        )}
                    >
                        {title}
                    </h1>
                    <p className="mt-1 text-sm md:text-base text-muted-foreground text-pretty max-w-prose">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
}
