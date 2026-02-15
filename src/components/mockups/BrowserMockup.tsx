"use client";

import { cn } from "@/lib/utils";

interface BrowserMockupProps {
    children: React.ReactNode;
    className?: string;
}

export function BrowserMockup({ children, className }: BrowserMockupProps) {
    return (
        <div className={cn("w-full rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800", className)}>
            <div className="h-10 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 flex items-center px-4 space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="flex-1 ml-4">
                    <div className="h-6 w-full max-w-[400px] bg-white dark:bg-neutral-900 rounded-md mx-auto opacity-50 text-[10px] flex items-center justify-center text-neutral-400">
                        example.com
                    </div>
                </div>
            </div>
            <div className="relative w-full aspect-video bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
                {children}
            </div>
        </div>
    );
}
