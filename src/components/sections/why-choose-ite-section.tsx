"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Replaced local placeholder images with high-quality remote images (Unsplash)
const labImages = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80"
];
const seminarImages = [
  "https://images.unsplash.com/photo-1551836022-4c4c79ecde16?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1573495628364-6b1acb260507?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503424886307-b090341d25d1?auto=format&fit=crop&w=800&q=80"
];

const features = [
  "100% Placement Assistance",
  "Industry Expert Faculty",
  "Hands-on Practical Training",
  "International Certifications",
  "Flexible Training Modes"
];

export const WhyChooseITESection = () => {

  // Auto-scroll logic for carousels using Embla API
  const [labApi, setLabApi] = useState<any>(null);
  const [seminarApi, setSeminarApi] = useState<any>(null);
  const [labIndex, setLabIndex] = useState(0);
  const [seminarIndex, setSeminarIndex] = useState(0);

  useEffect(() => {
    if (!labApi) return;
    const interval = setInterval(() => {
      labApi.scrollPrev();
    }, 5000);
    return () => clearInterval(interval);
  }, [labApi]);

  useEffect(() => {
    if (!seminarApi) return;
    const interval = setInterval(() => {
      seminarApi.scrollNext();
    }, 5100);
    return () => clearInterval(interval);
  }, [seminarApi]);

  useEffect(() => {
    if (labApi) {
      labApi.on("select", () => {
        setLabIndex(labApi.selectedScrollSnap());
      });
    }
    if (seminarApi) {
      seminarApi.on("select", () => {
        setSeminarIndex(seminarApi.selectedScrollSnap());
      });
    }
  }, [labApi, seminarApi]);

  return (
    <section className="max-w-7xl mx-auto py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start">
      {/* Left: Carousels */}
      <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">ITE Smart Lab</h2>
          <Carousel opts={{ loop: true }} setApi={setLabApi} className="relative">
            <CarouselContent>
              {labImages.map((_, i) => (
                <CarouselItem key={i} className="flex justify-center sm:basis-1/3 space-x-0">
                  <img src={labImages[labImages.length - 1 - i]} alt="ITE Smart Lab" className="w-full h-36 sm:h-40 object-cover rounded-md" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 absolute z-10 hidden lg:flex" />
            <CarouselNext className="right-2 top-1/2 -translate-y-1/2 absolute z-10 hidden lg:flex" />
          </Carousel>
          {/* Dots below carousel */}
          <div className="flex justify-center items-center mt-2 gap-2">
            {labImages.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${labIndex === i ? "bg-foreground" : "bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">ITE Seminar</h2>
          <Carousel opts={{ loop: true }} setApi={setSeminarApi} className="relative">
            <CarouselContent >
              {seminarImages.map((src, i) => (
                <CarouselItem key={i} className="flex justify-center sm:basis-1/3 space-x-0">
                  <img src={src} alt="ITE Seminar" className="w-full h-36 sm:h-40 object-cover rounded-md" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 absolute z-10 hidden lg:flex" />
            <CarouselNext className="right-2 top-1/2 -translate-y-1/2 absolute z-10 hidden lg:flex" />
          </Carousel>
          {/* Dots below carousel */}
          <div className="flex justify-center items-center mt-2 gap-2">
            {seminarImages.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${seminarIndex === i ? "bg-foreground" : "bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Right: Info */}
      <div className="flex flex-col justify-center h-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-foreground">Why Choose ITE?</h2>
        <p className="mb-6 text-xs sm:text-sm md:text-base text-muted-foreground mx-1 sm:mx-2 text-center leading-relaxed">
          Empowering future tech professionals with real-world training, globally aligned certifications, and mentorship from seasoned industry experts. Whether you’re upskilling your career, our learner-first approach and career-focused support ensure you stay ahead in the cloud and DevOps era.
        </p>
        <ul className="mb-6 sm:mb-8 space-y-2.5 sm:space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center border-b last:border-b-0 pb-2.5 sm:pb-3">
              <CheckCircle className="text-accent mr-2 shrink-0" size={18} />
              <span className="text-foreground text-sm sm:text-base">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="bg-accent text-accent-foreground w-36 sm:w-40 text-sm sm:text-base">More Details</Button>
      </div>
    </section>
  );
}
