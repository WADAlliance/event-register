"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere, Line, Html } from "@react-three/drei";
import { useRef, useState, useEffect, useCallback } from "react";
import { Mesh, Vector3, PerspectiveCamera, Group } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// ===========================================
// VISUAL CONFIGURATION PARAMETERS
// ===========================================

const VISUAL_CONFIG = {
    // Scene Layout
    desktop: {
        blobCount: 25,
        sectionHeight: 80,
        cameraPosition: [0, 0, 15] as [number, number, number],
        cameraFov: 100,
        blobZRange: [-2, -17], // [min, max] z positions
    },
    mobile: {
        blobCount: 15,
        sectionHeight: 150, // taller for mobile
        cameraPosition: [0, 0, 18] as [number, number, number],
        cameraFov: 120,
        blobZRange: [-5, -15], // [min, max] z positions
        topBlobsCount: [2, 3], // [min, max] guaranteed blobs at top
    },
    
    // Extended scene configuration for parallax
    extended: {
        heightMultiplier: 2.5,
        widthMultiplier: 2.0,
        parallaxLayers: {
            foreground: { zRange: [-2, -8], parallaxStrength: 1.0, density: 0.4 },
            midground: { zRange: [-8, -15], parallaxStrength: 0.6, density: 0.4 },
            background: { zRange: [-15, -25], parallaxStrength: 0.3, density: 0.2 }
        }
    },
    
    // Drift animation
    drift: {
        enabled: true,
        speed: 0.002,
        amplitude: { x: 0.5, y: 0.3, z: 0.2 }
    },
    
    // Scroll parallax
    scroll: {
        parallaxFactor: 0.0008,
        maxOffset: 5
    },
    
    // Blob Positioning
    positioning: {
        desktop: {
            chanceCenter: 0.2,
            centralZone: 6,
            sideOffset: 8,
            sideSpread: 12,
        },
        mobile: {
            chanceCenter: 0.4,
            centralZone: 3,
            sideOffset: 2,
            sideSpread: 4,
        }
    },
    
    // Colors & Materials
    colors: {
        palette: ["#fbb315", "#2ca2db", "#ef5323", "#7fb842"],
        material: {
            metalness: 0.2,
            roughness: 0.5,
            emissiveIntensity: 1.2,
        }
    },
    
    // Lighting Setup
    lighting: {
        ambientIntensity: 0.1,
        directionalIntensity: 0.05,
        directionalPosition: [10, 10, 5] as [number, number, number],
        pointLight1: {
            intensity: 0.3,
            color: "#4a0080",
            position: [-10, -10, -5] as [number, number, number],
        },
        pointLight2: {
            intensity: 0.4,
            color: "#6600cc", 
            position: [15, 5, 10] as [number, number, number],
        },
        spotlight: {
            intensity: 0.2,
            color: "#8a2be2",
            position: [0, 20, 10] as [number, number, number],
            angle: 0.3,
            penumbra: 0.8,
        }
    },
    
    // Animation
    animation: {
        speedRange: [0.5, 1.0], // [min, max]
        distortRange: [0.3, 0.8], // [min, max]
        rotationSpeed: {
            y: 0.4,
            x: 0.2,
        }
    },
    
    // Labels
    labels: {
        entities: [
            "Accra, Ghana", 
            "Nalegu, Ghana",
            "Tamale, Ghana",
            "Nairobi, Kenya", 
            "Johannesburg, South Africa", 
            "Abijan, Côte d'Ivoire", 
            "Goma, DRC",
            "Kinshasa, DRC",
            "Dar es Salaam, Tanzania",
            "Douala, Cameroon",
            "Lagos, Nigeria",
            "Bobo Dioulasso, Burkina Faso"
        ],
        desktop: {
            threshold: 5, // min distance from center to show label
            chance: 0.7, // probability of showing label
            show: true,
        },
        mobile: {
            threshold: 3,
            chance: 0.4,
            show: false, // labels disabled on mobile
        }
    },
    
    // Connections
    connections: {
        maxDistance: {
            desktop: 8,
            mobile: 8,
        },
        lineWidth: 0.3,
        opacity: 0.2,
        color: "#ffffff",
    },
    
    // Effects
    effects: {
        bloom: {
            luminanceThreshold: 0,
            luminanceSmoothing: 0.9,
            intensity: 1.1,
            height: 150,
        }
    }
};

// ===========================================
// COMPONENT LOGIC
// ===========================================

// Types for generated blobs and layers
type ParallaxLayer = "foreground" | "midground" | "background";

