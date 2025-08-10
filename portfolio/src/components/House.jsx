import { useTexture } from '@react-three/drei'
import React, { useMemo } from 'react'
import * as THREE from 'three'

const House = () => {
   
    // wall texture
    const wallTexture = useTexture('./wall.webp');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(0.25, 0.25);

  const floorTexture = useTexture('./floor.jpg');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(20, 20);




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
</>
  )
}

export default House