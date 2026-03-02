"use client";

import { cn } from "@/lib/utils";

interface BoodyPhoneMockupProps {
    children: React.ReactNode;
    className?: string;
}

export function BoodyPhoneMockup({ children, className }: BoodyPhoneMockupProps) {
    return (
        <div className={cn("relative mx-auto w-full max-w-[min(320px,85vh*9/19.5)] aspect-[9/19.5]", className)}>
            {/* Ambient Glow */}
            <div className="absolute -inset-4 bg-purple-600/20 blur-[60px] rounded-full opacity-50" />

            {/* Device Frame */}
            <div className="relative border-[#1a1a1a] bg-[#0d0d0d] border-[6px] rounded-[2.5rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden w-full h-full">
                {/* Screen Inner Border/Bezel */}
                <div className="absolute inset-0 border-[1.5px] border-white/5 rounded-[2.2rem] pointer-events-none z-20" />

                {/* Dynamic Island */}
                <div className="w-[70px] h-[20px] bg-[#1a1a1a] top-3 rounded-full left-1/2 -translate-x-1/2 absolute z-30 flex items-center justify-end px-2">
                    <div className="w-1 h-1 rounded-full bg-[#1a1a1a] border border-white/5" />
                </div>

                {/* Side Buttons (Subtle) */}
                <div className="h-[30px] w-[2px] bg-[#1a1a1a] absolute -start-[8px] top-[80px] rounded-s-lg border-y border-white/5"></div>
                <div className="h-[30px] w-[2px] bg-[#1a1a1a] absolute -start-[8px] top-[130px] rounded-s-lg border-y border-white/5"></div>
                <div className="h-[50px] w-[2px] bg-[#1a1a1a] absolute -end-[8px] top-[100px] rounded-e-lg border-y border-white/5"></div>

                {/* Content Area */}
                <div className="relative w-full h-full overflow-hidden bg-[#0d0d0d] z-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