interface BackgroundBlob {
    pos: [number, number, number];
    speed: number;
    distort: number;
    color: string;
    label?: string;
    layer: ParallaxLayer;
    parallaxStrength: number;
    driftOffset: [number, number, number];
    driftSpeed: number;
}

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

// Hook to track scroll for parallax
function useScrollParallax() {
    const [scrollY, setScrollY] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return scrollY;
}

// Enhanced Blob component with drift
function Blob({
    position,
    speed,
    distort,
    color,
    label,
    showLabel,
    parallaxStrength = 1.0,
    driftOffset = [0, 0, 0],
    driftSpeed = 1.0,
    scrollOffset = 0
}: {
    position: [number, number, number];
    speed: number;
    distort: number;
    color: string;
    label?: string;
    showLabel: boolean;
    parallaxStrength?: number;
    driftOffset?: [number, number, number];
    driftSpeed?: number;
    scrollOffset?: number;
}) {
    const ref = useRef<Mesh>(null);
    const groupRef = useRef<Group>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * speed * VISUAL_CONFIG.animation.rotationSpeed.y;
            ref.current.rotation.x += delta * speed * VISUAL_CONFIG.animation.rotationSpeed.x;
        }

        if (groupRef.current && VISUAL_CONFIG.drift.enabled) {
            const time = state.clock.getElapsedTime();
            const drift = VISUAL_CONFIG.drift;
            
            // Apply scroll-based parallax
            const parallaxY = scrollOffset * parallaxStrength * VISUAL_CONFIG.scroll.parallaxFactor;
            const clampedParallaxY = Math.max(-VISUAL_CONFIG.scroll.maxOffset, 
                Math.min(VISUAL_CONFIG.scroll.maxOffset, parallaxY));
            
            // Apply continuous drift
            const driftX = Math.sin(time * drift.speed * driftSpeed + driftOffset[0]) * drift.amplitude.x;
            const driftY = Math.cos(time * drift.speed * driftSpeed + driftOffset[1]) * drift.amplitude.y;
            const driftZ = Math.sin(time * drift.speed * driftSpeed * 0.5 + driftOffset[2]) * drift.amplitude.z;
            
            // Combine original position, drift, and parallax
            groupRef.current.position.set(
                position[0] + driftX,
                position[1] + driftY + clampedParallaxY,
                position[2] + driftZ
            );
        }
    });

    return (
        <group ref={groupRef} position={position}>
            <Sphere ref={ref} args={[1, 128, 128]}>
                <MeshDistortMaterial
                    color={color}
                    metalness={VISUAL_CONFIG.colors.material.metalness}
                    roughness={VISUAL_CONFIG.colors.material.roughness}
                    emissive={color}
                    emissiveIntensity={VISUAL_CONFIG.colors.material.emissiveIntensity}
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
                    <div className="text-gray-400/60 text-sm w-[120px] font-semibold px-2 py-1 rounded z-20 text-center">
                        {label}
                    </div>
                </Html>
            )}
        </group>
    );
}

