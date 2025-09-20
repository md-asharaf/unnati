"use client"
import { useEffect, useRef } from "react";
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
    const gradientRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let angle = 135;
        let direction = 1;
        const interval = setInterval(() => {
            angle += direction * 0.5;
            if (angle > 180 || angle < 90) direction *= -1;
            if (gradientRef.current) {
                gradientRef.current.style.background = `linear-gradient(${angle}deg, var(--background) 0%, var(--secondary) 100%)`;
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={gradientRef} className="w-full min-h-screen flex flex-col items-center justify-center transition-all duration-1000">
            <div className="flex flex-col items-center justify-center text-center py-24">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                    {welcomeText}<br />
                    <span className="block mt-2 text-xl">{introParagraph}</span>
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-6 mb-8 mt-4 text-lg">
                    <span className="flex items-center gap-2 font-medium">
                        <span className="text-secondary">&#10003;</span> Redhat Courses
                    </span>
                    <span className="flex items-center gap-2 font-medium">
                        <span className="text-secondary">&#10003;</span> AWS Courses
                    </span>
                    <span className="flex items-center gap-2 font-medium">
                        <span className="text-secondary">&#10003;</span> Cyber Security Courses
                    </span>
                    <span className="flex items-center gap-2 font-medium">
                        <span className="text-secondary">&#10003;</span> DevOps Courses
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                    <Button variant="secondary" className="px-8 py-3 rounded-full font-semibold shadow hover:bg-accent hover:text-accent-foreground transition-colors">
                        Get a Quote
                    </Button>
                    <Button variant="ghost" asChild className="font-semibold text-primary text-lg px-8 py-3">
                        <Link href="#register">Register Now &rarr;</Link>
                    </Button>
                </div>
                {/* Key Statistics */}
                <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="min-w-[140px] rounded-xl shadow border border-accent bg-background/80 flex flex-col items-center justify-center">
                            <CardContent className="flex flex-col items-center justify-center px-8 py-6">
                                <span className="text-3xl font-bold mb-2">{stat.value}</span>
                                <span className="text-base text-muted-foreground font-medium">{stat.label}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
