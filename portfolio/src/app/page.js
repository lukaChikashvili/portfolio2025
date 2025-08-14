"use client"
import Experience from "@/components/Experience";
import Header from "@/components/Header";
import Lights from "@/components/Lights";
import { Html } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

import * as THREE from 'three'

function CameraDebugger() {
  const { camera } = useThree()

  useFrame(() => {
    console.log('Camera position:', camera.position)
    console.log('Camera rotation:', camera.rotation)
  })

  return null
}

export default function Home() {
  const [nightMode, setNightMode] = useState(true);
  return (
   <>
     <Canvas style={{ position: "fixed", inset: 0, zIndex: 0 }} camera={{ position: [-13, 15, 25], fov: 70, near: 0.1, far: 10000 }}
      shadows gl={{ physicallyCorrectLights: true }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2(0xcce0ff, 0.002) 
        scene.background = new THREE.Color(0xcce0ff)  
      }} >

    
        <Physics>
      <Lights nightMode={nightMode} />
    
        <Experience />
           <button onClick={() => setNightMode(!nightMode)}>click</button>
      
        </Physics>
       
     </Canvas>

   

 
  
    
   </>
  );
}