// Connection line between two blobs
function ConnectionLine({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
    const config = VISUAL_CONFIG.connections;
    return (
        <Line 
            points={[start, end]} 
            color={config.color} 
            lineWidth={config.lineWidth} 
            opacity={config.opacity} 
        />
    );
}

// Enhanced responsive blob generator
function useResponsiveBlobs() {
    const isMobile = useIsMobile();
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    
    const sceneHeight = viewportHeight * VISUAL_CONFIG.extended.heightMultiplier;
    const sceneWidth = viewportWidth * VISUAL_CONFIG.extended.widthMultiplier;
    
    console.log('[useResponsiveBlobs] Hook called, isMobile:', isMobile);
    
    const generateBlobs = useCallback(() => {
        console.log('[generateBlobs] Function called, isMobile:', isMobile);
        console.log('[generateBlobs] Extended scene size:', { sceneWidth, sceneHeight });
        
        const deviceConfig = isMobile ? VISUAL_CONFIG.mobile : VISUAL_CONFIG.desktop;
        const posConfig = isMobile ? VISUAL_CONFIG.positioning.mobile : VISUAL_CONFIG.positioning.desktop;
        const labelConfig = isMobile ? VISUAL_CONFIG.labels.mobile : VISUAL_CONFIG.labels.desktop;
        const layers = VISUAL_CONFIG.extended.parallaxLayers;
        
        console.log('[generateBlobs] Configs loaded:', {
            blobCount: deviceConfig.blobCount,
            labelConfig: labelConfig
        });
        
        const allBlobs: BackgroundBlob[] = [];
        
        // Generate blobs for each parallax layer
        Object.entries(layers).forEach(([layerName, layer]) => {
            const layerBlobCount = Math.floor(deviceConfig.blobCount * layer.density);
            console.log(`[generateBlobs] Layer ${layerName}: ${layerBlobCount} blobs, z-range:`, layer.zRange);
            
            const layerBlobs: BackgroundBlob[] = Array.from({ length: layerBlobCount }).map((_, index) => {
                let x: number;
                
                // Use extended scene dimensions for positioning
                if (Math.random() < posConfig.chanceCenter) {
                    x = (Math.random() - 0.5) * posConfig.centralZone;
                } else {
                    const side = Math.random() < 0.5 ? -1 : 1;
                    const extendedSideOffset = posConfig.sideOffset * (sceneWidth / viewportWidth) * 0.8;
                    const extendedSideSpread = posConfig.sideSpread * (sceneWidth / viewportWidth) * 0.8;
                    x = side * (extendedSideOffset + Math.random() * extendedSideSpread);
                }

                // Label assignment (background layer gets no labels)
                let label: string | undefined = undefined;
                if (layerName !== 'background' && Math.abs(x) > labelConfig.threshold && Math.random() < labelConfig.chance) {
                    label = VISUAL_CONFIG.labels.entities[Math.floor(Math.random() * VISUAL_CONFIG.labels.entities.length)];
                    console.log(`[generateBlobs] ${layerName} blob ${index} assigned label:`, label, 'at position x:', x);
                }

                const y = (-sceneHeight / 2) + Math.random() * sceneHeight;
                const zRange = layer.zRange;
                const z = zRange[0] + Math.random() * (zRange[1] - zRange[0]);

                const speedRange = VISUAL_CONFIG.animation.speedRange;
                const distortRange = VISUAL_CONFIG.animation.distortRange;

                return {
                    pos: [x, y, z],
                    speed: speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]),
                    distort: distortRange[0] + Math.random() * (distortRange[1] - distortRange[0]),
                    color: VISUAL_CONFIG.colors.palette[Math.floor(Math.random() * VISUAL_CONFIG.colors.palette.length)],
                    label,
                    layer: layerName as ParallaxLayer,
                    parallaxStrength: layer.parallaxStrength,
                    driftOffset: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2],
                    driftSpeed: 0.5 + Math.random() * 1.5
                };
            });
            
            allBlobs.push(...layerBlobs);
        });

        // On mobile, ensure 1-2 blobs are placed at the top of the screen (landing area)
        if (isMobile) {
            const topBlobsRange = VISUAL_CONFIG.mobile.topBlobsCount;
            const topBlobs = Math.floor(Math.random() * (topBlobsRange[1] - topBlobsRange[0] + 1)) + topBlobsRange[0];
            console.log('[generateBlobs] Mobile detected, repositioning', topBlobs, 'blobs to top');
            
            for (let i = 0; i < topBlobs && i < allBlobs.length; i++) {
                const foregroundLayer = layers.foreground;
                const originalLabel = allBlobs[i].label;
                allBlobs[i] = {
                    ...allBlobs[i],
                    pos: [
                        (Math.random() - 0.5) * 8, // spread across mobile width
                        sceneHeight / 2 - (Math.random() * sceneHeight / 3), // upper third
                        foregroundLayer.zRange[0] + Math.random() * (foregroundLayer.zRange[1] - foregroundLayer.zRange[0]) * 0.6 // closer z depth for mobile
                    ] as [number, number, number],
                    layer: 'foreground',
                    parallaxStrength: foregroundLayer.parallaxStrength
                };
                console.log(`[generateBlobs] Blob ${i} repositioned for mobile, label preserved:`, originalLabel);
            }
        }

        const labelsCount = allBlobs.filter(b => b.label).length;
        console.log('[generateBlobs] Generated', allBlobs.length, 'blobs with', labelsCount, 'labels');
        
        return allBlobs;
    }, [isMobile, sceneHeight, sceneWidth, viewportHeight, viewportWidth]);

    console.log('[useResponsiveBlobs] About to call useState with generateBlobs');
    const [blobs] = useState<BackgroundBlob[]>(() => {
        console.log('[useState initializer] Calling generateBlobs');
        return generateBlobs();
    });

    console.log('[useResponsiveBlobs] Current blobs state:', blobs.length, 'blobs with', blobs.filter(b => b.label).length, 'labels');

    return { blobs, isMobile };
}

