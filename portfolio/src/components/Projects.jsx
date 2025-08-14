import { useGLTF } from '@react-three/drei'
import React from 'react'

const ChainGroup = ({ position }) => {
    const chain = useGLTF("./chain.glb");
  
    return (
      <group position={position}>
        <primitive
          object={chain.scene.clone()} 
          scale={0.3}
          position={[0, 0, -0.6]}
        />
        <mesh rotation={[0, -0.4, 0]}>
          <planeGeometry args={[8, 5]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
    );
  };

const Projects = () => {


  return (
    <>
      <ChainGroup position={[20, 12, -55]} />
      <ChainGroup position={[40, 12, -55]} />
      <ChainGroup position={[120, 12, -58]} />
      <ChainGroup position={[90, 15, -63]} />
      <ChainGroup position={[170, 16, -65]} />
      <ChainGroup position={[150, 18, -65]} />
    </>
  )
}

export default Projects
