
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useTexture,
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

import img from "../assets/works.png";
import pic from "../assets/model.webp";

export default function Scene() {
  const [isMobile, setIsMobile] = useState(false);

  // Track mobile breakpoint
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (

    <div className="w-full h-full pointer-events-none relative "> 
      <Canvas 
        shadows
        className="!pointer-events-none "           
        style={{ width: "100%", height: "100%" }}
        camera={{ fov: isMobile ? 75 : 65, position: [0, 0, 12] }}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        onCreated={({ gl, camera }) => {
          // clamp device pixel ratio
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          // resize handling
          const onResize = () => {
            gl.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
          };
          window.addEventListener("resize", onResize);
          return () => window.removeEventListener("resize", onResize);
        }}
      >
        <SceneContent isMobile={isMobile} />

      </Canvas>
    </div>
  );
}

function SceneContent({ isMobile }) {
  const cyl = useRef();
  const { gl } = useThree();

  // Video texture
  
  // const video = document.createElement('video');
  // video.src = img;
  // video.crossOrigin = 'anonymous';
  // video.loop = true;
  // video.muted = true;
  // video.play();

  // const tex = new THREE.Texture(video);
  const tex = useTexture(img);

  useEffect(() => {
    if (!tex) return;
    tex.encoding = THREE.sRGBEncoding;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    tex.anisotropy = gl.capabilities.getMaxAnisotropy();
    tex.needsUpdate = true;
  }, [tex, gl]);

  // Image texture
  const modelTex = useTexture(pic);

  useEffect(() => {
    if (!modelTex) return;
    modelTex.encoding = THREE.sRGBEncoding;
    modelTex.generateMipmaps = false; // turn off all mip levels
    modelTex.minFilter = THREE.LinearFilter; // pick the exact pixel
    modelTex.magFilter = THREE.LinearFilter;
    modelTex.anisotropy = gl.capabilities.getMaxAnisotropy();
    modelTex.needsUpdate = true;
  }, [modelTex, gl]);

  // Spin cylinder
  useFrame((_, dt) => {
    if (cyl.current) cyl.current.rotation.y += dt * 0.2;
  });

  return (
    <>
      {/* Lighting & Shadows */}
      {/* <Environment preset="city" alpha={true} /> */}

      {/* <RandomizedLight
          amount={8}
          radius={2}
          intensity={0.4}
          ambient={0.5}
          position={[5, 10, -10]}
        /> */}

      {/* </AccumulativeShadows> */}

      {/* Camera & Controls */}
      <PerspectiveCamera
        makeDefault
        fov={isMobile ? 75 : 65}
        position={[0, 0, 5.2]}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        minDistance={5.5}
        maxDistance={5.5}
      />

      {/* Image Plane (transparent PNG) */}
      <mesh
        position={isMobile ? [0, -1.4, -0.3] : [0, -0.4, -0.2]}
        renderOrder={999}
      >
        {/* Adjust these args to your image's aspect ratio */}
        <planeGeometry args={isMobile ? [3, 6.2] : [3.3, 6.6]} />
        <meshBasicMaterial
          visible={true}
          map={modelTex}
          alphaTest={0.01} // cut out fully transparent pixels
        />
      </mesh>

      {/* Spinning Cylinder original  */}
      <mesh
        ref={cyl}
        rotation={[0, 0, 0.3]}
        position={isMobile ? [0, -1.6, 0] : [0, -0.9, 0]}
      >
        <cylinderGeometry args={ isMobile ? [1.8, 1.8, 1.5, 100, 100, true] : [1.8,1.8, 1.5, 120, 120, true] } />
        <meshBasicMaterial
          map={tex}
          wireframe={true}
          side={THREE.DoubleSide}
          transparent={true}   
          premultipliedAlpha
        />
      </mesh>


      {/* Contact Shadow under everything */}
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

