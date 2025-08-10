import { useTexture } from '@react-three/drei'
import React, { useMemo } from 'react'
import * as THREE from 'three'

const House = () => {
   
    // wall texture
    const wallTexture = useTexture('./wall.webp');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(0.025, 0.025);




  const shape = useMemo(() => {
  
    const wall = new THREE.Shape()
    wall.moveTo(-100, -100)
    wall.lineTo(100, -100)
    wall.lineTo(100, 100)
    wall.lineTo(-100, 100)
    wall.lineTo(-100, -100)

   
    const hole = new THREE.Path()
    const holeSize = 22
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
    <mesh position={[0, 40, 40]}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial  map = {wallTexture} side={THREE.DoubleSide} />
    </mesh>

<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0,10, 90]}>
<planeGeometry args={[400, 100]} />
<meshStandardMaterial  side={THREE.DoubleSide} />
</mesh>
</>
  )
}

export default House