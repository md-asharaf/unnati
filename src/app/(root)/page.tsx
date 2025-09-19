import React from "react";
import { Blogs } from "@/components/sections/blogs";
import { FAQs } from "@/components/sections/faqs";
import { Hero } from "@/components/sections/hero";
import { PremiumPartners } from "@/components/sections/premium-partners";
import { fetchPartners } from "@/queries/partners";
import { fetchBlogs } from "@/queries/blogs";
import { fetchFaqs } from "@/queries/faqs";

export default async function Home() {
    const [blogs, faqs, partners] = await Promise.all([
        fetchBlogs(1, 3),
        fetchFaqs(undefined, 1, 5),
        fetchPartners(1, 10),
    ]);
    return (
        <div className="text-primary">
            <Hero
                welcomeText="Welcome to Our Platform"
                introParagraph="Discover amazing courses and transform your career with expert-led training programs."
                imageUrl="https://t4.ftcdn.net/jpg/06/00/71/39/360_F_600713911_ItK5Nj9WqBjJkRUVTLmmlhML6is9eaLg.jpg"
            />
            <PremiumPartners partners={partners.data.images} />
            <FAQs items={faqs.data.faqs} />
            <Blogs blogs={blogs.data.blogs} />
        </div>
    );
}
