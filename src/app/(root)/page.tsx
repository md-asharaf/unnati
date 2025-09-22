import { Blogs } from "@/components/sections/blogs";
import { FAQs } from "@/components/sections/faqs";
import { Hero } from "@/components/sections/hero";
import { PremiumPartners } from "@/components/sections/premium-partners";
import { fetchCompanies } from "@/queries/companies";
import { fetchBlogs } from "@/queries/blogs";
import { fetchFaqs } from "@/queries/faqs";
import { Placements } from "@/components/sections/placements";
import { fetchPlacements } from "@/queries/placements";
import { fetchSettings } from "@/queries/settings";
import { fetchImages } from "@/queries/images";
import { Companies } from "@/components/sections/companies";
import { UpcomingBatches } from "@/components/sections/upcoming-batches";
import { TrainingModes } from "@/components/sections/training-modes";
import { WhyChooseITESection } from "@/components/sections/why-choose-ite-section";
import { fetchTestimonials } from "@/queries/testimonials";
import { Testimonials } from "@/components/sections/testimonials";

export default async function Home() {
    const [{images}, {setting}, {companies:partners}, {companies}, {placements}, {testimonials}, {faqs}, {blogs}] = await Promise.all([
        fetchImages("HERO"),
        fetchSettings(),
        fetchCompanies(1, 10, true),
        fetchCompanies(1, 10),
        fetchPlacements(1, 6),
        fetchTestimonials(1, 6),
        fetchFaqs(undefined, 1, 5),
        fetchBlogs(1, 3),
    ]);
    const { welcomeText, introParagraph } = setting || {};
    return (
        <div>
            <Hero
                welcomeText={welcomeText}
                introParagraph={introParagraph}
                imageUrl={images[0]?.url}
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
