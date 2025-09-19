import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper, Handshake, Image as ImageIcon, HelpCircle } from "lucide-react";
export default function DashboardPage() {
    return (
        <div className="min-h-screen p-8 bg-background">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 text-primary">
                    Welcome to Unnati Admin Dashboard
                </h1>
                <p className="text-muted-foreground mb-8 text-lg">
                    Manage your content, partners, and more from one place.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <Card>
                        <CardHeader className="flex flex-col items-center">
                            <div className="bg-primary/10 rounded-lg p-3 mb-2">
                                <Newspaper className="w-8 h-8 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">Blogs</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground">
                            Create and manage blog posts
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-col items-center">
                            <div className="bg-accent/10 rounded-lg p-3 mb-2">
                                <Handshake className="w-8 h-8 text-accent" />
                            </div>
                            <CardTitle className="text-2xl">Partners</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground">
                            Showcase premium partners
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-col items-center">
                            <div className="bg-secondary/10 rounded-lg p-3 mb-2">
                                <ImageIcon className="w-8 h-8 text-secondary" />
                            </div>
                            <CardTitle className="text-2xl">Images</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground">
                            Manage gallery images
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-col items-center">
                            <div className="bg-muted/10 rounded-lg p-3 mb-2">
                                <HelpCircle className="w-8 h-8 text-foreground" />
                            </div>
                            <CardTitle className="text-2xl">FAQs</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground">
                            Manage frequently asked questions
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/70">
                        <Link href="/dashboard/blogs" className="flex items-center gap-2">
                            <Newspaper className="w-5 h-5" /> Go to Blogs
                        </Link>
                    </Button>
                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/70">
                        <Link href="/dashboard/partners" className="flex items-center gap-2">
                            <Handshake className="w-5 h-5" /> Go to Partners
                        </Link>
                    </Button>
                    <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/70">
                        <Link href="/dashboard/images" className="flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" /> Go to Images
                        </Link>
                    </Button>
                    <Button asChild size="lg" className="bg-muted text-foreground hover:bg-muted/70">
                        <Link href="/dashboard/faqs" className="flex items-center gap-2">
                            <HelpCircle className="w-5 h-5" /> Go to FAQs
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}