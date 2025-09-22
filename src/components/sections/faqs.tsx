import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { AnimatedHeading } from "../animated-heading";
import { Faq } from "@/schemas";

interface FAQsProps {
    items: Faq[]
}

export const FAQs = ({ items }: FAQsProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-12 sm:py-14 md:py-16 space-y-6 sm:space-y-8 max-w-3xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
            <AnimatedHeading text="Frequently Asked Questions" />
            <Separator className="max-w-xs sm:max-w-sm" />
            <Accordion
                type="single"
                collapsible
                className="w-full max-w-3xl space-y-3 sm:space-y-4"
                defaultValue="item-1"
            >
                {items.map((item, index) => (
                    <Card className="p-0 bg-secondary/40 rounded-md focus-within:ring-2 focus-within:ring-accent/50 transition-shadow" key={index}>
                        <CardContent className="p-0">
                            <AccordionItem
                                key={index}
                                value={`item-${index + 1}`}
                            >
                                <AccordionTrigger className="text-sm sm:text-base px-4 sm:px-5">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-3 sm:gap-4 text-balance text-xs sm:text-sm px-4 sm:px-5 pb-4">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </CardContent>
                    </Card>
                ))}
            </Accordion>
            {items.length > 4 && (
                <Link
                    href={"/faqs"}
                    className="bg-accent text-accent-foreground px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-medium shadow hover:bg-accent/90 transition-colors text-sm sm:text-base"
                >
                    More FAQs
                </Link>
            )}
        </div>
    );
};
