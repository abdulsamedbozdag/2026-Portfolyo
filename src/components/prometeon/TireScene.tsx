"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, Environment, ContactShadows, Center } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Optimization: Using a CDN for Draco decoder to handle compressed models
const DRACO_URL = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";

function TireModel() {
    // Adding Draco support and error handling
    const { scene } = useGLTF("/prometeon/lastikler/R02_PRO_TRAILER_M1.glb", DRACO_URL);

    useEffect(() => {
        if (scene) {
            console.log("Tire model loaded successfully");
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        }
    }, [scene]);

    return (
        <Center>
            <primitive object={scene} />
        </Center>
    );
}

function Loader() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#00AEEF" wireframe />
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
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.05 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className={`${className} flex items-center justify-center bg-transparent`}
            style={{ minHeight: '400px' }}
        >
            {isVisible ? (
                <Canvas
                    shadows
                    dpr={[1, 1.5]}
                    camera={{ position: [0, 0, 8], fov: 40 }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        outputColorSpace: THREE.SRGBColorSpace
                    }}
                >
                    <color attach="background" args={["transparent" as any]} />
                    <ambientLight intensity={0.7} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                    <pointLight position={[-10, -5, -10]} intensity={1} color="#00AEEF" />

                    <Suspense fallback={<Loader />}>
                        <Float
                            speed={1.5}
                            rotationIntensity={0.2}
                            floatIntensity={0.4}
                        >
                            <TireModel />
                        </Float>
                        <Environment preset="city" />
                        <ContactShadows
                            position={[0, -2.5, 0]}
                            opacity={0.4}
                            scale={15}
                            blur={2.5}
                            far={5}
                        />
                    </Suspense>

                    <OrbitControls
                        makeDefault
                        enableZoom={enableZoom}
                        autoRotate={autoRotate}
                        autoRotateSpeed={0.5}
                        enablePan={false}
                        minDistance={4}
                        maxDistance={20}
                    />
                </Canvas>
            ) : (
                <div className="text-white/10 text-xs animate-pulse">3D Hazırlanıyor...</div>
            )}
        </div>
    );
}

// Preload the model to speed up when it enters view
useGLTF.preload("/prometeon/lastikler/R02_PRO_TRAILER_M1.glb", DRACO_URL);
