"use client";

import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF, Float } from "@react-three/drei";
import { Suspense, useCallback, useRef } from "react";
import * as THREE from "three";
import useSound from "use-sound";

function SpitfireModel() {
    const { scene } = useGLTF("/spitfire/spitfire.glb");
    const groupRef = useRef<THREE.Group>(null);

    // Audio feedback on hover
    const [play, { stop }] = useSound("/sound/engine-hover.mp3", {
        volume: 0.5,
        interrupt: true,
    });

    const handlePointerOver = useCallback(() => {
        try { play(); } catch { /* silent fallback if audio fails */ }
    }, [play]);

    const handlePointerOut = useCallback(() => {
        try { stop(); } catch { /* silent fallback */ }
    }, [stop]);

    return (
        <group
            ref={groupRef}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
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
    return (
        <div className={className}>
            <Canvas
                shadows
                dpr={[1, 2]}
                gl={{ preserveDrawingBuffer: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    {/* Stage auto-centers, scales, and lights the model professionally */}
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

                {/* User Interaction Controls */}
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
        </div>
    );
}
