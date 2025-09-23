import { CoursesInfinite } from "@/components/courses-infinite";
import { db } from "@/lib/db";


export default async function CoursesPage() {
    const courses = await db.course.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 9
    })
    return (
        <section className="w-full bg-background bg-[url('/courses.png')] bg-top bg-cover md:bg-contain bg-no-repeat">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pb-16 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                    Premium Courses
                </h1>
                <p className="mt-3 sm:mt-4 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                    Master one technology at a time with focused, mentor‑guided learning paths.
                </p>
            </div>
            <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 pb-16 sm:pb-20">
                {courses.length > 0 ? (
                    <CoursesInfinite initialData={{
                        courses,
                        page: 1,
                        limit: 9,
                        total: courses.length,
                    }} />
                ) : (
                    <div className="text-center text-sm text-muted-foreground">No courses available</div>
                )}
            </div>
        </section>
    );
}