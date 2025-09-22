import { Blogs } from "@/components/sections/blogs";
import { FAQs } from "@/components/sections/faqs";
import { Hero } from "@/components/sections/hero";
import { PremiumPartners } from "@/components/sections/premium-partners";
import { Placements } from "@/components/sections/placements";
import { Companies } from "@/components/sections/companies";
import { UpcomingBatches } from "@/components/sections/upcoming-batches";
import { TrainingModes } from "@/components/sections/training-modes";
import { WhyChooseITESection } from "@/components/sections/why-choose-ite-section";
import { Testimonials } from "@/components/sections/testimonials";
import { db } from "@/lib/db";

export default async function Home() {
    const settings = await db.setting.findFirst({
        select: {
            welcomeText: true,
            introParagraph: true
        }
    })
    const hero = await db.image.findFirst({
        where: {
            type: "HERO"
        },
        select: {
            url: true
        }
    })
    const partners = await db.company.findMany({
        where: {
            isPremium: true
        },
        include: {
            logo: true
        },
        take:5
    })
    const companies = await db.company.findMany({
        include: {
            logo: true
        },
        take:20
    })
    const placements = await db.placement.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 10,
        include: {
            company: {
                include: {
                    logo: true
                }
            }
        }
    })
    const testimonials = await db.testimonial.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 10,
        include: {
            placement: {
                include: {
                    company: {
                        include: {
                            logo: true
                        }
                    }
                }
            }
        }
    })

    const faqs = await db.faq.findMany({
        where: {
            topic: {
                name: "General"
            }
        },
        take:10,
        include:{
            topic:true
        }
    })

    const blogs = await db.blog.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 3,
        include: {
            thumbnail: true
        }
    })

    return (
        <div>
            <Hero
                welcomeText={settings?.welcomeText}
                introParagraph={settings?.introParagraph}
                imageUrl={hero?.url}
            />
            <PremiumPartners partners={partners} />
            <Companies companies={companies} />
            <Placements placements={placements} />
            <UpcomingBatches />
            <TrainingModes />
            <WhyChooseITESection />
            <Testimonials testimonials={testimonials} />
            <FAQs items={faqs} />
            <Blogs blogs={blogs} />
        </div>
    );
}
