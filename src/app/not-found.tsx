"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
    const { tx } = useLanguage();
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#050505] text-neutral-900 dark:text-neutral-100 px-6">
            <h1 className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter text-neutral-200 dark:text-neutral-800">
                404
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-2 -mt-4">
                {tx("Sayfa bulunamadı", "Page not found")}
            </p>
            <p className="text-neutral-500 mb-10 text-center max-w-md">
                {tx(
                    "Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.",
                    "The page you are looking for may have been moved, deleted or never existed."
                )}
            </p>
            <Link
                href="/"
                className="px-8 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-medium text-sm hover:opacity-80 transition-opacity"
            >
                {tx("Ana Sayfaya Dön", "Back to Home")}
            </Link>
        </main>
    );
}
