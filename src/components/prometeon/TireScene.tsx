"use client";

import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    useGLTF,
    Float,
    Center,
    useProgress,
    Html,
    ContactShadows
} from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Optimization: Common decoders for optimized GLB files
const DRACO_URL = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";

function TireModel() {
    // Attempting to load with Draco support
    const { scene } = useGLTF("/prometeon/lastikler/R02_PRO_TRAILER_M1.glb", DRACO_URL);

    useEffect(() => {
        if (scene) {
            console.log("3D Model Render: Model loaded and added to scene.");
            scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    // Fix for potential black-out or white-out materials
                    if ((child as THREE.Mesh).material) {
                        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
                        if (mat.emissive) mat.emissive.setScalar(0);
                    }
                }
            });
        }
    }, [scene]);

    return (
        <Center top>
            <primitive object={scene} />
        </Center>
    );
}

function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center gap-4 min-w-[200px]">
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden border border-white/5">
                    <div
                        className="bg-[#00AEEF] h-full transition-all duration-300 shadow-[0_0_10px_#00AEEF]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="text-[9px] text-[#00AEEF] uppercase tracking-[0.3em] font-bold">
                    %{progress.toFixed(0)}
                </span>
            </div>
        </Html>
    );
}

export function TireScene() {
    const [hasError, setHasError] = useState(false);

    return (
        <div className="w-full h-full min-h-[400px] bg-[#050505] flex items-center justify-center relative overflow-hidden rounded-2xl">
            <Canvas
                shadows={false}
                dpr={1} // Keep it low for initial stability
                camera={{ position: [0, 2, 12], fov: 35 }}
                gl={{
                    antialias: true,
                    alpha: false, // Switch to false to avoid desktop transparency glitches
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true
                }}
                onCreated={({ gl, scene }) => {
                    gl.setClearColor(new THREE.Color('#050505'));
                    console.log("Canvas Ready");
                }}
                onError={(err) => {
                    console.error("Canvas Global Error:", err);
                    setHasError(true);
                }}
            >
                {/* Lighting system - Manual is safer than Environment preset during debugging */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} castShadow={false} />
                <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#00AEEF" />
                <pointLight position={[0, -5, 5]} intensity={0.3} />

                <Suspense fallback={<Loader />}>
                    {!hasError ? (
                        <group>
                            <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
                                <TireModel />
                            </Float>
                            <ContactShadows
                                position={[0, -2.5, 0]}
                                opacity={0.3}
                                scale={10}
                                blur={2}
                                far={4}
                            />
                        </group>
                    ) : (
                        <Html center>
                            <span className="text-red-500/50 text-[10px] uppercase font-mono tracking-widest">
                                Rendering Failed
                            </span>
                        </Html>
                    )}
                </Suspense>

                <OrbitControls
                    makeDefault
                    enableZoom={true}
                    autoRotate={true}
                    autoRotateSpeed={0.4}
                    enablePan={false}
                    minDistance={6}
                    maxDistance={25}
                />
            </Canvas>
        </div>
    );
}

// Ensure preload
useGLTF.preload("/prometeon/lastikler/R02_PRO_TRAILER_M1.glb", DRACO_URL);
