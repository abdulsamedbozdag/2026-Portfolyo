"use client";

import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   Global mouse state — window-level tracking
   ───────────────────────────────────────────── */
const mouse = { x: 0, y: 0, speedX: 0, speedY: 0 };

function LiquidSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);
    const smoothMouse = useRef({ x: 0, y: 0 });
    const smoothSpeed = useRef(0);

    useFrame(() => {
        if (!meshRef.current) return;

        // Smooth mouse
        smoothMouse.current.x += (mouse.x - smoothMouse.current.x) * 0.04;
        smoothMouse.current.y += (mouse.y - smoothMouse.current.y) * 0.04;

        const sx = smoothMouse.current.x;
        const sy = smoothMouse.current.y;

        // Light follows cursor
        if (lightRef.current) {
            lightRef.current.position.x = sx * 4;
            lightRef.current.position.y = sy * 3;
            lightRef.current.position.z = 3;
        }

        // Dynamic distortion from mouse speed
        const rawSpeed = Math.sqrt(mouse.speedX ** 2 + mouse.speedY ** 2);
        smoothSpeed.current = THREE.MathUtils.lerp(smoothSpeed.current, rawSpeed, 0.05);

        const mat = meshRef.current.material as any;
        if (mat) {
            mat.distort = THREE.MathUtils.clamp(0.3 + smoothSpeed.current * 1.0, 0.3, 0.75);
            mat.speed = THREE.MathUtils.clamp(1.2 + smoothSpeed.current * 3, 1.2, 6);
        }
    });

    return (
        <>
            <ambientLight intensity={0.15} />

            {/* Key light — follows cursor */}
            <pointLight
                ref={lightRef}
                position={[0, 0, 3]}
                intensity={200}
                color="#e2e8f0"
                distance={20}
                decay={2}
            />

            {/* Rim lights for reflections */}
            <pointLight position={[-5, 4, -3]} intensity={60} color="#8b5cf6" />
            <pointLight position={[5, -3, -4]} intensity={40} color="#f59e0b" />
            <pointLight position={[0, 5, 2]} intensity={30} color="#ffffff" />

            {/* Sphere — fits the screen, radius 2.2, camera at z=5 */}
            <Sphere ref={meshRef} args={[2.2, 256, 256]}>
                <MeshDistortMaterial
                    color="#111111"
                    roughness={0.0}
                    metalness={1.0}
                    distort={0.3}
                    speed={1.2}
                    envMapIntensity={2.5}
                />
            </Sphere>

            {/* Studio environment for clean, bright reflections */}
            <Environment preset="studio" />

            {/* OrbitControls — drag to rotate the sphere */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.4}
                dampingFactor={0.05}
                enableDamping={true}
                autoRotate={true}
                autoRotateSpeed={0.5}
            />
        </>
    );
}

/* ─────────────────────────────────────────────
   Mouse tracker hook
   ───────────────────────────────────────────── */
function useGlobalMouse(containerRef: React.RefObject<HTMLDivElement | null>) {
    const lastX = useRef(0);
    const lastY = useRef(0);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const el = containerRef.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
            const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
            mouse.speedX = nx - lastX.current;
            mouse.speedY = ny - lastY.current;
            mouse.x = nx;
            mouse.y = ny;
            lastX.current = nx;
            lastY.current = ny;
        };

        const onLeave = () => { mouse.speedX = 0; mouse.speedY = 0; };

        const onTouch = (e: TouchEvent) => {
            const el = containerRef.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const t = e.touches[0];
            const nx = ((t.clientX - r.left) / r.width) * 2 - 1;
            const ny = -(((t.clientY - r.top) / r.height) * 2 - 1);
            mouse.speedX = nx - lastX.current;
            mouse.speedY = ny - lastY.current;
            mouse.x = nx;
            mouse.y = ny;
            lastX.current = nx;
            lastY.current = ny;
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseleave", onLeave);
        window.addEventListener("touchmove", onTouch, { passive: true });
        window.addEventListener("touchend", onLeave);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("touchmove", onTouch);
            window.removeEventListener("touchend", onLeave);
        };
    }, [containerRef]);
}

export function FullBleedLiquid() {
    const containerRef = useRef<HTMLDivElement>(null);
    useGlobalMouse(containerRef);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 bg-[#050505]">
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 5], fov: 65 }}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
            >
                <Suspense fallback={null}>
                    <LiquidSphere />
                </Suspense>
            </Canvas>
        </div>
    );
}
