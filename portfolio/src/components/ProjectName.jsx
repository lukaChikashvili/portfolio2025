import { useGLTF } from '@react-three/drei'
import React from 'react'

const ProjectName = () => {
    const model = useGLTF('./wood_signal.glb');

  return (
    <>
    <group position = {[16, 10.5, -50]} >

       <mesh position={[0.05, 1.3, 0.13]}>
          <planeGeometry args = {[1.6, 0.3 ]} />
       </mesh>
       <primitive object={model.scene} scale = {1.5} />
       </group>
    </>
  )
}

export default ProjectName
