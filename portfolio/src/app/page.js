"use client";
import Experience from "@/components/Experience";
import Lights from "@/components/Lights";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import * as THREE from "three";

function CameraDebugger() {
  const { camera } = useThree();

 


  useFrame(() => {
    console.log("Camera position:", camera.position);
    console.log("Camera rotation:", camera.rotation);
  });

  return null;
}

export default function Home() {
  
  const [isNight, setIsNight] = useState(false);

  const toggleDayNight = () => setIsNight(!isNight);
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
          <Experience isNight={isNight}/>
         
          
        </Physics>
      </Canvas>

      <div className="absolute top-5 left-5 z-10">
      <button
  className="px-4 py-2  text-white rounded text-xl"
  onClick={toggleDayNight}
>
   {isNight ? <Sun /> : <Moon />}
</button>
      </div>
    </>
  );
}
