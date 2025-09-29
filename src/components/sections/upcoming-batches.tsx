import { Course } from "@/schemas";
import { AnimatedHeading } from "../animated-heading";
import { Link } from "next-view-transitions";

interface Batch {
    course: Course;
    date: string;
    timings: string;
}

const mockBatches: Batch[] = [
    {
        course: { id: "1", title: "Ongoing RHCSA (linux) batch", subtitle: "Linux Admin", description: "RHCSA course", duration: "2 months", language: ["English"], mode: ["Offline"], createdAt: new Date(), updatedAt: new Date() }, date: "20-July-25", timings: "7pm to 8pm"
    },
    {
        course: { id: "2", title: "Ongoing AWS (cloud) batch", subtitle: "AWS Cloud", description: "AWS course", duration: "2 months", language: ["English"], mode: ["Online"], createdAt: new Date(), updatedAt: new Date() }, date: "04-Aug-25", timings: "6pm to 7pm"
    },
    {
        course: { id: "3", title: "Ongoing RHCSA (linux)", subtitle: "Linux Admin", description: "RHCSA course", duration: "2 months", language: ["English"], mode: ["Offline"], createdAt: new Date(), updatedAt: new Date() }, date: "18-Aug-25", timings: "5pm to 6pm"
    },
    {
        course: { id: "4", title: "Ongoing Cyber security", subtitle: "Cyber Security", description: "Cyber security course", duration: "2 months", language: ["English"], mode: ["Online"], createdAt: new Date(), updatedAt: new Date() }, date: "05-May-25", timings: "7pm to 8pm"
    },
    {
        course: { id: "5", title: "Upcoming kubernetes batch", subtitle: "Kubernetes", description: "Kubernetes course", duration: "2 months", language: ["English"], mode: ["Online"], createdAt: new Date(), updatedAt: new Date() }, date: "15-Sep-25", timings: "5pm to 6pm"
    },
    {
        course: { id: "6", title: "Upcoming AWS batch", subtitle: "AWS Cloud", description: "AWS course", duration: "2 months", language: ["English"], mode: ["Online"], createdAt: new Date(), updatedAt: new Date() }, date: "06-Oct-25", timings: "6pm to 7pm"
    },
    {
        course: { id: "7", title: "Upcoming RHCSA (linux)", subtitle: "Linux Admin", description: "RHCSA course", duration: "2 months", language: ["English"], mode: ["Offline"], createdAt: new Date(), updatedAt: new Date() }, date: "25-Sep-25", timings: "5pm to 6pm"
    }
];

    export const UpcomingBatches = () => {
        return (
            <section className="w-full py-16 px-4 flex flex-col items-center bg-background">
                <AnimatedHeading text="Latest Upcoming Batches" />
                <p className="text-muted-foreground text-center mt-4 mb-8 md:text-lg max-w-3xl">
                    Join our upcoming batches and kickstart your career with expert-led training.
                </p>
                <div className="flex flex-col xl:flex-row gap-8 w-full max-w-7xl">
                    {/* Table */}
                    <div className="flex-[1.4] overflow-x-auto rounded-lg border border-border/50 bg-background/40 backdrop-blur">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-primary text-primary-foreground text-sm md:text-base">
                                    <th className="px-4 py-3 rounded-tl-lg font-bold whitespace-nowrap w-[45%] md:w-[50%]">Course</th>
                                    <th className="px-4 py-3 font-bold whitespace-nowrap">Date</th>
                                    <th className="px-4 py-3 font-bold whitespace-nowrap">Timings</th>
                                    <th className="px-4 py-3 rounded-tr-lg font-bold whitespace-nowrap">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockBatches.map((batch, idx) => (
                                    <tr key={idx} className="bg-background text-foreground border-b border-border/60 text-xs md:text-sm lg:text-base">
                                        <td className="py-2 px-4 font-medium pr-6">{batch.course.title}</td>
                                        <td className="py-2 px-4 whitespace-nowrap">{batch.date}</td>
                                        <td className="py-2 px-4 whitespace-nowrap">{batch.timings}</td>
                                        <td className="py-2 px-4">
                                            <Link href={`/courses/${batch.course.id}`} className="text-accent underline underline-offset-2 text-sm md:text-base">Details</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Sidebar */}
                    <div className="flex-[0.9] flex flex-col gap-6 min-w-[280px]">
                        <div className="bg-foreground text-background rounded-xl p-6 lg:p-8 flex flex-col items-center justify-center h-full">
                            <h3 className="text-xl lg:text-2xl font-bold mb-2 text-center">Need Help Choosing?</h3>
                            <p className="mb-2 text-center text-sm lg:text-base">Our education counselors can help you select the best training mode based on your requirements</p>
                        </div>
                        <div className="bg-foreground text-background rounded-xl p-6 lg:p-8 flex flex-col items-center justify-center h-full">
                            <p className="mb-4 text-center text-sm lg:text-base">We offer flexible batch timings and can arrange special batches based on demand.</p>
                            <Link href="/demo-class" className="bg-accent text-accent-foreground px-5 lg:px-6 py-2.5 lg:py-3 rounded font-semibold shadow hover:bg-accent/90 transition-colors text-sm lg:text-base">Book Free Demo Class</Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    };
