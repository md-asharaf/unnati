
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimatedHeading } from "../animated-heading";

import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  photoUrl: string;
  content: string;
  rating: number;
  companyLogoUrl?: string;
}

const TestimonialCard = ({ name, photoUrl, content, rating, companyLogoUrl }: TestimonialCardProps) => (
  <Card className="w-full rounded-xl border shadow p-4">
    <CardContent className="p-0">
      <div className="flex items-center gap-2 mb-2">
        <img src={photoUrl || "/avatar.svg"} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-1 justify-between w-full">
            <span className="font-semibold text-sm truncate">{name || "Anonymous"}</span>
            {companyLogoUrl && (
              <img
                src={companyLogoUrl}
                alt="Company Logo"
                className="w-5 h-5 rounded bg-white border ml-2"
              />
            )}
          </div>
          <span className="text-xs text-muted-foreground">2 years ago</span>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < rating ? '#facc15' : 'none'} />
        ))}
      </div>
      <div className="text-sm text-muted-foreground mb-2">
        "{content.length > 80 ? content.slice(0, 80) + "..." : content}"
      </div>
      <Link href="#" className="text-xs text-blue-600 hover:underline">Read more</Link>
    </CardContent>
  </Card>
);

interface Testimonial {
  id: string;
  content: string;
  rating: number;
  placement: {
    name: string;
    photoUrl: string;
    company?: {
      logo?: { url: string };
    };
  };
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export const Testimonials = ({ testimonials = [] }: TestimonialsProps) => {
  const testimonialList: Testimonial[] =
    testimonials.length > 0
      ? testimonials
      : [
          {
            id: "mock1",
            rating: 5,
            content:
              "I had an exceptional experience at ITE Bhopal. The quality of coaching provided by the instructors was top-notch.",
            placement: {
              name: "chandravir.singh",
              photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
              company: {
                logo: {
                  url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                },
              },
            },
          },
          {
            id: "mock2",
            rating: 4,
            content:
              "Great learning environment and supportive staff. Highly recommend!",
            placement: {
              name: "anonymous",
              photoUrl: "https://randomuser.me/api/portraits/men/45.jpg",
              company: {
                logo: {
                  url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
                },
              },
            },
          },
          {
            id: "mock3",
            rating: 5,
            content:
              "The placement support was fantastic. I landed my dream job thanks to their guidance.",
            placement: {
              name: "priya.sharma",
              photoUrl: "https://randomuser.me/api/portraits/women/65.jpg",
              company: {
                logo: {
                  url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
                },
              },
            },
          },
          {
            id: "mock4",
            rating: 4,
            content:
              "Excellent curriculum and hands-on projects. The trainers are very knowledgeable.",
            placement: {
              name: "rahul.verma",
              photoUrl: "https://randomuser.me/api/portraits/men/23.jpg",
              company: {
                logo: {
                  url: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Meta_Platforms_Inc._logo.svg",
                },
              },
            },
          },
          {
            id: "mock5",
            rating: 5,
            content:
              "I loved the interactive sessions and the community. Highly recommend to anyone looking to upskill.",
            placement: {
              name: "sneha.patel",
              photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
              company: {
                logo: {
                  url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
                },
              },
            },
          },
        ];

  return (
    <section className="w-full py-12 px-2 md:px-0 flex flex-col items-center space-y-8 max-w-6xl mx-auto">
      <AnimatedHeading text="Reviews From Our Students" />
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {testimonialList.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="flex justify-center basis-1/3">
              <TestimonialCard
                name={testimonial.placement?.name || "Anonymous"}
                photoUrl={testimonial.placement?.photoUrl || "/avatar.svg"}
                content={testimonial.content}
                rating={testimonial.rating}
                companyLogoUrl={testimonial.placement?.company?.logo?.url}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
