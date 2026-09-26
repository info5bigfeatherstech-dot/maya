"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import * as d3 from "d3-geo";
import * as topojson from "topojson-client";
import worldData from "world-atlas/countries-110m.json";

export interface PresenceCategory {
  id: string;
  name: string;
  countSubtitle: string;
  color: string;
  countryIds: string[];
  stats: string;
  description: string;
  countries: string[];
  moreCount?: number;
}

export interface GlobalHub {
  id: string;
  name: string;
  lat: number;
  lng: number;
  office: string;
  support: string;
  desk: string;
}

export const GLOBAL_HUBS: GlobalHub[] = [
  {
    id: "china",
    name: "China (HQ & Central Hub)",
    lat: 24.7345,
    lng: 118.6666,
    office: "Fujian Central Warehouse",
    support: "Xiamen Port Staging",
    desk: "PRC Direct Export Hub",
  },
  {
    id: "usa",
    name: "United States (Export)",
    lat: 40.7128,
    lng: -74.006,
    office: "NY & Long Beach Ports",
    support: "DDP / CIF Consignments",
    desk: "North America Market",
  },
  {
    id: "uk",
    name: "United Kingdom (Export)",
    lat: 51.5074,
    lng: -0.1278,
    office: "Felixstowe / London Port",
    support: "Customs Cleared Cargo",
    desk: "UK Retail Distribution",
  },
  {
    id: "germany",
    name: "Germany (EU Transit)",
    lat: 53.5511,
    lng: 9.9937,
    office: "Hamburg Port Gateway",
    support: "Bonded Cargo Transit",
    desk: "Central Europe Route",
  },
  {
    id: "spain",
    name: "Spain & Mediterranean",
    lat: 39.4699,
    lng: -0.3763,
    office: "Valencia Maritime Port",
    support: "Retail Garment Logistics",
    desk: "South Europe Gateway",
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    lat: 25.2048,
    lng: 55.2708,
    office: "Jebel Ali Container Port",
    support: "Transit & Re-Export Hub",
    desk: "Middle East Trade Route",
  },
];