// Enhanced camera controller with scroll response
function ResponsiveCamera({ scrollOffset }: { scrollOffset: number }) {
    const { camera } = useThree();
    const isMobile = useIsMobile();
    
    console.log('[ResponsiveCamera] Component called, isMobile:', isMobile);
    
    useEffect(() => {
        console.log('[ResponsiveCamera] useEffect triggered, isMobile:', isMobile, 'scrollOffset:', scrollOffset);
        const deviceConfig = isMobile ? VISUAL_CONFIG.mobile : VISUAL_CONFIG.desktop;
        
        // Adjust camera position based on scroll (subtle movement)
        const scrollInfluence = scrollOffset * 0.001;
        camera.position.set(
            deviceConfig.cameraPosition[0],
            deviceConfig.cameraPosition[1] + scrollInfluence,
            deviceConfig.cameraPosition[2]
        );
        
        if (camera instanceof PerspectiveCamera) {
            // Slightly wider FOV for extended scene
            camera.fov = deviceConfig.cameraFov + 5;
            camera.updateProjectionMatrix();
            console.log('[ResponsiveCamera] Camera updated - position:', camera.position.toArray(), 'fov:', camera.fov);
        }
    }, [isMobile, camera, scrollOffset]);
    
    return null;
}

// Main background scene
export default function BackgroundBlobScene() {
    console.log('[BackgroundBlobScene] Component render started');
    
    const { blobs, isMobile } = useResponsiveBlobs();
    const scrollY = useScrollParallax();
    const lightConfig = VISUAL_CONFIG.lighting;
    const connectionConfig = VISUAL_CONFIG.connections;
    const effectsConfig = VISUAL_CONFIG.effects;
    const labelConfig = isMobile ? VISUAL_CONFIG.labels.mobile : VISUAL_CONFIG.labels.desktop;
    
    console.log('[BackgroundBlobScene] Render state:', {
        blobsCount: blobs.length,
        labelsCount: blobs.filter(b => b.label).length,
        isMobile: isMobile,
        showLabel: labelConfig.show,
        scrollY: scrollY
    });
    
    const maxDistance = isMobile ? connectionConfig.maxDistance.mobile : connectionConfig.maxDistance.desktop;

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none overflow-hidden">
            {/* Subtle gradient overlay for depth perception */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none z-10" />
            
            <Canvas camera={{ position: VISUAL_CONFIG.desktop.cameraPosition, fov: VISUAL_CONFIG.desktop.cameraFov + 5 }}>
                <ResponsiveCamera scrollOffset={scrollY} />
                
                {/* Lighting Setup */}
                <ambientLight intensity={lightConfig.ambientIntensity} />
                <directionalLight position={lightConfig.directionalPosition} intensity={lightConfig.directionalIntensity} />
                <pointLight 
                    position={lightConfig.pointLight1.position} 
                    intensity={lightConfig.pointLight1.intensity} 
                    color={lightConfig.pointLight1.color} 
                />
                <pointLight 
                    position={lightConfig.pointLight2.position} 
                    intensity={lightConfig.pointLight2.intensity} 
                    color={lightConfig.pointLight2.color} 
                />
                <spotLight 
                    position={lightConfig.spotlight.position} 
                    intensity={lightConfig.spotlight.intensity} 
                    angle={lightConfig.spotlight.angle} 
                    penumbra={lightConfig.spotlight.penumbra} 
                    color={lightConfig.spotlight.color} 
                />

                {/* Render blobs */}
                {blobs.map((b, i) => {
                    if (b.label) {
                        console.log(`[Render] Blob ${i} has label "${b.label}", showLabel:`, labelConfig.show);
                    }
                    return (
                        <Blob 
                            key={i} 
                            position={b.pos} 
                            speed={b.speed} 
                            distort={b.distort} 
                            color={b.color} 
                            label={b.label}
                            showLabel={labelConfig.show && b.layer !== 'background'}
                            parallaxStrength={b.parallaxStrength}
                            driftOffset={b.driftOffset}
                            driftSpeed={b.driftSpeed}
                            scrollOffset={scrollY}
                        />
                    );
                })}

                {/* Connect nearby blobs with lines (limit to foreground/midground) */}
                {blobs
                    .filter(b => b.layer !== 'background')
                    .map((b1, i) =>
                        blobs
                            .filter(b => b.layer !== 'background')
                            .map((b2, j) => {
                                if (i < j) {
                                    const dist = new Vector3(...b1.pos).distanceTo(new Vector3(...b2.pos));
                                    if (dist < maxDistance * 0.8) {
                                        return <ConnectionLine key={`${i}-${j}`} start={b1.pos} end={b2.pos} />;
                                    }
                                }
                                return null;
                            })
                    )}

                <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />

                <EffectComposer>
                    <Bloom 
                        luminanceThreshold={effectsConfig.bloom.luminanceThreshold} 
                        luminanceSmoothing={effectsConfig.bloom.luminanceSmoothing} 
                        intensity={effectsConfig.bloom.intensity} 
                        height={effectsConfig.bloom.height} 
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}