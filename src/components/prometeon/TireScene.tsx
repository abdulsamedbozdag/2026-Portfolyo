"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { Loader3D } from "../3d/Loader3D";

function PrometeonTire() {
    const { scene } = useGLTF(
        '/prometeon/lastikler/R02_PRO_TRAILER_M1_7MB.glb',
        'https://www.gstatic.com/draco/versioned/decoders/1.5.5/'
    );

    // Hiyerarşiyi bozmadan sadece istenmeyenleri gizliyoruz
    scene.traverse((node: any) => {
        if (node.isMesh || node.isSkinnedMesh) {
            node.geometry.computeBoundingSphere();
            const radius = node.geometry.boundingSphere.radius;
            // Lastik parçaları ~500 içinde kalır. Cylinder ve diğer devasa yapılar ~1300.
            if (radius > 800) {
                node.visible = false;
            } else {
                node.visible = true;
            }
        }
    });

    return (
        <group scale={0.25}>
            <primitive object={scene} />
        </group>
    );
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
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden cursor-grab active:cursor-grabbing">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]" />

            <Canvas shadows camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]}>
                <Suspense fallback={<Loader3D />}>
                    <Stage environment="studio" intensity={1.5} shadows={{ type: 'contact', opacity: 0.8, blur: 2 } as any} adjustCamera={true}>
                        <PrometeonTire />
                    </Stage>

                    {/* Branding specific spotlight - hitting sidewall at an angle for shadows */}
                    <spotLight position={[7, 2, 5]} intensity={20} angle={0.4} penumbra={1} castShadow />
                    <directionalLight position={[10, 5, 5]} intensity={4} color="#ffffff" />
                    <directionalLight position={[-10, 5, -5]} intensity={1} color="#ffffff" />
                    <ambientLight intensity={0.4} />

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