interface Interactive3DGlobeProps {
  activeCategory: PresenceCategory;
  activeHubIndex: number;
  onSelectHub: (index: number) => void;
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
  activeCategory,
  activeHubIndex,
  onSelectHub,
}: Interactive3DGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const pinsGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Initial rotation (centered around Europe/UK)
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -1.35 });
  const currentRotationRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -1.35 });
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);
  const lastInteractionTimeRef = useRef(Date.now());
  const cameraDistanceRef = useRef(255);

  const globeRadius = 66;

  // Extract TopoJSON country features
  const countryFeatures = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const atlas = worldData as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countries = topojson.feature(atlas, atlas.objects.countries) as any;
    return countries.features || [];
  }, []);

  // Redraw the 2D Equirectangular Map Canvas
  const renderMapCanvas = useCallback(() => {
    let mapCanvas = mapCanvasRef.current;
    if (!mapCanvas) {
      mapCanvas = document.createElement("canvas");
      mapCanvas.width = 1024;
      mapCanvas.height = 512;
      mapCanvasRef.current = mapCanvas;
    }

    const ctx = mapCanvas.getContext("2d");
    if (!ctx) return;

    const width = mapCanvas.width;
    const height = mapCanvas.height;

    // D3 Equirectangular projection
    const projection = d3.geoEquirectangular().fitSize([width, height], { type: "Sphere" });
    const pathGenerator = d3.geoPath(projection, ctx);

    // 1. Ocean: soft light slate-gray tint matching reference image
    ctx.fillStyle = "#E4EAF1";
    ctx.fillRect(0, 0, width, height);

    // Subtle grid lines on ocean
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= width; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 2. Active country set
    const activeCountryIds = new Set(activeCategory.countryIds);

    // 3. Draw All Countries
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    countryFeatures.forEach((feature: any) => {
      const cId = String(feature.id).padStart(3, "0");
      const altId = String(feature.id);
      const isHighlighted = activeCountryIds.has(cId) || activeCountryIds.has(altId);

      ctx.beginPath();
      pathGenerator(feature);

      if (isHighlighted) {
        ctx.fillStyle = activeCategory.color || "#2563EB";
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 0.9;
        ctx.stroke();
      } else {
        ctx.fillStyle = "#CBD5E1"; // muted soft slate
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });

    if (textureRef.current) {
      textureRef.current.needsUpdate = true;
    }
  }, [activeCategory, countryFeatures]);

  // Redraw texture on category change
  useEffect(() => {
    renderMapCanvas();
  }, [renderMapCanvas]);

  // Rotate smoothly towards a given lat/lng
  const rotateTo = useCallback((lat: number, lng: number) => {
    const radLat = (lat * Math.PI) / 180;
    const radLng = (lng * Math.PI) / 180;
    targetRotationRef.current = {
      x: radLat * 0.65,
      y: -radLng - Math.PI / 2,
    };
    autoRotateRef.current = false;
    lastInteractionTimeRef.current = Date.now();
  }, []);

  // Update rotation whenever activeHubIndex changes
  useEffect(() => {
    const hub = GLOBAL_HUBS[activeHubIndex];
    if (hub) {
      rotateTo(hub.lat, hub.lng);
    }
  }, [activeHubIndex, rotateTo]);

  // Setup Three.js 3D Scene
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 520;

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

    // 4. Globe Sphere Mesh with gentle depth shading
    const globeGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.65,
      metalness: 0.05,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Subtle atmospheric glow / halo
    const haloGeo = new THREE.SphereGeometry(globeRadius * 1.01, 64, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    globeGroup.add(haloMesh);

    // 5. Orbital Wireframe Rings matching reference design
    const orbitalGroup = new THREE.Group();
    const curve1 = new THREE.EllipseCurve(
      0, 0,
      globeRadius * 1.38, globeRadius * 0.95,
      0, 2 * Math.PI,
      false,
      0
    );
    const points1 = curve1.getPoints(120);
    const geom1 = new THREE.BufferGeometry().setFromPoints(
      points1.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    const mat1 = new THREE.LineBasicMaterial({
      color: 0xbfdbfe,
      transparent: true,
      opacity: 0.55,
    });
    const line1 = new THREE.Line(geom1, mat1);
    line1.rotation.x = Math.PI / 3.4;
    line1.rotation.y = Math.PI / 5;
    orbitalGroup.add(line1);

    const curve2 = new THREE.EllipseCurve(
      0, 0,
      globeRadius * 1.48, globeRadius * 1.08,
      0, 2 * Math.PI,
      false,
      0
    );
    const points2 = curve2.getPoints(120);
    const geom2 = new THREE.BufferGeometry().setFromPoints(
      points2.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    const mat2 = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.35,
    });
    const line2 = new THREE.Line(geom2, mat2);
    line2.rotation.x = -Math.PI / 4.2;
    line2.rotation.y = -Math.PI / 6;
    orbitalGroup.add(line2);

    scene.add(orbitalGroup);

    // 6. 3D Pin Markers on Hubs (with animated blinking/pulsing beacons)
    const pinsGroup = new THREE.Group();
    globeGroup.add(pinsGroup);
    pinsGroupRef.current = pinsGroup;

    interface AnimatedPin {
      dotMesh: THREE.Mesh;
      dotMat: THREE.MeshBasicMaterial;
      ringMesh: THREE.Mesh;
      ringMat: THREE.MeshBasicMaterial;
      phaseOffset: number;
    }
    const animatedPins: AnimatedPin[] = [];

    GLOBAL_HUBS.forEach((hub, idx) => {
      const phi = (90 - hub.lat) * (Math.PI / 180);
      const theta = (hub.lng + 180) * (Math.PI / 180);
      const r = globeRadius * 1.015;
      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);

      // Pin core dot
      const pinGeo = new THREE.SphereGeometry(1.3, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: 0x2e9fc4, // Maya brand blue
        transparent: true,
        opacity: 0.95,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.set(x, y, z);
      pinsGroup.add(pinMesh);

      // Pin subtle outer halo ring (radar pulse wave)
      const ringGeo = new THREE.RingGeometry(1.6, 2.6, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8, // Sky Cyan
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(x, y, z);
      ringMesh.lookAt(new THREE.Vector3(x * 2, y * 2, z * 2));
      pinsGroup.add(ringMesh);

      animatedPins.push({
        dotMesh: pinMesh,
        dotMat: pinMat,
        ringMesh,
        ringMat,
        phaseOffset: idx * 0.15,
      });
    });

    // 7. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(-100, 120, 140);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.4);
    fillLight.position.set(100, -80, -60);
    scene.add(fillLight);

    // 8. Interaction Handlers (Mouse & Touch)
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
      targetRotationRef.current.x = Math.max(
        -0.85,
        Math.min(0.85, targetRotationRef.current.x + deltaY * 0.0055)
      );

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
      targetRotationRef.current.x = Math.max(
        -0.85,
        Math.min(0.85, targetRotationRef.current.x + deltaY * 0.0065)
      );

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

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 520;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // 10. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Auto-resume continuous orbit after 5s idle
      if (!isDraggingRef.current && Date.now() - lastInteractionTimeRef.current > 5000) {
        autoRotateRef.current = true;
      }

      if (autoRotateRef.current && !isDraggingRef.current) {
        targetRotationRef.current.y += 0.0014;
      }

      // Smooth interpolation
      currentRotationRef.current.x +=
        (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y +=
        (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.x = currentRotationRef.current.x;
        globeGroupRef.current.rotation.y = currentRotationRef.current.y;
      }

      // Animate blinking & radar pulse on hub pins
      const now = Date.now() * 0.001;
      animatedPins.forEach((pin) => {
        // 1. Radar wave ripple expansion and fade
        const cycle = (now * 0.85 + pin.phaseOffset) % 1;
        const ringScale = 1.0 + cycle * 1.8;
        pin.ringMesh.scale.set(ringScale, ringScale, ringScale);
        pin.ringMat.opacity = Math.max(0, (1 - cycle) * 0.85);

        // 2. Core dot blinking beacon pulse
        const blink = (Math.sin(now * 4 + pin.phaseOffset * 6) + 1) * 0.5;
        const dotScale = 0.85 + blink * 0.45;
        pin.dotMesh.scale.set(dotScale, dotScale, dotScale);
        pin.dotMat.opacity = 0.6 + blink * 0.4;
      });

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
      animatedPins.forEach((p) => {
        p.dotMat.dispose();
        p.ringMat.dispose();
        p.dotMesh.geometry.dispose();
        p.ringMesh.geometry.dispose();
      });
      renderer.dispose();
      texture.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] max-w-[560px] mx-auto flex items-center justify-center select-none overflow-visible">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}
