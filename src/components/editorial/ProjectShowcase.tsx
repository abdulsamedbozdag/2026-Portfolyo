"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectShowcaseProps {
    number: string;
    title: string;
    category: string;
    tags: string[];
    image: string;
    video?: string;
    href: string;
    reverse?: boolean; // If true, image is on the left
    comingSoon?: boolean;
    objectContain?: boolean; // New: To prevent cropping
    titleImage?: string; // New: For logic-based logos as titles
}

export default function ProjectShowcase({
    number,
    title,
    category,
    tags,
    image,
    video,
    href,
    reverse = false,
    comingSoon = false,
    objectContain = false,
    titleImage,
}: ProjectShowcaseProps) {
    return (
        <section className="min-h-screen flex items-center justify-center py-24 px-6 md:px-12 relative overflow-hidden bg-background text-foreground transition-colors duration-500">
            {/* Background radial glow */}
            <div
                className={`absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-[0.03] pointer-events-none 
        ${reverse ? "-left-40 top-1/4 bg-blue-500" : "-right-40 bottom-1/4 bg-violet-500"}`}
            />

            <div className={`max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${reverse ? "" : ""}`}>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`flex flex-col gap-8 ${reverse ? "lg:order-2" : "lg:order-1"}`}
                >
                    {/* Number & Category */}
                    <div className="flex items-center gap-4 text-foreground/40 transition-colors duration-500">
                        <span className="text-6xl font-black opacity-20">{number}</span>
                        <div className="h-[1px] w-12 bg-border" />
                        <span className="uppercase tracking-[0.2em] text-sm font-medium">{category}</span>
                    </div>

                    {/* Title & Description */}
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
                            {titleImage ? (
                                <div className="relative h-12 md:h-20 w-full max-w-[280px] md:max-w-[400px]">
                                    <Image
                                        src={titleImage}
                                        alt={title}
                                        fill
                                        className="object-contain object-left dark:brightness-0 dark:invert transition-all duration-500"
                                    />
                                </div>
                            ) : (
                                title
                            )}
                        </h2>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-1.5 rounded-full border border-border bg-card text-sm text-foreground/60 transition-colors duration-500"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* CTA Button */}
                        {comingSoon ? (
                            <span className="inline-flex items-center gap-3 text-foreground/30 cursor-not-allowed">
                                <span className="text-lg">Çok Yakında</span>
                            </span>
                        ) : (
                            <Link
                                href={href}
                                className="group inline-flex items-center gap-3 text-lg font-medium border-b border-border/60 pb-1 hover:border-foreground hover:text-foreground transition-all w-fit"
                            >
                                Projeyi İncele
                                <ArrowUpRight
                                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                    size={20}
                                />
                            </Link>
                        )}
                    </div>
                </motion.div>

                {/* Visual Content (Image/Video) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative aspect-[4/3] w-full group ${reverse ? "lg:order-1" : "lg:order-2"}`}
                >
                    <Link href={comingSoon ? "#" : href} className={`block w-full h-full relative overflow-hidden rounded-2xl ${comingSoon ? "cursor-default" : "cursor-pointer"}`}>
                        <div className="absolute inset-0 bg-neutral-900/50 z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                        {video ? (
                            <video
                                src={video}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className={cn(
                                    "w-full h-full transform transition-transform duration-700 group-hover:scale-105",
                                    objectContain ? "object-contain" : "object-cover"
                                )}
                            />
                        ) : (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className={cn(
                                    "transition-transform duration-700 group-hover:scale-105",
                                    objectContain ? "object-contain" : "object-cover"
                                )}
                            />
                        )}
                    </Link>

                    {/* Decorative elements around image */}
                    <div className={`absolute -z-10 w-full h-full top-6 ${reverse ? "-left-6" : "-right-6"} border border-border/30 rounded-2xl transition-colors duration-500`} />
                </motion.div>

            </div>
        </section>
    );
}
