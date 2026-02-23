"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

function TireModel() {
    const { scene } = useGLTF("/prometeon/lastikler/R02_PRO_TRAILER_M1.glb");
    const groupRef = useRef<THREE.Group>(null);

    return (
        <group ref={groupRef} dispose={null}>
            <primitive object={scene} />
        </group>
    );
}

// Simple fallback to show something while loading
function Loader() {
    return (
        <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial color="#333" wireframe />
        </mesh>
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
                    dpr={[1, 2]} // Back to responsive DPR
                    camera={{ position: [0, 0, 10], fov: 35 }}
                    gl={{
                        antialias: true,
                        alpha: true,
                    }}
                >
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <Suspense fallback={<Loader />}>
                        <Float
                            speed={1.5}
                            rotationIntensity={0.5}
                            floatIntensity={0.5}
                        >
                            <TireModel />
                        </Float>
                        <Environment preset="city" />
                        <ContactShadows
                            position={[0, -2, 0]}
                            opacity={0.4}
                            scale={10}
                            blur={2}
                            far={4.5}
                        />
                    </Suspense>

                    <OrbitControls
                        makeDefault
                        enableZoom={enableZoom}
                        autoRotate={autoRotate}
                        autoRotateSpeed={0.5}
                        enablePan={false}
                        minDistance={5}
                        maxDistance={15}
                    />
                </Canvas>
            )}
        </div>
    );
}
