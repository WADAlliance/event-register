"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere, Line, Html } from "@react-three/drei";
import { useRef, useState, useEffect, useCallback } from "react";
import { Mesh, Vector3, PerspectiveCamera } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const entities = ["Accra", "Nairobi", "Cameroon", "Nigeria", "DRC"];

// Hook to detect mobile
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    return isMobile;
}

// Blob component
function Blob({
    position,
    speed,
    distort,
    color,
    label,
    showLabel
}: {
    position: [number, number, number];
    speed: number;
    distort: number;
    color: string;
    label?: string;
    showLabel: boolean;
}) {
    const ref = useRef<Mesh>(null);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * speed * 0.4;
            ref.current.rotation.x += delta * speed * 0.2;
        }
    });

    return (
        <group position={position}>
            <Sphere ref={ref} args={[1, 128, 128]}>
                <MeshDistortMaterial
                    color={color}
                    metalness={0}
                    roughness={0.2}
                    emissive={color}
                    emissiveIntensity={1.2}
                    distort={distort}
                    speed={speed * 0.3}
                />
            </Sphere>

            {label && showLabel && (
                <Html
                    position={[0, 1.75, 0]}
                    center
                    prepend
                    distanceFactor={0.5}
                    occlude={false} 
                >
                    <div className="text-neutral-300 text-xl font-bold px-2 py-1 rounded z-20">
                        {label}
                    </div>
                </Html>
            )}
        </group>
    );
}

// Connection line between two blobs
function ConnectionLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
    return <Line points={[start, end]} color="#ffffff" lineWidth={0.3} opacity={0.2} />;
}

// Responsive blob generator
function useResponsiveBlobs() {
    const isMobile = useIsMobile();
    const palette = ["#fbb315", "#2ca2db", "#ef5323", "#7fb842"];
    
    const generateBlobs = useCallback(() => {
        const sectionHeight = isMobile ? 120 : 80; // Taller scene on mobile
        const blobCount = isMobile ? 15 : 25;
        
        const blobs = Array.from({ length: blobCount }).map(() => {
            let x: number;
            
            if (isMobile) {
                // Mobile: more compact horizontally, but still some side preference
                const chanceCenter = 0.4;
                if (Math.random() < chanceCenter) {
                    x = (Math.random() - 0.5) * 3; // thinner - smaller central zone
                } else {
                    const side = Math.random() < 0.5 ? -1 : 1;
                    x = side * (2 + Math.random() * 4); // thinner - closer to center
                }
            } else {
                // Desktop: original logic
                const chanceCenter = 0.2;
                if (Math.random() < chanceCenter) {
                    x = (Math.random() - 0.5) * 6;
                } else {
                    const side = Math.random() < 0.5 ? -1 : 1;
                    x = side * (8 + Math.random() * 12);
                }
            }

            // Label assignment
            let label: string | undefined = undefined;
            const labelThreshold = isMobile ? 3 : 5; // closer threshold for mobile
            const labelChance = isMobile ? 0.4 : 0.6; // fewer labels on mobile
            
            if (Math.abs(x) > labelThreshold && Math.random() < labelChance) {
                label = entities[Math.floor(Math.random() * entities.length)];
            }

            const y = -sectionHeight / 2 + Math.random() * sectionHeight;
            const z = isMobile ? -8 - Math.random() * 15 : -10 - Math.random() * 30;

            return {
                pos: [x, y, z] as [number, number, number],
                speed: 0.5 + Math.random() * 0.5,
                distort: 0.3 + Math.random() * 0.5,
                color: palette[Math.floor(Math.random() * palette.length)],
                label
            };
        });

        // On mobile, ensure 1-2 blobs are placed at the top of the screen (landing area)
        if (isMobile) {
            const topBlobs = Math.floor(Math.random() * 2) + 1; // 1 or 2 blobs
            for (let i = 0; i < topBlobs && i < blobs.length; i++) {
                // Place in upper third of screen with mobile-appropriate positioning
                blobs[i] = {
                    ...blobs[i],
                    pos: [
                        (Math.random() - 0.5) * 8, // spread across mobile width
                        sectionHeight / 2 - (Math.random() * sectionHeight / 3), // upper third
                        -8 - Math.random() * 10 // appropriate z depth for mobile
                    ] as [number, number, number]
                };
            }
        }

        return blobs;
    }, [isMobile]);

    const [blobs, setBlobs] = useState(() => generateBlobs());

    useEffect(() => {
        setBlobs(generateBlobs());
    }, [generateBlobs]);

    return { blobs, isMobile };
}

// Camera controller for responsive field of view
function ResponsiveCamera() {
    const { camera } = useThree();
    const isMobile = useIsMobile();
    
    useEffect(() => {
        if (isMobile) {
            camera.position.set(0, 0, 20); // closer camera for mobile
            if (camera instanceof PerspectiveCamera) {
                camera.fov = 85; // wider field of view
                camera.updateProjectionMatrix();
            }
        } else {
            camera.position.set(0, 0, 25); // original desktop position  
            if (camera instanceof PerspectiveCamera) {
                camera.fov = 75; // original field of view
                camera.updateProjectionMatrix();
            }
        }
    }, [isMobile, camera]);
    
    return null;
}

// Main background scene
export default function BackgroundBlobScene() {
    const { blobs, isMobile } = useResponsiveBlobs();
    const maxDistance = isMobile ? 8 : 12; // shorter connection distance on mobile

    return (
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 25], fov: 75 }}>
                <ResponsiveCamera />
                <ambientLight intensity={0.2} />

                {/* Render blobs */}
                {blobs.map((b, i) => (
                    <Blob 
                        key={i} 
                        position={b.pos} 
                        speed={b.speed} 
                        distort={b.distort} 
                        color={b.color} 
                        label={b.label}
                        showLabel={!isMobile} // only show labels on desktop
                    />
                ))}

                {/* Connect nearby blobs with lines */}
                {blobs.map((b1, i) =>
                    blobs.map((b2, j) => {
                        if (i < j) {
                            const dist = new Vector3(...b1.pos).distanceTo(new Vector3(...b2.pos));
                            if (dist < maxDistance) {
                                return <ConnectionLine key={`${i}-${j}`} start={b1.pos} end={b2.pos} />;
                            }
                        }
                        return null;
                    })
                )}

                <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />

                <EffectComposer>
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={1.2} height={200} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}