import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const course = await db.course.findUnique({
        where: { id }
    });
    if (!course) {
        notFound();
    }
    return (
        <>
            <section
                className="relative w-full min-h-[70vh] md:min-h-[80vh] lg:min-h-screen flex items-start justify-center pt-24 md:pt-28 pb-14 md:pb-16 px-4 sm:px-6 md:px-10 bg-[url('/course.png')] bg-top bg-cover md:bg-contain bg-no-repeat"
            >
                <div className="max-w-7xl w-full flex flex-col gap-12 md:gap-14 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                        <div className="flex flex-col justify-start text-left max-w-xl -mt-2 md:-mt-4 lg:-mt-6 md:pl-2 lg:pl-6">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 drop-shadow-lg tracking-tight">
                                {course.title}
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-6 md:mb-8 max-w-lg">
                                {course.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center mb-3 md:mb-4">
                                <Button variant="secondary" className="font-semibold px-8 sm:px-10 py-3 rounded-md shadow-md text-sm sm:text-base transition-colors w-full sm:w-auto">
                                    Join the Program
                                </Button>
                                <a href="#" className="underline text-white/90 text-xs sm:text-sm font-medium tracking-wide">OR DOWNLOAD SYLLABUS</a>
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-start md:mt-2 lg:mt-4">
                            <div className="relative w-[300px] h-[170px] sm:w-[340px] sm:h-[190px] md:w-[430px] md:h-[240px] lg:w-[520px] lg:h-[300px] rounded-xl overflow-hidden shadow-2xl border-4 border-white/90 bg-black/60 backdrop-blur">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                    title="Course Overview"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-2 md:mt-0">
                        {[
                            { label: 'Students Enrolled', value: '4,259+', icon: '🎓' },
                            { label: 'Trustpilot Rating', value: '4.9', icon: '⭐' },
                            { label: 'Program Duration', value: course.duration, icon: '🕒' },
                            { label: 'Projects', value: '24+', icon: '🚀' },
                        ].map(stat => (
                            <div key={stat.label} className="bg-white rounded-xl shadow p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center">
                                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{stat.icon}</div>
                                <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{stat.value}</div>
                                <div className="text-[10px] sm:text-[11px] md:text-xs uppercase tracking-wide text-muted-foreground mt-1 font-medium line-clamp-2">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
