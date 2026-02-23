"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

function PrometeonTire({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    // Drastically reduced scale to ensure it's small relative to the background text
    return <primitive object={scene} scale={0.25} />;
}

export function TireScene() {
    const [isCtrlPressed, setIsCtrlPressed] = React.useState(false);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Control") setIsCtrlPressed(true);
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Control") setIsCtrlPressed(false);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        const handleBlur = () => setIsCtrlPressed(false);
        window.addEventListener("blur", handleBlur);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("blur", handleBlur);
        };
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            {/* Background Glow (to help black tire visibility) */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]" />

            <Canvas shadows camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]}>
                <Suspense fallback={null}>
                    {/* Re-enabling adjustCamera to let Stage handle the base fit, matching scale for final size */}
                    <Stage environment="studio" intensity={1.5} shadows={{ type: 'contact', opacity: 0.8, blur: 2 } as any} adjustCamera={true}>
                        <PrometeonTire url="/prometeon/lastikler/R02_PRO_TRAILER_M1_7MB.glb" />
                    </Stage>

                    {/* Lighting for the sidewall */}
                    <directionalLight position={[5, 2, 5]} intensity={3} color="#ffffff" />
                    <directionalLight position={[-5, 2, 5]} intensity={2} color="#ffffff" />
                    <ambientLight intensity={0.5} />

                    <OrbitControls
                        enableZoom={isCtrlPressed}
                        enablePan={false}
                        autoRotate={!isCtrlPressed}
                        rotateSpeed={0.5}
                        autoRotateSpeed={0.5}
                        makeDefault
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
