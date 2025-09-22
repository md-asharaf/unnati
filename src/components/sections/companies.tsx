import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Company } from "@/schemas";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { AnimatedHeading } from "../animated-heading";

interface CompaniesProps {
  companies: Company[];
}

export const Companies = ({ companies }: CompaniesProps) => {
  return (
    <section className="w-full py-12 sm:py-14 md:py-16 space-y-8 px-4 sm:px-6 md:px-8 flex flex-col items-center bg-background">
      <AnimatedHeading text='Our Students Works At' />
      <div className="w-full max-w-6xl relative">
        <Carousel opts={{ align: "center", loop: true }} className="mx-auto">
          <CarouselContent>
            {companies.map((company) => (
              <CarouselItem
                key={company.id}
                className="basis-1/2 xs:basis-1/3 md:basis-1/4 xl:basis-1/5 flex justify-center p-2"
              >
                <Card
                  key={company.id}
                  className="flex items-center justify-center hover:border-accent/60 bg-secondary/30 rounded-xl shadow-sm hover:shadow-md transition-all min-h-[110px] sm:min-h-[130px] md:min-h-[150px] w-full overflow-hidden"
                >
                  <CardContent className="flex items-center justify-center h-full w-full p-2 sm:p-3 overflow-hidden">
                    <img
                      src={company.logo?.url || "/placeholder.svg"}
                      alt={company.name}
                      className="object-contain h-full w-full scale-95"
                      loading="lazy"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:flex">
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
