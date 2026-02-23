"use client";

import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF, Float } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

function SpitfireModel() {
    const { scene } = useGLTF("/spitfire/spitfire.glb");
    const groupRef = useRef<THREE.Group>(null);

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    );
}

interface SpitfireSceneProps {
    className?: string;
    enableZoom?: boolean;
    minDistance?: number;
    maxDistance?: number;
    autoRotate?: boolean;
}

export function SpitfireScene({
    className = "h-[500px] w-full",
    enableZoom = false,
    minDistance = 5,
    maxDistance = 15,
    autoRotate = false,
}: SpitfireSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className={className}>
            {isVisible && (
                <Canvas
                    shadows={false}
                    dpr={[1, 1.5]}
                    gl={{ alpha: true, antialias: true }}
                >
                    <Suspense fallback={null}>
                        <Stage
                            intensity={0.5}
                            environment="city"
                        >
                            <Float
                                speed={2}
                                rotationIntensity={0.5}
                                floatIntensity={1}
                            >
                                <SpitfireModel />
                            </Float>
                        </Stage>
                    </Suspense>

                    <OrbitControls
                        makeDefault
                        enableZoom={enableZoom}
                        autoRotate={autoRotate}
                        autoRotateSpeed={1}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                        minDistance={minDistance}
                        maxDistance={maxDistance}
                    />
                </Canvas>
            )}
        </div>
    );
}
