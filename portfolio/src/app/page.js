"use client"
import Experience from "@/components/Experience";
import Lights from "@/components/Lights";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import * as THREE from 'three'

export default function Home() {
  return (
   <>
     <Canvas camera={{ position: [-20, 17, 20], fov: 70, near: 0.1, far: 10000 }}
      shadows gl={{ physicallyCorrectLights: true }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2(0xcce0ff, 0.002) 
        scene.background = new THREE.Color(0xcce0ff)  
      }} >
        <Physics>
      <Lights />
        <Experience />
        </Physics>
     </Canvas>
   </>
  );
}
