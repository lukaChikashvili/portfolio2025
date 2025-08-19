import React, { forwardRef } from 'react'
import { useTexture } from '@react-three/drei'

const InfoBoard = forwardRef(({ textureUrl, position = [0, 0, 0] , onClick }, ref, ) => {
  const texture = useTexture(textureUrl);

  const githubTexture = useTexture('./github.png');
  const liveTexture = useTexture('./live.png');

  return (
    <group ref={ref} position={position} onClick={onClick}>
     
      <mesh>
        <planeGeometry args={[10, 2]} /> 
        <meshStandardMaterial />
      </mesh>

      
      <mesh position={[0, 2, 0.05]}>
        <planeGeometry args={[10, 2]} /> 
        <meshBasicMaterial map={texture} transparent />
      </mesh>

      <mesh position={[-2.5, 0, 0.05]}>
        <planeGeometry args={[5, 2]} /> 
        <meshBasicMaterial map={githubTexture} transparent />
      </mesh>

      <mesh position={[2.5, 0, 0.05]}>
        <planeGeometry args={[5, 2]} /> 
        <meshBasicMaterial map={liveTexture} transparent />
      </mesh>


    </group>
  )
})

export default InfoBoard
