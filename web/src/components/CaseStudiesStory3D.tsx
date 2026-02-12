"use client";

import Link from "next/link";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Float, PerspectiveCamera, Stars, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowRight, BarChart3, Target, TrendingUp, Users } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SplitTextProps = {
  children: string;
  className?: string;
};

function SplitText({ children, className }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chars = children.split("");

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const elements = Array.from(containerRef.current.querySelectorAll(".story-char"));
    const ctx = gsap.context(() => {
      gsap.from(elements, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.02,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ display: "inline-block" }}>
      {chars.map((char, i) => (
        <span key={i} className="story-char inline-block" style={{ whiteSpace: "pre" }}>
          {char}
        </span>
      ))}
    </div>
  );
}

function WireframeBuilding({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  const preparedScene = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 1);
    const scale = 10 / maxDim;

    cloned.scale.set(scale, scale, scale);
    cloned.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#ffffff",
          metalness: 0.8,
          roughness: 0.2,
          wireframe: true,
          opacity: 0.38,
          transparent: true,
        });
      }
    });
    cloned.updateMatrixWorld(true);
    return cloned;
  }, [scene]);

  return <primitive object={preparedScene} />;
}

function PlaceholderModel() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 8, 4]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} wireframe />
      </mesh>
    </Float>
  );
}

