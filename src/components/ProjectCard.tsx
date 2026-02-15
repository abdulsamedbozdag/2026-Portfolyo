"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface ProjectCardProps {
    title: string;
    category: string;
    className?: string;
    delay?: number;
    tags?: string[];
    image?: string;
    video?: string;
    href?: string;
    children?: ReactNode;
    hint?: string;
}

export function ProjectCard({
    title,
    category,
    className,
    delay = 0,
    tags,
    image,
    video,
    href = "#",
    children,
    hint,
}: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);
    const isExternal = href.startsWith("http");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "group relative overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-all duration-500 min-h-[400px] flex flex-col",
                className
            )}
        >
            {/* Clickable Overlay Link */}
            <Link
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="absolute inset-0 z-30 block focus:outline-none focus:ring-2 focus:ring-neutral-400 rounded-3xl"
                aria-label={`Proje detayları: ${title}`}
            >
                <span className="sr-only">{title}</span>
            </Link>

            {/* Background Media */}
            <div className={cn("absolute inset-0 z-0 bg-neutral-200 dark:bg-neutral-800", children ? "" : "pointer-events-none")}>
                {children ? (
                    /* Custom content (e.g. 3D scene) */
                    <div className="w-full h-full">{children}</div>
                ) : (
                    <>
                        {video ? (
                            <motion.video
                                src={video}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ) : null}

                        {/* Main Image or Fallback */}
                        {image && !imageError ? (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className={cn(
                                    "object-contain transition-transform duration-700 ease-out",
                                    isHovered ? "scale-105" : "scale-100"
                                )}
                                onError={() => setImageError(true)}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={true}
                            />
                        ) : (
                            // Fallback for missing/error images
                            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                                <span className="text-neutral-400 font-medium">Görsel Yüklenmedi</span>
                            </div>
                        )}
                    </>
                )}

                {/* Subtler Overlay Gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-20 mt-auto p-8 text-white w-full pointer-events-none">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium uppercase tracking-wider text-neutral-300">
                                {category}
                            </span>
                            <div className="h-[1px] w-4 bg-neutral-500"></div>
                        </div>
                        <h3 className="text-3xl font-bold mb-3 group-hover:translate-x-1 transition-transform duration-300">
                            {title}
                        </h3>

                        {tags && (
                            <div className="flex flex-wrap gap-2 mt-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                                {tags.map((tag) => (
                                    <span key={tag} className="text-xs px-2 py-1 rounded bg-white/10 backdrop-blur-sm border border-white/10 text-neutral-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Optional hint badge */}
            {hint && (
                <div className="absolute bottom-6 right-6 z-20 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium text-neutral-300 border border-white/10 pointer-events-none">
                    {hint}
                </div>
            )}
        </motion.div>
    );
}
