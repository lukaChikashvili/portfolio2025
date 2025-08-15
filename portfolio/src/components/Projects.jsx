import { useGLTF, useTexture } from '@react-three/drei'
import React from 'react'
import Flag from './Flag';
import { goBack } from './GoBack';
import { useThree } from '@react-three/fiber';

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
  const texture = useTexture('./project.png');

  const { camera } = useThree();


  return (
    <>
      <ChainGroup position={[20, 12, -55]} />
      <ChainGroup position={[40, 12, -55]} />
      <ChainGroup position={[120, 12, -58]} />
      <ChainGroup position={[90, 15, -63]} />
      <ChainGroup position={[170, 16, -65]} />
      <ChainGroup position={[150, 18, -65]} />

      <mesh position={[10,11, -64]} onClick={() => goBack(camera)}>
         <planeGeometry args = {[7, 2]} />
          <meshStandardMaterial map = {texture} />
        </mesh>
    </>
  )
}

export default Projects
