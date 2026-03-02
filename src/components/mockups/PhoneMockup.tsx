"use client";

import { cn } from "@/lib/utils";

interface PhoneMockupProps {
    children: React.ReactNode;
    className?: string;
}

export function PhoneMockup({ children, className }: PhoneMockupProps) {
    return (
        <div className={cn("relative mx-auto border-gray-900 bg-gray-950 border-[6px] rounded-[2.5rem] shadow-xl w-full max-w-[min(320px,85vh*9/19.5)] aspect-[9/19.5]", className)}>
            <div className="w-[120px] h-[16px] bg-gray-900 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
            <div className="h-[30px] w-[2px] bg-gray-900 absolute -start-[8px] top-[80px] rounded-s-lg"></div>
            <div className="h-[30px] w-[2px] bg-gray-900 absolute -start-[8px] top-[130px] rounded-s-lg"></div>
            <div className="h-[50px] w-[2px] bg-gray-900 absolute -end-[8px] top-[100px] rounded-e-lg"></div>
            <div className="rounded-[2.2rem] overflow-hidden w-full h-full bg-black relative z-10">
                {children}
            </div>
        </div>
    );
}
