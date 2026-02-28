"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { StickyBackButton } from "@/components/StickyBackButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Download, GraduationCap, Briefcase, Heart, Award } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    const { t, language } = useLanguage();
    const cv = t("cv");
    const about = t("about");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-inter pb-20">
            <StickyBackButton />
            <ThemeToggle />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-center gap-12"
                >
                    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-primary/10 transition-transform duration-500 hover:scale-[1.02] bg-foreground/5">
                        <Image
                            src="/AbdulSamedBozdag.jpg"
                            alt="Abdul Samed Bozdağ"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <motion.h1
                            className="text-5xl md:text-7xl font-black tracking-tighter mb-4"
                        >
                            {about.title}
                        </motion.h1>
                        <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl leading-relaxed">
                            {about.bio}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                            <button className="group flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-bold transition-all hover:scale-105 active:scale-95">
                                <Download size={18} />
                                {about.downloadCV}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </section>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left Column: Experience & Education */}
                <div className="lg:col-span-8 space-y-20">

                    {/* Experience */}
                    <section>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-foreground/5 rounded-xl text-primary">
                                <Briefcase size={24} />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight uppercase">{about.experience}</h2>
                        </div>

                        <div className="space-y-12 relative before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[2px] before:bg-foreground/5">
                            {cv.experience.map((exp: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={itemVariants}
                                    className="relative pl-16"
                                >
                                    <div className="absolute left-0 top-1 w-12 h-12 rounded-full bg-background border-2 border-foreground/10 flex items-center justify-center z-10">
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-4">
                                            {exp.logo && (
                                                <div className="relative w-12 h-12 rounded-xl border border-foreground/5 bg-white overflow-hidden p-1 flex-shrink-0">
                                                    <Image
                                                        src={exp.logo}
                                                        alt={exp.company}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="text-2xl font-bold">{exp.company}</h3>
                                                <p className="text-primary font-medium">{exp.role}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-mono opacity-60 bg-foreground/5 px-3 py-1 rounded-full w-fit">
                                            {exp.date}
                                        </span>
                                    </div>
                                    <ul className="space-y-3">
                                        {exp.points.map((point: string, j: number) => (
                                            <li key={j} className="text-muted-foreground flex items-start gap-3">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/30 shrink-0" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-foreground/5 rounded-xl text-primary">
                                <GraduationCap size={24} />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight uppercase">{about.education}</h2>
                        </div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={itemVariants}
                            className="p-8 rounded-3xl bg-foreground/[0.02] border border-foreground/5"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                <div className="flex items-center gap-4">
                                    {cv.education.logo && (
                                        <div className="relative w-12 h-12 rounded-xl border border-foreground/5 bg-white overflow-hidden p-1 flex-shrink-0">
                                            <Image
                                                src={cv.education.logo}
                                                alt={cv.education.school}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-2xl font-bold">{cv.education.school}</h3>
                                        <p className="text-primary font-medium">{cv.education.degree}</p>
                                    </div>
                                </div>
                                <span className="text-sm font-mono opacity-60">{cv.education.date}</span>
                            </div>
                            <p className="text-muted-foreground italic">
                                <span className="font-bold not-italic mr-2">Odak:</span>
                                {cv.education.focus}
                            </p>
                        </motion.div>
                    </section>

                    {/* Volunteer */}
                    <section>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-foreground/5 rounded-xl text-primary">
                                <Heart size={24} />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight uppercase">{about.volunteer}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {cv.volunteer.map((vol: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={itemVariants}
                                    className="p-6 rounded-2xl bg-foreground/[0.02] border border-foreground/5 hover:border-primary/20 transition-colors"
                                >
                                    <h4 className="font-bold text-lg leading-tight mb-1">{vol.org}</h4>
                                    <p className="text-sm text-primary mb-2">{vol.role}</p>
                                    <p className="text-xs opacity-60 font-mono">{vol.date}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Skills & Info */}
                <div className="lg:col-span-4 space-y-12">
                    {/* Skills */}
                    <section className="sticky top-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-foreground/5 rounded-xl text-primary">
                                <Award size={24} />
                            </div>
                            <h2 className="text-2xl font-black tracking-tight uppercase">{about.skills}</h2>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {cv.skills.map((skill: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="px-4 py-2 rounded-xl bg-foreground/[0.03] border border-foreground/5 text-[10px] font-bold text-muted uppercase tracking-[0.2em] transition-all hover:bg-foreground/5 hover:border-primary/20"
                                >
                                    {skill.name}
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 pt-8 border-t border-foreground/5">
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-60">{about.references}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {about.referencesNote}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
