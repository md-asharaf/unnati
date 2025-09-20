import React from "react";
import { Course } from "@/schemas";

// Example mock data for demonstration
const mockCourses: Course[] = [
    {
        id: "1",
        title: "Ongoing RHCSA (linux) batch",
        subtitle: "Linux Admin",
        description: "RHCSA course",
        duration: "2 months",
        language: ["English"],
        mode: ["Offline"],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        title: "Ongoing AWS (cloud) batch",
        subtitle: "AWS Cloud",
        description: "AWS course",
        duration: "2 months",
        language: ["English"],
        mode: ["Online"],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    // ...add more mock courses as needed
];

export default function CoursesPage() {
    return (
        <section className="w-full py-16 px-4 flex flex-col items-center bg-background">
            <h1 className="text-3xl font-bold text-primary mb-8">All Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {mockCourses.map((course) => (
                    <div key={course.id} className="bg-background rounded-xl shadow p-6 flex flex-col justify-between border border-accent/30">
                        <div>
                            <h2 className="text-xl font-bold text-foreground mb-2">{course.title}</h2>
                            <h3 className="text-lg text-muted-foreground mb-2">{course.subtitle}</h3>
                            <p className="mb-4 text-foreground">{course.description}</p>
                            <div className="mb-2">
                                <span className="font-semibold text-primary">Duration:</span> {course.duration}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-primary">Languages:</span> {course.language.join(", ")}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold text-primary">Mode:</span> {course.mode.join(", ")}
                            </div>
                        </div>
                        <a
                            href={`/courses/${course.id}?course=${encodeURIComponent(JSON.stringify(course))}`}
                            className="mt-6 bg-accent text-accent-foreground px-6 py-3 rounded font-semibold shadow hover:bg-accent/90 transition-colors text-center"
                        >
                            View Details
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
