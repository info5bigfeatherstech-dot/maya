"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import * as d3 from "d3-geo";
import * as topojson from "topojson-client";
import worldData from "world-atlas/countries-110m.json";
import { RotateCcw, ZoomIn, ZoomOut, Check } from "lucide-react";

export interface PresenceCategory {
  id: string;
  name: string;
  color: string;
  active: boolean;
  countryIds: string[];
  description: string;
  stats?: string;
}

interface Interactive3DGlobeProps {
  categories: PresenceCategory[];
  onToggleCategory: (id: string) => void;
  hoveredCategory?: string | null;
}

// Map ISO 3166-1 numeric IDs to readable country names
export const COUNTRY_NAMES: Record<string, string> = {
  "840": "United States",
  "124": "Canada",
  "826": "United Kingdom",
  "276": "Germany",
  "724": "Spain",
  "250": "France",
  "380": "Italy",
  "528": "Netherlands",
  "620": "Portugal",
  "792": "Turkey",
  "818": "Egypt",
  "784": "United Arab Emirates",
  "682": "Saudi Arabia",
  "156": "China",
  "036": "Australia",
  "554": "New Zealand",
  "392": "Japan",
  "410": "South Korea",
  "704": "Vietnam",
  "050": "Bangladesh",
  "356": "India",
  "578": "Norway",
  "752": "Sweden",
  "208": "Denmark",
  "360": "Indonesia",
  "586": "Pakistan",
  "116": "Cambodia",
};

