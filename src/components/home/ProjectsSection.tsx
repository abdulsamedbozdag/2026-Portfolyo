"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "All" | "UI/UX Design" | "3D & Motion" | "Brand & Graphic";

interface Project {
    id: string;
    title: string;
    categories: Category[];
    image: string;
    link: string;
}

const projects: Project[] = [
    {
        id: "car2gather",
        title: "car2gather",
        categories: ["UI/UX Design"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
        link: "/projects/car2gather",
    },
    {
        id: "boody-ai",
        title: "Boody AI",
        categories: ["UI/UX Design"],
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1974",
        link: "/projects/boody-ai",
    },
    {
        id: "prometeon",
        title: "Prometeon",
        categories: ["3D & Motion", "Brand & Graphic"],
        image: "/prometeon/Logo/Prometeon_Slogan_Darkblue_NoBox_PNG-01.png",
        link: "/projects/prometeon",
    },
    {
        id: "tedx",
        title: "TEDx",
        categories: ["Brand & Graphic"],
        image: "/tedx/Behance-KAPAK.jpg",
        link: "/projects/tedx",
    },
    {
        id: "uni4society",
        title: "Uni4Society",
        categories: ["Brand & Graphic"],
        image: "/Uni4Society/Sticker/İçerikler/Behance-KAPAK copy.jpg",
        link: "/projects/uni4society",
    },
];

const categories: Category[] = ["All", "UI/UX Design", "3D & Motion", "Brand & Graphic"];

export default function ProjectsSection() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");

    const filteredProjects = projects.filter(project =>
        activeCategory === "All" || project.categories.includes(activeCategory)
    );

    return (
        <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
            {/* Filter Menu */}
            <div className="flex justify-center mb-16 sticky top-24 z-40">
                <nav className="bg-neutral-900/50 backdrop-blur-xl border border-white/5 p-1.5 rounded-full flex gap-1 shadow-2xl overflow-x-auto no-scrollbar max-w-full">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                                activeCategory === cat ? "text-white" : "text-white/40 hover:text-white/60"
                            )}
                        >
                            {activeCategory === cat && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-white/10 rounded-full shadow-[inset_0_0_12px_rgba(255,255,255,0.05)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{cat}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="group"
                        >
                            <Link href={project.link}>
                                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 group-hover:border-white/10 transition-colors shadow-2xl">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                                        <div>
                                            <div className="flex gap-2 mb-3">
                                                {project.categories.map(c => (
                                                    <span key={c} className="text-[10px] uppercase tracking-widest font-mono text-white/40 bg-white/5 px-2 py-1 rounded">
                                                        {c}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-3xl font-bold text-white tracking-tight">{project.title}</h3>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                            <ArrowUpRight size={24} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
