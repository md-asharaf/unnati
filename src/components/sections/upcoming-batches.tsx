import React from "react";
import { Course } from "@/schemas";
import Link from "next/link";
import { AnimatedHeading } from "../animated-heading";

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
            <p className="text-muted-foreground text-center mt-4 mb-8 md:text-lg">
                Join our upcoming batches and kickstart your career with expert-led training.
            </p>
            <div className="flex flex-col md:flex-row gap-8 md:w-3/4">
                {/* Table */}
                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                            <tr className="bg-primary text-primary-foreground">
                                <th className="px-4 rounded-tl-lg font-bold">Course</th>
                                <th className="px-4 font-bold">Date</th>
                                <th className="px-4 font-bold">Timings</th>
                                <th className="px-4 rounded-tr-lg font-bold">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockBatches.map((batch, idx) => (
                                <tr key={idx} className="bg-background text-foreground border-b border-border">
                                    <td className="py-2 px-4">{batch.course.title}</td>
                                    <td className="py-2 px-4">{batch.date}</td>
                                    <td className="py-2 px-4">{batch.timings}</td>
                                    <td className="py-2 px-4">
                                        <Link href={`/courses/${batch.course.id}`} className="text-accent underline underline-offset-2">Details</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Sidebar */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="bg-foreground text-background rounded-xl p-8 flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-bold mb-2 text-center">Need Help Choosing?</h3>
                        <p className="mb-2 text-center">Our education counselors can help you select the best training mode based on your requirements</p>
                    </div>
                    <div className="bg-foreground text-background rounded-xl p-8 flex flex-col items-center justify-center">
                        <p className="mb-4 text-center">We offer flexible batch timings and can arrange special batches based on demand.</p>
                        <Link href="/demo-class" className="bg-accent text-accent-foreground px-6 py-3 rounded font-semibold shadow hover:bg-accent/90 transition-colors">Book Free Demo Class</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
