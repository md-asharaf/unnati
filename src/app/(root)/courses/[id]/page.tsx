import { Course } from "@/schemas";
import { notFound } from "next/navigation";

// Mock fetch function for demonstration
async function fetchCourseById(id: string): Promise<Course | null> {
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
    return mockCourses.find((c) => c.id === id) || null;
}


export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const course = await fetchCourseById(id);
    if (!course) {
        notFound();
    }
    return (
        <section className="w-full py-16 px-4 flex flex-col items-center bg-background">
            <div className="max-w-2xl w-full bg-background rounded-xl shadow p-8">
                <h1 className="text-3xl font-bold text-primary mb-2">{course.title}</h1>
                <h2 className="text-xl text-muted-foreground mb-4">{course.subtitle}</h2>
                <p className="mb-6 text-foreground">{course.description}</p>
                <div className="mb-4">
                    <span className="font-semibold text-primary">Duration:</span> {course.duration}
                </div>
                <div className="mb-4">
                    <span className="font-semibold text-primary">Languages:</span> {course.language.join(", ")}
                </div>
                <div className="mb-4">
                    <span className="font-semibold text-primary">Mode:</span> {course.mode.join(", ")}
                </div>
                <div className="mt-8">
                    <button className="bg-accent text-accent-foreground px-6 py-3 rounded font-semibold shadow hover:bg-accent/90 transition-colors">
                        Book Demo Class
                    </button>
                </div>
            </div>
        </section>
    );
}
