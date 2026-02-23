"use client";

import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF, Float, useInView as useInViewDrei } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

function TireModel() {
    const { scene } = useGLTF("/prometeon/lastikler/R02_PRO_TRAILER_M1.glb");
    const groupRef = useRef<THREE.Group>(null);

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    );
}

interface TireSceneProps {
    className?: string;
    enableZoom?: boolean;
    autoRotate?: boolean;
}

export function TireScene({
    className = "h-full w-full",
    enableZoom = false,
    autoRotate = true,
}: TireSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    // useInView from framer-motion is fine too, but let's use a standard one for the container
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
                    shadows
                    dpr={[1, 1.5]}
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Suspense fallback={null}>
                        <Stage
                            intensity={0.6}
                            environment="city"
                            adjustCamera={true}
                        >
                            <Float
                                speed={1.5}
                                rotationIntensity={0.3}
                                floatIntensity={0.5}
                            >
                                <TireModel />
                            </Float>
                        </Stage>
                    </Suspense>

                    <OrbitControls
                        makeDefault
                        enableZoom={enableZoom}
                        autoRotate={autoRotate}
                        autoRotateSpeed={0.5}
                        enablePan={false}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                </Canvas>
            )}
        </div>
    );
}