function BackgroundImage() {
  const texture = useLoader(THREE.TextureLoader, "/bg-screenshot.png");

  return (
    <mesh position={[0, 0, -15]} scale={[50, 30, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent opacity={0.08} color="#ffffff" />
    </mesh>
  );
}

type VectorRef = MutableRefObject<THREE.Vector3>;

type CameraPreset = {
  camera: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
};

type ViewportTier = "mobile" | "tablet" | "desktop";

type CameraRigConfig = {
  fov: number;
  lerp: number;
  presets: CameraPreset[];
};

const CAMERA_RIGS: Record<ViewportTier, CameraRigConfig> = {
  mobile: {
    fov: 54,
    lerp: 0.07,
    presets: [
      { camera: { x: 1.0, y: 2.2, z: 12.8 }, target: { x: 0, y: 0.55, z: 0 } },
      { camera: { x: 0.4, y: 2.9, z: 11.6 }, target: { x: 0, y: 0.72, z: 0 } },
      { camera: { x: -0.8, y: 2.4, z: 10.4 }, target: { x: 0, y: 0.76, z: 0 } },
      { camera: { x: -0.3, y: 2.0, z: 9.3 }, target: { x: 0, y: 0.68, z: 0 } },
      { camera: { x: 0.1, y: 1.7, z: 8.3 }, target: { x: 0, y: 0.58, z: 0 } },
    ],
  },
  tablet: {
    fov: 50,
    lerp: 0.078,
    presets: [
      { camera: { x: 1.8, y: 2.3, z: 11.6 }, target: { x: 0, y: 0.55, z: 0 } },
      { camera: { x: 0.7, y: 3.1, z: 10.3 }, target: { x: 0, y: 0.78, z: 0 } },
      { camera: { x: -1.4, y: 2.5, z: 9.2 }, target: { x: 0, y: 0.8, z: 0 } },
      { camera: { x: -0.5, y: 2.1, z: 8.3 }, target: { x: 0, y: 0.7, z: 0 } },
      { camera: { x: 0.15, y: 1.7, z: 7.5 }, target: { x: 0, y: 0.58, z: 0 } },
    ],
  },
  desktop: {
    fov: 46,
    lerp: 0.085,
    presets: [
      { camera: { x: 2.4, y: 2.4, z: 10.8 }, target: { x: 0, y: 0.56, z: 0 } },
      { camera: { x: 1.0, y: 3.0, z: 9.5 }, target: { x: 0, y: 0.82, z: 0 } },
      { camera: { x: -1.8, y: 2.6, z: 8.4 }, target: { x: 0, y: 0.86, z: 0 } },
      { camera: { x: -0.6, y: 2.1, z: 7.5 }, target: { x: 0, y: 0.76, z: 0 } },
      { camera: { x: 0.2, y: 1.7, z: 6.8 }, target: { x: 0, y: 0.64, z: 0 } },
    ],
  },
};

function getViewportTier(width: number): ViewportTier {
  if (width < 768) return "mobile";
  if (width < 1200) return "tablet";
  return "desktop";
}

type SceneContentProps = {
  cameraAnimRef: VectorRef;
  targetAnimRef: VectorRef;
  fov: number;
  lerp: number;
  initialCamera: CameraPreset["camera"];
};

function SceneContent({ cameraAnimRef, targetAnimRef, fov, lerp, initialCamera }: SceneContentProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { set } = useThree();

  useEffect(() => {
    if (cameraRef.current) set({ camera: cameraRef.current });
  }, [set]);

  useEffect(() => {
    if (!cameraRef.current) return;
    cameraRef.current.fov = fov;
    cameraRef.current.updateProjectionMatrix();
  }, [fov]);

  useFrame(() => {
    if (!cameraRef.current) return;
    cameraRef.current.position.lerp(cameraAnimRef.current, lerp);
    cameraRef.current.lookAt(targetAnimRef.current);
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={fov}
        near={0.1}
        far={100}
        position={[initialCamera.x, initialCamera.y, initialCamera.z]}
      />
      <ambientLight intensity={0.35} />
      <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-5, 5, -5]} intensity={1.0} color="#d2d2d2" distance={20} />
      <Stars radius={100} depth={200} count={2200} factor={4} saturation={0} fade speed={1} />
      <fog attach="fog" args={["#000000", 5, 50]} />

      <Suspense fallback={null}>
        <BackgroundImage />
      </Suspense>

      <Suspense fallback={<PlaceholderModel />}>
        <WireframeBuilding url="/space_boi.glb" />
      </Suspense>

      <gridHelper args={[40, 40, "#9a9a9a", "#252525"]} position={[0, -5, 0]} />
    </>
  );
}

type CaseStudiesStory3DProps = {
  routeTag: string;
};

export function CaseStudiesStory3D({ routeTag }: CaseStudiesStory3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const [viewportTier, setViewportTier] = useState<ViewportTier>("desktop");
  const rig = CAMERA_RIGS[viewportTier];
  const initialPreset = rig.presets[0];
  const cameraAnimRef = useRef(
    new THREE.Vector3(initialPreset.camera.x, initialPreset.camera.y, initialPreset.camera.z),
  );
  const targetAnimRef = useRef(
    new THREE.Vector3(initialPreset.target.x, initialPreset.target.y, initialPreset.target.z),
  );

  useEffect(() => {
    const updateTier = () => {
      const next = getViewportTier(window.innerWidth);
      setViewportTier((prev) => (prev === next ? prev : next));
    };

    updateTier();
    window.addEventListener("resize", updateTier);
    return () => window.removeEventListener("resize", updateTier);
  }, []);

  useLayoutEffect(() => {
    const first = rig.presets[0];
    cameraAnimRef.current.set(first.camera.x, first.camera.y, first.camera.z);
    targetAnimRef.current.set(first.target.x, first.target.y, first.target.z);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const setProgressWidth = gsap.quickSetter(progressRef.current, "width", "%");
      const setProgressText = (text: string) => {
        if (progressTextRef.current) progressTextRef.current.innerText = text;
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          onUpdate: (self) => {
            const progress = self.progress * 100;
            setProgressWidth(progress);
            setProgressText(`${Math.round(progress)}%`);
          },
        },
      });

      rig.presets.forEach((preset, index) => {
        timeline.to(
          cameraAnimRef.current,
          {
            x: preset.camera.x,
            y: preset.camera.y,
            z: preset.camera.z,
            duration: 1,
            ease: "sine.inOut",
          },
          index,
        );
        timeline.to(
          targetAnimRef.current,
          {
            x: preset.target.x,
            y: preset.target.y,
            z: preset.target.z,
            duration: 1,
            ease: "sine.inOut",
          },
          index,
        );
      });
    }, containerRef);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, [rig]);

  return (
    <main className="landing-shell min-h-screen">
      <div className="fixed inset-0 z-0">
        <Canvas gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}>
          <SceneContent
            cameraAnimRef={cameraAnimRef}
            targetAnimRef={targetAnimRef}
            fov={rig.fov}
            lerp={rig.lerp}
            initialCamera={initialPreset.camera}
          />
        </Canvas>
      </div>

      <div className="fixed left-0 top-0 z-50 flex w-full items-start justify-between p-6 pointer-events-none">
        <div className="font-display font-bold tracking-widest text-white">
          MIDAS CREATIVE
          <span className="block text-xs uppercase text-zinc-200/80">Case Study Engine</span>
          <span className="block text-[10px] uppercase text-white/45">{routeTag}</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
          <Link
            href="/"
            className="rounded-full border border-white/20 bg-black/60 px-4 py-2 text-white hover:border-white"
          >
            Home
          </Link>
          <Link
            href="/case-studies"
            className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-zinc-100 hover:bg-white/20"
          >
            /case-studies
          </Link>
          <span ref={progressTextRef} className="w-10 text-right font-mono text-sm text-white">
            000%
          </span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-50 h-1 w-full bg-white/10">
        <div ref={progressRef} className="landing-progress landing-shadow-soft h-full w-0" />
      </div>

      <div ref={containerRef} className="relative z-10 w-full">
        <section className="flex h-screen items-center p-12 lg:p-24 pointer-events-none">
          <div className="max-w-3xl">
            <div className="mb-6 inline-block rounded-full border border-white/30 bg-black/80 px-3 py-1 text-xs font-mono text-zinc-100 backdrop-blur-md">
              CASE_STUDIES_ACTIVE
            </div>
            <h1 className="mb-8 text-6xl font-display font-bold leading-none md:text-8xl">
              <SplitText>Case Study</SplitText>
              <br />
              <SplitText className="landing-gradient-text">
                Universe
              </SplitText>
            </h1>
            <p className="max-w-xl rounded-lg border-l-2 border-white/30 bg-black/65 p-6 text-xl text-slate-300">
              Explore how we transformed brand strategy, creative systems, and performance channels into measurable
              revenue outcomes.
            </p>
          </div>
        </section>

        <section className="flex h-screen items-center justify-end p-12 lg:p-24 pointer-events-none">
          <div className="max-w-2xl text-right">
            <div className="mb-6 flex justify-end">
              <Users className="h-12 w-12 text-zinc-200" />
            </div>
            <h2 className="mb-6 text-5xl font-display font-bold">
              <SplitText>Audience</SplitText>
              <br />
              <SplitText>Repositioning</SplitText>
            </h2>
            <p className="inline-block rounded-lg border-r-2 border-white/30 bg-black/65 p-6 text-lg text-slate-300">
              B2B and DTC campaigns were rebuilt around buyer intent signals, reducing wasted spend and increasing
              sales-qualified pipeline velocity.
            </p>
          </div>
        </section>

        <section className="flex h-screen items-center justify-center p-12 text-center pointer-events-none">
          <div className="max-w-3xl">
            <TrendingUp className="mx-auto mb-8 h-16 w-16 text-zinc-200" />
            <h2 className="mb-8 text-6xl font-display font-bold">
              <SplitText>Measured</SplitText>
              <br />
              <SplitText>Performance</SplitText>
            </h2>
            <div className="mx-auto grid max-w-xl grid-cols-2 gap-4 rounded-2xl border border-white/25 bg-black/75 p-8 text-left">
              <div>
                <span className="block text-xs uppercase tracking-widest text-slate-500">Pipeline Growth</span>
                <span className="font-mono text-2xl text-white">+212%</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-slate-500">Blended ROAS</span>
                <span className="font-mono text-2xl text-white">4.7x</span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex h-screen items-center p-12 lg:p-24 pointer-events-none">
          <div className="max-w-3xl">
            <BarChart3 className="mb-6 h-12 w-12 text-zinc-200" />
            <h2 className="mb-8 text-5xl font-display font-bold">
              <SplitText>Launch Your</SplitText>
              <br />
              <SplitText>Next Case</SplitText>
            </h2>
            <p className="mb-8 text-xl text-slate-300">
              Study the wins, then build your own. Move from static marketing to a system that converts attention into
              predictable revenue.
            </p>
            <div className="pointer-events-auto flex flex-wrap gap-4">
              <Link
                href="/case-studies"
                className="landing-gradient-fill inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold uppercase tracking-tight hover:brightness-110"
              >
                Open /case-studies
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="rounded-full border border-white/30 bg-black/70 px-8 py-4 font-bold uppercase tracking-tight text-white hover:border-white"
              >
                Back Home
              </Link>
            </div>
          </div>
        </section>

        <section className="flex h-screen items-center justify-center p-12 pointer-events-none">
          <div className="max-w-3xl text-center">
            <Target className="mx-auto mb-6 h-12 w-12 text-zinc-200" />
            <h2 className="mb-6 text-5xl font-display font-bold">
              <SplitText>Ready For</SplitText>
              <br />
              <SplitText>Similar Results</SplitText>
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
              If you want this exact execution style for your brand, use the case studies as a blueprint for your next
              growth sprint.
            </p>
            <Link
              href="/case-studies"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-semibold text-zinc-100 hover:bg-white/20"
            >
              View All Case Studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

useGLTF.preload("/space_boi.glb");
