"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useTexture,
  OrbitControls,
  PerspectiveCamera,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

import img from "../assets/Frame 1.png";
import pic from "../assets/model.webp";

export default function Scene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        style={{ width: "100%", height: "100%" }}
        camera={{ fov: isMobile ? 75 : 65, position: [0, 0, 12] }}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <SceneContent isMobile={isMobile} />
      </Canvas>
    </div>
  );
}

function SceneContent({ isMobile }) {
  const cyl = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const { gl } = useThree();

  const tex = useTexture(img);
  const modelTex = useTexture(pic);

  useEffect(() => {
    if (!tex) return;
    tex.encoding = THREE.sRGBEncoding;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.anisotropy = gl.capabilities.getMaxAnisotropy();
    tex.needsUpdate = true;
  }, [tex, gl]);

  useEffect(() => {
    if (!modelTex) return;
    modelTex.encoding = THREE.sRGBEncoding;
    modelTex.generateMipmaps = false;
    modelTex.minFilter = THREE.LinearFilter;
    modelTex.magFilter = THREE.LinearFilter;
    modelTex.anisotropy = gl.capabilities.getMaxAnisotropy();
    modelTex.needsUpdate = true;
  }, [modelTex, gl]);

  useFrame((_, dt) => {
    if (cyl.current && !isDragging) {
      cyl.current.rotation.y += dt * 0.2;
    }
    if (cyl.current) {
      const targetScale = isHovered || isDragging ? 1.1 : 1;
      cyl.current.scale.set(
        THREE.MathUtils.lerp(cyl.current.scale.x, targetScale, 0.006),
        THREE.MathUtils.lerp(cyl.current.scale.y, targetScale, 0.006),
        THREE.MathUtils.lerp(cyl.current.scale.z, targetScale, 0.006)
      );
    }
  });

  const handlePointerDown = (e) => {
    if (isMobile) return; // 🛑 Disable dragging on mobile
    setIsDragging(true);
    setDragStartX(e.clientX || e.touches?.[0]?.clientX || 0);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || isMobile) return; // 🛑 Prevent drag logic on mobile
    const deltaX = (e.clientX || e.touches?.[0]?.clientX || 0) - dragStartX;
    if (cyl.current) {
      cyl.current.rotation.y = THREE.MathUtils.lerp(
        cyl.current.rotation.y,
        rotationY + deltaX * 0.01,
        0.3
      );
    }
  };

  const handlePointerUp = () => {
    if (isMobile) return; // 🛑 Prevent drag logic on mobile
    if (cyl.current) {
      setRotationY(cyl.current.rotation.y);
    }
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, dragStartX, isMobile]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={isMobile ? 75 : 65}
        position={[0, 0, 5.2]}
      />

      <mesh
        position={isMobile ? [0, -1.4, -0.3] : [0, -0.4, -0.2]}
        renderOrder={999}
        raycast={null}
      >
        <planeGeometry args={isMobile ? [3.15, 6.3] : [3.3, 6.6]} />
        <meshBasicMaterial
          visible={true}
          map={modelTex}
          alphaTest={0.01}
        />
      </mesh>

      <group>
        <mesh
          ref={cyl}
          rotation={[0, 0, 0.3]}
          position={isMobile ? [0, -1.6, 0] : [0, -0.9, 0]}
          onPointerOver={() => setIsHovered(isMobile ? false : true)}
          onPointerOut={() => setIsHovered(false)}
          onPointerDown={handlePointerDown}
          onTouchStart={handlePointerDown}
        >
          <cylinderGeometry
            args={
              isMobile
                ? [1.78, 1.78, 1.6, 100, 100, true]
                : [1.8, 1.8, 1.55, 120, 120, true]
            }
          />
          <meshBasicMaterial
            map={tex}
            wireframe={false}
            side={THREE.DoubleSide}
            transparent={true}
            premultipliedAlpha
          />
        </mesh>
      </group>

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.5}
        width={10}
        height={10}
        blur={2}
        far={4}
      />
    </>
  );
}
