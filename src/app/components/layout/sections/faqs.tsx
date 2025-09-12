import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface FAQsProps {
    items: {
        question: string;
        answer: string;
    }[];
}

export const FAQs = ({ items }: FAQsProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center space-y-8 max-w-3xl mx-auto p-8 md:p-16 lg:p-20">
            <h1 className="text-3xl font-semibold">
                Frequently Asked Questions
            </h1>
            <Separator />
            <Accordion
                type="single"
                collapsible
                className="w-full max-w-3xl space-y-4"
                defaultValue="item-1"
            >
                {items.map((item, index) => (
                    <Card className="p-0 bg-secondary/40 rounded">
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
        </div>
    );
};
