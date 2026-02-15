"use client";

import React, { useRef, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────
   GRADIENT MESH BACKGROUND
   Full-screen animated gradient blobs that react
   to cursor position. Pure Canvas 2D — lightweight.
   ───────────────────────────────────────────── */

interface Blob {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    radius: number;
    color: string;
    vx: number;
    vy: number;
    phase: number;       // animation phase offset
    speed: number;       // idle animation speed
}

const BLOBS: Omit<Blob, "x" | "y" | "vx" | "vy">[] = [
    { baseX: 0.2, baseY: 0.3, radius: 0.55, color: "rgba(245, 158, 11, 0.35)", phase: 0, speed: 0.3 },  // Amber
    { baseX: 0.8, baseY: 0.2, radius: 0.50, color: "rgba(139, 92, 246, 0.30)", phase: 1.5, speed: 0.25 },  // Purple
    { baseX: 0.5, baseY: 0.7, radius: 0.60, color: "rgba(59, 130, 246, 0.25)", phase: 3.0, speed: 0.35 },  // Blue
    { baseX: 0.15, baseY: 0.8, radius: 0.45, color: "rgba(236, 72, 153, 0.20)", phase: 4.5, speed: 0.28 },  // Pink
    { baseX: 0.85, baseY: 0.65, radius: 0.40, color: "rgba(16, 185, 129, 0.18)", phase: 2.0, speed: 0.32 },  // Emerald
];

export function GradientMeshBg() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
    const blobsRef = useRef<Blob[]>([]);
    const rafRef = useRef<number>(0);

    const initBlobs = useCallback(() => {
        blobsRef.current = BLOBS.map((b) => ({
            ...b,
            x: b.baseX,
            y: b.baseY,
            vx: 0,
            vy: 0,
        }));
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false })!;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        initBlobs();
        window.addEventListener("resize", resize);

        // Global mouse tracking (works through HTML overlays)
        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = (e.clientX - rect.left) / rect.width;
            mouseRef.current.y = (e.clientY - rect.top) / rect.height;
        };

        const onTouchMove = (e: TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            mouseRef.current.x = (touch.clientX - rect.left) / rect.width;
            mouseRef.current.y = (touch.clientY - rect.top) / rect.height;
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove, { passive: true });

        const animate = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            const t = performance.now() * 0.001;

            // Smooth mouse interpolation for premium feel
            smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.03;
            smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.03;

            const mx = smoothMouseRef.current.x;
            const my = smoothMouseRef.current.y;

            // Dark base
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, w, h);

            // Draw each blob
            const blobs = blobsRef.current;
            for (let i = 0; i < blobs.length; i++) {
                const blob = blobs[i];

                // Idle organic movement
                const idleX = Math.sin(t * blob.speed + blob.phase) * 0.06;
                const idleY = Math.cos(t * blob.speed * 0.8 + blob.phase) * 0.06;

                // Mouse influence — blobs shift towards cursor
                const mouseInfluenceX = (mx - 0.5) * 0.15;
                const mouseInfluenceY = (my - 0.5) * 0.15;

                // Target position = base + idle + mouse
                const targetX = blob.baseX + idleX + mouseInfluenceX;
                const targetY = blob.baseY + idleY + mouseInfluenceY;

                // Smooth position update
                blob.x += (targetX - blob.x) * 0.04;
                blob.y += (targetY - blob.y) * 0.04;

                // Draw radial gradient blob
                const cx = blob.x * w;
                const cy = blob.y * h;
                const r = blob.radius * Math.max(w, h);

                const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                gradient.addColorStop(0, blob.color);
                gradient.addColorStop(0.5, blob.color.replace(/[\d.]+\)$/, "0.1)"));
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, w, h);
            }

            // Extra: Bright highlight near cursor for "flashlight" feel
            const hlx = mx * w;
            const hly = my * h;
            const hlRadius = Math.min(w, h) * 0.3;
            const highlight = ctx.createRadialGradient(hlx, hly, 0, hlx, hly, hlRadius);
            highlight.addColorStop(0, "rgba(255, 255, 255, 0.04)");
            highlight.addColorStop(0.5, "rgba(245, 158, 11, 0.02)");
            highlight.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = highlight;
            ctx.fillRect(0, 0, w, h);

            // Subtle noise grain overlay via random dots (very sparse)
            ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
            for (let i = 0; i < 80; i++) {
                const rx = Math.random() * w;
                const ry = Math.random() * h;
                ctx.fillRect(rx, ry, 1, 1);
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, [initBlobs]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: "block" }}
        />
    );
}
