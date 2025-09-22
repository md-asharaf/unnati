import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Faq } from "@/schemas";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

export default async function FaqsPage() {
  const faqs = await db.faq.findMany({
    include: {
      topic: true
    }
  })
  const grouped = faqs.reduce((acc: Record<string, Faq[]>, faq: Faq) => {
    const topic = faq.topic?.name;
    if (!acc[topic]) acc[topic] = [];
    acc[topic].push(faq);
    return acc;
  }, {});

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 text-center">
      <div className="text-2xl font-bold mb-4"> Frequently Asked Questions </div>
      <p className="text-center text-sm text-muted-foreground mb-10">
        Find answers to common questions about our courses, enrollment, and more.
      </p>
      {Object.entries(grouped).map(([topic, faqsArr]) => (
        <div key={topic} className="mb-10">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-2xl font-semibold text-center mt-2 mb-2">{topic}</h1>
            <span className="block w-24 h-2 mx-auto mt-[-10px] mb-4 rounded-full" />
          </div>
          <Accordion type="multiple" className="border rounded-md bg-background">
            {(faqsArr as Faq[]).map((faq: Faq, idx: number) => (
              <AccordionItem key={faq.id} value={faq.id} className="bg-muted/40">
                <AccordionTrigger className="text-base font-bold px-4 py-4 flex items-center gap-2">
                  <span className="font-bold">Q{idx + 1}. {faq.question}</span>
                </AccordionTrigger>
                <Separator />
                <AccordionContent className="bg-primary">
                  <div className="px-4 text-start text-muted-foreground text-sm pt-4">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </main>
  );
}
