import { useGLTF, useTexture } from '@react-three/drei'
import React, { useMemo } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { useThree } from '@react-three/fiber'

const House = () => {
   
    // wall texture
    const wallTexture = useTexture('./wall.webp');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(0.25, 0.25);

  const floorTexture = useTexture('./floor.jpg');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(20, 20);

  const homeTexture = useTexture('./home.png');


  const title = useGLTF('./title.glb');
  const tv = useGLTF('./tv.glb');
  const clock = useGLTF('./clock.glb');

  const { camera } = useThree();


  // back to home camera animation
  const goBack = () => {
    gsap.to(camera.position, {
        x: -13,
  y: 14,
  z: 25,
  duration: 2,
  ease: 'power2.inOut',
  
});

  }



  const shape = useMemo(() => {
  
    const wall = new THREE.Shape()
    wall.moveTo(-40, -40) 
    wall.lineTo(40, -40)  
    wall.lineTo(40, 40)   
    wall.lineTo(-40, 40)  
    wall.lineTo(-40, -40) 

   
    const hole = new THREE.Path()
    const holeSize = 7
    const halfHole = holeSize / 2

    
    hole.moveTo(-halfHole, -halfHole)
    hole.lineTo(halfHole, -halfHole)
    hole.lineTo(halfHole, halfHole)
    hole.lineTo(-halfHole, halfHole)
    hole.lineTo(-halfHole, -halfHole)

    wall.holes.push(hole)

    return wall
  }, [])

  return (
    <>
    <mesh position={[0, 18, 40]}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial  map = {wallTexture} side={THREE.DoubleSide} />
    </mesh>

<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0,10, 190]}>
<planeGeometry args={[400, 300]} />
<meshStandardMaterial map = {floorTexture} side={THREE.DoubleSide} />
</mesh>

<primitive object={title.scene} scale = {0.15} rotation = {[0, -0.2, 0]} position = {[15, 11, 40]} />
<primitive object={tv.scene} scale = {6} position = {[-6, 23, 40.5]} />
<primitive object={clock.scene} rotation = {[0, -1.1, 0]} scale = {6} position = {[-8, 20, 40.5]} />

{/*  Go Back button */}

<mesh position = {[0, 12, 40.2]} onClick={goBack}>
    <planeGeometry args = {[7, 2]} />
    <meshBasicMaterial map = {homeTexture} />
</mesh>
</>
  )
}

export default House