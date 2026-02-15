"use client";

import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   Global mouse state shared between DOM and R3F
   ───────────────────────────────────────────── */
const mouseState = {
    x: 0,       // normalized -1 to 1
    y: 0,       // normalized -1 to 1
    speedX: 0,
    speedY: 0,
};

function Scene() {
    const sphereRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);
    const smoothMouse = useRef({ x: 0, y: 0 });
    const smoothSpeed = useRef(0);

    useFrame(() => {
        if (!sphereRef.current) return;

        const mx = mouseState.x;
        const my = mouseState.y;

        // Smooth the mouse position for premium feel
        smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mx, 0.08);
        smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, my, 0.08);

        const sx = smoothMouse.current.x;
        const sy = smoothMouse.current.y;

        // 1. Mouse-Follow Light
        if (lightRef.current) {
            lightRef.current.position.x = sx * 4;
            lightRef.current.position.y = sy * 3;
            lightRef.current.position.z = 3;
        }

        // 2. Magnetic Tilt
        sphereRef.current.rotation.x = THREE.MathUtils.lerp(
            sphereRef.current.rotation.x, -sy * 0.5, 0.04
        );
        sphereRef.current.rotation.y = THREE.MathUtils.lerp(
            sphereRef.current.rotation.y, sx * 0.5, 0.04
        );

        // 3. Dynamic Distortion from mouse speed
        const rawSpeed = Math.sqrt(
            mouseState.speedX * mouseState.speedX +
            mouseState.speedY * mouseState.speedY
        );
        smoothSpeed.current = THREE.MathUtils.lerp(smoothSpeed.current, rawSpeed, 0.06);

        const mat = sphereRef.current.material as any;
        if (mat) {
            mat.distort = THREE.MathUtils.clamp(0.3 + smoothSpeed.current * 0.8, 0.3, 0.9);
            mat.speed = THREE.MathUtils.clamp(1.5 + smoothSpeed.current * 3, 1.5, 6);
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
            <ambientLight intensity={0.15} />

            {/* Interactive Flashlight — follows cursor */}
            <pointLight
                ref={lightRef}
                position={[0, 0, 3]}
                intensity={120}
                color="#f59e0b"
                distance={12}
                decay={2}
            />

            {/* Static fill lights */}
            <pointLight position={[8, 8, 8]} intensity={30} color="#f59e0b" />
            <pointLight position={[-8, -6, 4]} intensity={15} color="#3b82f6" />

            <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.8}>
                <Sphere ref={sphereRef} args={[1.3, 128, 128]}>
                    <MeshDistortMaterial
                        color="#080808"
                        roughness={0.04}
                        metalness={1}
                        distort={0.35}
                        speed={2}
                        emissive="#000000"
                    />
                </Sphere>
            </Float>

            <Environment preset="city" />
        </>
    );
}

/* ─────────────────────────────────────────────
   MouseTracker: Listens on the WINDOW so HTML
   overlays don't block the interaction.
   ───────────────────────────────────────────── */
function MouseTracker({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
    const lastX = useRef(0);
    const lastY = useRef(0);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();

            // Normalize to -1..1 relative to the hero section
            const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1); // flip Y

            mouseState.speedX = nx - lastX.current;
            mouseState.speedY = ny - lastY.current;
            mouseState.x = nx;
            mouseState.y = ny;

            lastX.current = nx;
            lastY.current = ny;
        };

        const onMouseLeave = () => {
            mouseState.speedX = 0;
            mouseState.speedY = 0;
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", onMouseLeave);

        // Touch support
        const onTouchMove = (e: TouchEvent) => {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const touch = e.touches[0];
            const nx = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
            const ny = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);

            mouseState.speedX = nx - lastX.current;
            mouseState.speedY = ny - lastY.current;
            mouseState.x = nx;
            mouseState.y = ny;

            lastX.current = nx;
            lastY.current = ny;
        };

        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onMouseLeave);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onMouseLeave);
        };
    }, [containerRef]);

    return null;
}

export function AbstractHeroBg() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 bg-[#050505]">
            <MouseTracker containerRef={containerRef} />
            <Canvas dpr={[1, 2]} style={{ pointerEvents: "none" }}>
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
            {/* Overlay gradients for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-50 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#050505_100%)] opacity-30 pointer-events-none" />
        </div>
    );
}
