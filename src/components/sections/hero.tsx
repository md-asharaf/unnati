import Image from "next/image";

interface HeroProps {
    welcomeText: string;
    introParagraph: string;
    imageUrl: string;
}

export const Hero = ({ welcomeText, introParagraph, imageUrl }: HeroProps) => {
    return (
        <section className="bg-secondary py-12 md:py-20 lg:py-24 min-h-screen">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-center">
                    {/* Left Side - Image */}
                    <div className="order-2 lg:order-1">
                        <div className="relative aspect-[4/3] w-full max-w-lg mx-auto lg:max-w-none">
                            <div className="bg-card shadow-xl">
                                <Image
                                    src={imageUrl}
                                    alt="Hero image"
                                    fill
                                    className="object-cover rounded-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="order-1 lg:order-2 text-center lg:text-left">
                        {/* Welcome Text */}
                        <div className="mb-8">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                                {welcomeText}
                            </h1>
                        </div>

                        {/* Intro Paragraph */}
                        <div className="max-w-2xl mx-auto lg:mx-0">
                            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                                {introParagraph}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
