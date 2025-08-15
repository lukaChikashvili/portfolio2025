import { useGLTF, useTexture } from '@react-three/drei'
import React from 'react'

const ProjectName = ({ textureUrl }) => {
    const model = useGLTF('./wood_signal.glb');

    const texture = useTexture(textureUrl);

  return (
    <>
    <group position = {[17, 10.5, -49]} >

       <mesh position={[0.05, 1.9, 0.18]}>
          <planeGeometry args = {[2.3, 0.5 ]} />
          <meshStandardMaterial map = {texture} />
       </mesh>
       <primitive object={model.scene} scale = {2.2} />
       </group>
    </>
  )
}

export default ProjectName
