import Image from "next/image";
import { PremiumPartners } from "./components/layout/sections/premium-partners";
import { Hero } from "./components/layout/sections/hero";
import { FAQs } from "./components/layout/sections/faqs";

export default function Home() {
    const faqs = [
        {
            question: "What is the refund policy?",
            answer: "We offer a 30-day money-back guarantee on all courses. If you're not satisfied with your purchase, you can request a refund within 30 days of purchase.",
        },
        {
            question: "How do I access the course materials?",
            answer: "Once you've purchased a course, you'll receive an email with a link to access the course materials. You can access the materials from any device with an internet connection.",
        },
        {
            question: "Can I cancel my subscription?",
            answer: "Yes, you can cancel your subscription at any time by logging into your account and selecting the 'Cancel Subscription' option.",
        },
    ];
    const partners = [
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/c/c7/Nvidia_logo.svg",
    ];
    return (
        <div className="text-primary">
            <Hero
                welcomeText="Welcome to Our Platform"
                introParagraph="Discover amazing courses and transform your career with expert-led training programs."
                imageUrl="https://t4.ftcdn.net/jpg/06/00/71/39/360_F_600713911_ItK5Nj9WqBjJkRUVTLmmlhML6is9eaLg.jpg"
            />
            <PremiumPartners partners={partners} />
            <FAQs items={faqs} />
        </div>
    );
}
