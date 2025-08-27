import { useGLTF, useTexture } from '@react-three/drei'
import React, { useRef } from 'react'
import Train from './Train'
import * as THREE from 'three'
import Skills from './Skills'
import gsap from 'gsap'

const Metro = () => {

  const tile = useTexture('./tile.jpg');


  tile.wrapS = THREE.ClampToEdgeWrapping;
  tile.wrapT = THREE.ClampToEdgeWrapping;
  tile.repeat.set(0, 1);

  // arrows
  const arrow = useGLTF('./arrow.glb');

  const trainRef = useRef();


  // animate train
  const moveTrain = (distance) => {
    gsap.to(trainRef.current.position, {
      x: trainRef.current.position.x + distance, 
      duration: 0.5,
      ease: "power2.out"
    });
  }

  return (
    <>
      
            <group position={[0, -29, 0]}>
      {/* Floor */}
      <mesh receiveShadow >
        <boxGeometry args={[200, 0.8, 57]} />
         <meshBasicMaterial map = {tile} />
      </mesh>
     

      {/* Ceiling */}
      <mesh position={[0, 15, 0]}>
        <boxGeometry args={[200, 0.5, 50]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 4, -25]}>
        <boxGeometry args={[200, 30, 0.8]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-100, 4, 0]}>
        <boxGeometry args={[0.5, 30, 50]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[100, 4, 0]}>
        <boxGeometry args={[0.5, 30, 50]} />
        <meshStandardMaterial color="#444" />
      </mesh>

<Train ref = {trainRef}/>

    {/* Arrows */}

    <group 
  position={[-10, 0, 15]} 
  rotation={[0, Math.PI / 2, 0]} 
  onClick={() => moveTrain(-50)} 
>
  <primitive object={arrow.scene.clone()} />
</group>

{/* Left arrow */}
<group 
  position={[10, 0, 15]} 
  rotation={[0, -Math.PI / 2, 0]} 
  onClick={() => moveTrain(50)} 
>
  <primitive object={arrow.scene.clone()} />
</group>
   


    <Skills />


    </group>

   

   
    </>
  )
}

export default Metro
