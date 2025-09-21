import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

interface HeroProps {
    welcomeText?: string;
    introParagraph?: string;
    imageUrl?: string;
}

const stats = [
    { label: "Success Rate", value: "98%" },
    { label: "Students Trained", value: "10,000+" },
    { label: "Placements", value: "2,500+" },
    { label: "Courses", value: "20+" },
];

export const Hero = ({ welcomeText, introParagraph }: HeroProps) => {
    return (
        <section className="w-full min-h-[75vh] sm:min-h-[80vh] lg:min-h-screen flex flex-col items-center justify-center transition-all duration-1000 bg-[url('/hero.png')] bg-no-repeat bg-top bg-cover md:bg-contain px-4">
            <div className="flex flex-col items-center justify-center text-center py-16 sm:py-20 lg:py-24 max-w-6xl mx-auto">
                <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                    {welcomeText}
                    {introParagraph && (
                        <span className="block mt-3 text-base sm:text-lg lg:text-xl font-normal text-muted-foreground tracking-normal">
                            {introParagraph}
                        </span>
                    )}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8 mt-3 sm:mt-4 text-sm sm:text-base">
                    <FeatureBadge label="Redhat Courses" />
                    <FeatureBadge label="AWS Courses" />
                    <FeatureBadge label="Cyber Security Courses" />
                    <FeatureBadge label="DevOps Courses" />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 w-full max-w-md">
                    <Button variant="secondary" className="w-full sm:w-auto px-8 py-3 rounded-full font-semibold shadow hover:bg-accent hover:text-accent-foreground transition-colors text-sm sm:text-base">
                        Get a Quote
                    </Button>
                    <Button variant="ghost" asChild className="w-full sm:w-auto font-semibold text-primary text-base sm:text-lg px-8 py-3">
                        <Link href="#register">Register Now &rarr;</Link>
                    </Button>
                </div>
                {/* Key Statistics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap items-stretch justify-center gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 lg:mt-10 w-full">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="rounded-xl shadow border border-accent/60 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
                            <CardContent className="flex flex-col items-center justify-center px-4 py-4 sm:px-6 sm:py-6 min-w-[128px]">
                                <span className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{stat.value}</span>
                                <span className="text-xs sm:text-sm text-muted-foreground font-medium text-center">{stat.label}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeatureBadge = ({ label }: { label: string }) => (
    <span className="flex items-center gap-1.5 sm:gap-2 font-medium bg-background/70 backdrop-blur px-3 py-1.5 rounded-full text-[11px] sm:text-xs md:text-sm border border-border/50 shadow-sm">
        <span className="text-secondary">&#10003;</span>{label}
    </span>
);
