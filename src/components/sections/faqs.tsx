import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { AnimatedHeading } from "../animated-heading";

interface FAQsProps {
    items: {
        question: string;
        answer: string;
    }[];
}

export const FAQs = ({ items }: FAQsProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center space-y-8 max-w-3xl mx-auto px-8 md:px-16 lg:px-20">
            <AnimatedHeading text="Frequently Asked Questions" />
            <Separator />
            <Accordion
                type="single"
                collapsible
                className="w-full max-w-3xl space-y-4"
                defaultValue="item-1"
            >
                {items.map((item, index) => (
                    <Card className="p-0 bg-secondary/40 rounded" key={index}>
                        <CardContent>
                            <AccordionItem
                                key={index}
                                value={`item-${index + 1}`}
                            >
                                <AccordionTrigger className="text-base">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </CardContent>
                    </Card>
                ))}
            </Accordion>
            <Link
            href={"/faqs"}
                className="bg-accent text-accent-foreground px-8 py-3 rounded-sm font-medium shadow hover:bg-accent/90 transition-colors"
            >
                More FAQs
            </Link>
        </div>
    );
};
