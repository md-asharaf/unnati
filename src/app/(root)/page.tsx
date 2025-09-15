import React, { Suspense } from "react";

function Spinner() {
    return (
        <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
        </div>
    );
}
const Blogs = React.lazy(() => import("@/components/sections/blogs").then(mod => ({ default: mod.Blogs })));
const FAQs = React.lazy(() => import("@/components/sections/faqs").then(mod => ({ default: mod.FAQs })));
const Hero = React.lazy(() => import("@/components/sections/hero").then(mod => ({ default: mod.Hero })));
const PremiumPartners = React.lazy(() => import("@/components/sections/premium-partners").then(mod => ({ default: mod.PremiumPartners })));
import {blogs} from "@/data/blogs.json"
import {faqs} from "@/data/faqs.json"
import {partners} from "@/data/partners.json"
export default function Home() {
    return (
        <div className="text-primary">
            <Suspense fallback={<Spinner />}>
                <Hero
                    welcomeText="Welcome to Our Platform"
                    introParagraph="Discover amazing courses and transform your career with expert-led training programs."
                    imageUrl="https://t4.ftcdn.net/jpg/06/00/71/39/360_F_600713911_ItK5Nj9WqBjJkRUVTLmmlhML6is9eaLg.jpg"
                />
            </Suspense>
            <Suspense fallback={<Spinner />}>
                <PremiumPartners partners={partners} />
            </Suspense>
            <Suspense fallback={<Spinner />}>
                <FAQs items={faqs} />
            </Suspense>
            <Suspense fallback={<Spinner />}>
                <Blogs blogs={blogs} />
            </Suspense>
        </div>
    );
}
