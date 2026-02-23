"use client";

import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
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
    return (
        <div className={className}>
            <Canvas
                shadows={false} // Disable heavy shadows for perf
                dpr={[1, 1.5]}
                gl={{ preserveDrawingBuffer: false, alpha: true, antialias: false }}
                camera={{ position: [0, 0, 5], fov: 45 }}
                frameloop="demand" // IMPORTANT: Only render when needed
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
        </div>
    );
}
