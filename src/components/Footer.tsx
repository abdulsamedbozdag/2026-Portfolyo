"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="py-16 px-6 md:px-12 border-t border-neutral-200 dark:border-neutral-800 mt-24 bg-white dark:bg-[#050505]">
            <div className="max-w-[1400px] mx-auto">
                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h3 className="text-3xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                        Birlikte çalışalım
                    </h3>
                    <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                        Yeni projeler, iş birlikleri veya sadece merhaba demek için bana ulaşın.
                    </p>
                    <a
                        href="mailto:abdulsamedbozdag@gmail.com"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-medium text-sm hover:opacity-80 transition-opacity"
                    >
                        <Mail className="w-4 h-4" />
                        İletişime Geç
                    </a>
                </motion.div>

                {/* Links & Info */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                    <p className="text-neutral-500 text-sm">
                        © {new Date().getFullYear()} Abdulsamed Bozdağ. Tüm hakları saklıdır.
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="https://www.linkedin.com/in/abdul-samed-bozda%C4%9F/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors text-sm"
                        >
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                            <ArrowUpRight className="w-3 h-3" />
                        </a>
                        <a
                            href="https://www.behance.net/abdulsamedbozdags"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors text-sm"
                        >
                            Behance
                            <ArrowUpRight className="w-3 h-3" />
                        </a>
                        <a
                            href="mailto:abdulsamedbozdag@gmail.com"
                            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors text-sm"
                        >
                            abdulsamedbozdag@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
