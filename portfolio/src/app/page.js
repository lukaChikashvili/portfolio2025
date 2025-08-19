"use client";
import Experience from "@/components/Experience";
import Lights from "@/components/Lights";
import { Canvas, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Moon, Sun } from "lucide-react";
import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import gsap from "gsap";


const CameraController = forwardRef((props, ref) => {
  const { camera } = useThree();

  useImperativeHandle(ref, () => ({
    resetCamera: () => {
      gsap.to(camera.position, {
        x: 18,
        y: 15,
        z: -45,
        duration: 1.5,
        ease: "power2.inOut",
      });
    },
    moveTo: (x, y, z, duration = 1.5) => {
      gsap.to(camera.position, { x, y, z, duration, ease: "power2.inOut" });
    },
    getCamera: () => camera,
  }));

  return null;
});

export default function Home() {
  const [isNight, setIsNight] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const descRef = useRef();
  const cameraRef = useRef();

  const toggleDayNight = () => setIsNight(!isNight);

  const closeOverlay = () => {
    setShowOverlay(false);
    cameraRef.current?.resetCamera();
  };

  return (
    <>
      <Canvas
        style={{ position: "fixed", inset: 0, zIndex: 0 }}
        camera={{ position: [-13, 15, 25], fov: 70, near: 0.1, far: 10000 }}
        shadows
        gl={{ physicallyCorrectLights: true }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color(isNight ? 0x0a0a2a : 0xcce0ff);
          scene.fog = new THREE.FogExp2(isNight ? 0x0a0a2a : 0xcce0ff, isNight ? 0.002 : 0.001);
        }}
      >
        <Physics>
          <Lights isNight={isNight} />
          <Experience
            isNight={isNight}
            descRef={descRef}
            onShowOverlay={() => setShowOverlay(true)}
            cameraRef={cameraRef}
          />
          <CameraController ref={cameraRef} />
        </Physics>
      </Canvas>

      
      <div className="absolute top-5 left-5 z-10">
        <button className="px-4 py-2 text-white rounded text-xl" onClick={toggleDayNight}>
          {isNight ? <Sun /> : <Moon />}
        </button>
      </div>

  
      {showOverlay && (
        <div className="absolute top-5 left-5 z-10 glass w-[90%] h-[90%] mt-8 ml-16 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white bg-black/40 px-3 py-1 rounded"
            onClick={closeOverlay}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
