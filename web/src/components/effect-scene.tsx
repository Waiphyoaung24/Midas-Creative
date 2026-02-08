"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { EffectComposer } from "@react-three/postprocessing"
import * as THREE from "three"
import { AsciiEffect } from "./ascii-effect"

function VideoMesh() {
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "/video.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play().catch(err => console.error("Video play failed:", err));
    return vid;
  });

  return (
    <mesh scale={[16, 9, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh>
  );
}

export function EffectScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState(new THREE.Vector2(0, 0))
  const [resolution, setResolution] = useState(new THREE.Vector2(1920, 1080))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = rect.height - (e.clientY - rect.top)
        setMousePos(new THREE.Vector2(x, y))
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)

      const rect = container.getBoundingClientRect()
      setResolution(new THREE.Vector2(rect.width, rect.height))

      const handleResize = () => {
        const rect = container.getBoundingClientRect()
        setResolution(new THREE.Vector2(rect.width, rect.height))
      }
      window.addEventListener("resize", handleResize)

      return () => {
        container.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "#000000" }}
      >
        <color attach="background" args={["#000000"]} />
        
        <VideoMesh />

        {/* ASCII Effect with PostFX */}
        <EffectComposer>
          <AsciiEffect
            style="standard"
            cellSize={8}
            invert={false}
            color={true}
            resolution={resolution}
            mousePos={mousePos}
            postfx={{
              scanlineIntensity: 0.1,
              scanlineCount: 300,
              targetFPS: 0,
              jitterIntensity: 0,
              jitterSpeed: 1,
              mouseGlowEnabled: true,
              mouseGlowRadius: 250,
              mouseGlowIntensity: 0.8,
              vignetteIntensity: 0.5,
              vignetteRadius: 1.2,
              colorPalette: 0,
              curvature: 0.1,
              aberrationStrength: 0.002,
              noiseIntensity: 0.05,
              noiseScale: 1,
              noiseSpeed: 1,
              waveAmplitude: 0,
              waveFrequency: 10,
              waveSpeed: 1,
              glitchIntensity: 0,
              glitchFrequency: 0,
              brightnessAdjust: 0,
              contrastAdjust: 1.1,
            }}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
