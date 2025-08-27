import { useGLTF, useTexture } from '@react-three/drei'
import React, { useRef } from 'react'
import Train from './Train'
import * as THREE from 'three'
import Skills from './Skills'
import gsap from 'gsap'
import { useThree } from '@react-three/fiber'

const Metro = () => {

  const tile = useTexture('./tile.jpg');


  tile.wrapS = THREE.ClampToEdgeWrapping;
  tile.wrapT = THREE.ClampToEdgeWrapping;
  tile.repeat.set(0, 1);

  // arrows
  const arrow = useGLTF('./arrow.glb');
  const arrowRef = useRef();
  const leftArrowRef = useRef();



  const trainRef = useRef();

  const {camera} = useThree();

  // animate train
  const moveTrain = (distance) => {
    gsap.to(trainRef.current.position, {
      x: trainRef.current.position.x + distance, 
      duration: 5,
      delay: 1,
      ease: "power2.out"
    });

    if(distance < 0) {
       gsap.to(camera.position, {
        x: camera.position.x - 100,
        duration: 1.5,
        delay: 0.5,
        ease: "power2.out"
       });
    }else {
      gsap.to(camera.position, {
        x: camera.position.x + 100,
        duration: 1.5,
        delay: 0.5,
        ease: "power2.out"
       });
    }

    if(distance < 0) {
      gsap.to(arrowRef.current.position, {
        x: arrowRef.current.position.x - 100
     });
     gsap.to(leftArrowRef.current.position, {
      x: arrowRef.current.position.x - 100
   });
 
    }else {
      gsap.to(arrowRef.current.position, {
        x: arrowRef.current.position.x + 100
     });
     gsap.to(leftArrowRef.current.position, {
      x: arrowRef.current.position.x + 120
   })
      
    }
   
   
  }

  return (
    <>
      
            <group position={[0, -29, 0]}>
      {/* Floor */}
      <mesh receiveShadow >
        <boxGeometry args={[900, 0.8, 57]} />
         <meshBasicMaterial map = {tile} />
      </mesh>
     

      {/* Ceiling */}
      <mesh position={[0, 15, 0]}>
        <boxGeometry args={[900, 0.5, 50]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 4, -25]}>
        <boxGeometry args={[900, 30, 0.8]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-400, 4, 0]}>
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

    <group ref = {arrowRef}
  position={[-5, 0, 15]} 
  rotation={[0, Math.PI / 2, 0]} 
  onClick={() => moveTrain(-100)} 
>
  <primitive object={arrow.scene.clone()} />
</group>

{/* Left arrow */}
<group ref = {leftArrowRef}
  position={[10, 0, 15]} 
  rotation={[0, -Math.PI / 2, 0]} 
  onClick={() => moveTrain(100)} 
>
  <primitive object={arrow.scene.clone()} />
</group>
   


    <Skills />


    </group>

   

   
    </>
  )
}

export default Metro
