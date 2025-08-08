"use client"
import Experience from "@/components/Experience";
import Lights from "@/components/Lights";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
   <>
     <Canvas>
      <Lights />
        <Experience />
     </Canvas>
   </>
  );
}
