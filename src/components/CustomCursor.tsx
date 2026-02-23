"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(true); // default true to avoid flash
    const isHoveredRef = useRef(false);
    const rafRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const mobile = window.matchMedia("(pointer: coarse)").matches;
        setIsMobile(mobile);
        if (mobile) return;

        const dot = dotRef.current;
        if (!dot) return;

        let curX = 0, curY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            isHoveredRef.current = !!(
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            );
        };

        const animate = () => {
            const { x, y } = mouseRef.current;
            const hovered = isHoveredRef.current;
            const size = hovered ? 48 : 16;

            // Smooth lerp
            curX += (x - size / 2 - curX) * 0.15;
            curY += (y - size / 2 - curY) * 0.15;

            dot.style.transform = `translate3d(${curX}px, ${curY}px, 0) scale(${hovered ? 3 : 1})`;
            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseover", onMouseOver, { passive: true });
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            cancelAnimationFrame(rafRef.current);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <div
            ref={dotRef}
            className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{ willChange: "transform", transition: "width 0.2s, height 0.2s" }}
        />
    );
}