export default function Interactive3DGlobe({
  categories,
  onToggleCategory,
  hoveredCategory,
}: Interactive3DGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Initial rotation: Orient Europe, Africa, Middle East and Atlantic front & center matching reference screenshot
  // In our coordinates: targetRotationRef.y = -1.2 places Europe/UK top-center, Africa center, USA left, Turkey/China right!
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.28, y: -1.25 });
  const currentRotationRef = useRef<{ x: number; y: number }>({ x: 0.28, y: -1.25 });
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);
  const lastInteractionTimeRef = useRef(Date.now());
  const cameraDistanceRef = useRef(230);

  // Extract TopoJSON country features
  const countryFeatures = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const atlas = worldData as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countries = topojson.feature(atlas, atlas.objects.countries) as any;
    return countries.features || [];
  }, []);

  // Redraw the 2D Equirectangular Map Canvas when categories change
  const renderMapCanvas = useCallback(() => {
    let mapCanvas = mapCanvasRef.current;
    if (!mapCanvas) {
      mapCanvas = document.createElement("canvas");
      mapCanvas.width = 2048;
      mapCanvas.height = 1024;
      mapCanvasRef.current = mapCanvas;
    }

    const ctx = mapCanvas.getContext("2d");
    if (!ctx) return;

    const width = mapCanvas.width;
    const height = mapCanvas.height;

    // D3 Equirectangular projection
    const projection = d3.geoEquirectangular().fitSize([width, height], { type: "Sphere" });
    const pathGenerator = d3.geoPath(projection, ctx);

    // 1. Draw Ocean (clean very soft pearl-gray / off-white matching reference image)
    ctx.fillStyle = "#ECEFF2";
    ctx.fillRect(0, 0, width, height);

    // 2. Build active country-to-color lookup
    const countryColorMap: Record<string, string> = {};

    // Apply categories in sequence so active ones paint
    categories.forEach((cat) => {
      if (cat.active) {
        cat.countryIds.forEach((cId) => {
          countryColorMap[cId] = cat.color;
        });
      }
    });

    // If a category is temporarily hovered, give it visual priority
    if (hoveredCategory) {
      const hCat = categories.find((c) => c.id === hoveredCategory);
      if (hCat) {
        hCat.countryIds.forEach((cId) => {
          countryColorMap[cId] = hCat.color;
        });
      }
    }

    // 3. Draw All Countries
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    countryFeatures.forEach((feature: any) => {
      const cId = String(feature.id).padStart(3, "0");
      const altId = String(feature.id);
      const highlightColor = countryColorMap[cId] || countryColorMap[altId];

      ctx.beginPath();
      pathGenerator(feature);

      if (highlightColor) {
        // Highlighted country in solid color matching user's reference image
        ctx.fillStyle = highlightColor;
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.0;
        ctx.stroke();
      } else {
        // Inactive continent landmass in clean neutral light gray
        ctx.fillStyle = "#D2D8DF";
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 0.65;
        ctx.stroke();
      }
    });

    // Update Three.js Texture
    if (textureRef.current) {
      textureRef.current.needsUpdate = true;
    }
  }, [categories, countryFeatures, hoveredCategory]);

  // Trigger texture redraw when categories or hover change
  useEffect(() => {
    renderMapCanvas();
  }, [renderMapCanvas]);

  // Setup Three.js 3D Scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 580;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.z = cameraDistanceRef.current;
    cameraRef.current = camera;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const globeRadius = 78;

    // 3. Create Canvas Texture for 3D Sphere
    renderMapCanvas();
    const mapCanvas = mapCanvasRef.current;
    if (!mapCanvas) return;

    const texture = new THREE.CanvasTexture(mapCanvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    textureRef.current = texture;

    // 4. Globe Sphere Mesh with shaded 3D standard material
    const globeGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.65,
      metalness: 0.02,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Subtle outer halo to blend cleanly with light background
    const haloGeo = new THREE.SphereGeometry(globeRadius * 1.008, 64, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    globeGroup.add(haloMesh);

    // 5. Lighting matching reference image (light source from top-left, soft bottom-right shadow)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.88);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(-110, 110, 140); // Top-left front lighting
    scene.add(dirLight);

    const softFillLight = new THREE.DirectionalLight(0xe8edf2, 0.4);
    softFillLight.position.set(100, -80, -60);
    scene.add(softFillLight);

    // 6. Mouse Drag & Touch Rotation
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      autoRotateRef.current = false;
      lastInteractionTimeRef.current = Date.now();
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.0055;
      targetRotationRef.current.x = Math.max(-0.85, Math.min(0.85, targetRotationRef.current.x + deltaY * 0.0055));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      lastInteractionTimeRef.current = Date.now();
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      lastInteractionTimeRef.current = Date.now();
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        autoRotateRef.current = false;
        lastInteractionTimeRef.current = Date.now();
        previousMousePositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.0065;
      targetRotationRef.current.x = Math.max(-0.85, Math.min(0.85, targetRotationRef.current.x + deltaY * 0.0065));

      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      lastInteractionTimeRef.current = Date.now();
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      lastInteractionTimeRef.current = Date.now();
    };

    // Zoom on wheel (optional gentle zoom)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newDist = Math.max(170, Math.min(320, cameraDistanceRef.current + e.deltaY * 0.15));
      cameraDistanceRef.current = newDist;
      if (cameraRef.current) {
        cameraRef.current.position.z = newDist;
      }
      lastInteractionTimeRef.current = Date.now();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    // 7. Resize Observer
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 580;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Auto-resume continuous rotation after 4 seconds of idle
      if (!isDraggingRef.current && Date.now() - lastInteractionTimeRef.current > 4000) {
        autoRotateRef.current = true;
      }

      if (autoRotateRef.current && !isDraggingRef.current) {
        targetRotationRef.current.y += 0.0016; // smooth continuous orbit
      }

      // Smooth damping interpolation
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.x = currentRotationRef.current.x;
        globeGroupRef.current.rotation.y = currentRotationRef.current.y;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("wheel", handleWheel);
      renderer.dispose();
      texture.dispose();
    };
  }, [renderMapCanvas]);

  // Zoom controls
  const handleZoom = (delta: number) => {
    const newDist = Math.max(170, Math.min(320, cameraDistanceRef.current + delta));
    cameraDistanceRef.current = newDist;
    if (cameraRef.current) {
      cameraRef.current.position.z = newDist;
    }
  };

  const handleResetView = () => {
    targetRotationRef.current = { x: 0.28, y: -1.25 };
    cameraDistanceRef.current = 230;
    if (cameraRef.current) {
      cameraRef.current.position.z = 230;
    }
    autoRotateRef.current = true;
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[680px] flex items-center justify-center select-none overflow-visible">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Floating Interactive Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={handleResetView}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-sm border border-slate-200 text-xs font-medium transition-all"
          title="Reset globe view to Europe/Atlantic"
        >
          <RotateCcw className="w-3.5 h-3.5 text-brand-blue" />
          <span className="hidden sm:inline">Reset</span>
        </button>
        <button
          onClick={() => handleZoom(-30)}
          className="p-1.5 rounded bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-sm border border-slate-200 text-xs transition-all"
          title="Zoom in"
        >
          <ZoomIn className="w-3.5 h-3.5 text-slate-600" />
        </button>
        <button
          onClick={() => handleZoom(30)}
          className="p-1.5 rounded bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-sm border border-slate-200 text-xs transition-all"
          title="Zoom out"
        >
          <ZoomOut className="w-3.5 h-3.5 text-slate-600" />
        </button>
      </div>

      {/* Drag Hint */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none px-3 py-1 rounded bg-white/80 backdrop-blur-sm border border-slate-200/80 text-[11px] text-slate-500 shadow-xs">
        <span>Click & drag to rotate globe</span>
      </div>
    </div>
  );
}
