import { useTexture } from '@react-three/drei';
import React from 'react'

const Skills = () => {

    const images = [
        "./skills/next.png", "./skills/react.png", "./skills/type.png", "./skills/css.png"
    ];

    const textures = useTexture(images);
  return (
      <>
        <group position = {[-300, 11, -4]}>
      {textures.map((texture, index) => (
        <mesh 
          key={index} 
          position={[index * 100, 0, 0]} 
        >
          <planeGeometry args={[20, 6]} /> 
          <meshBasicMaterial map={texture} />
        </mesh>
      ))}
    </group>

        
      </>
  )
}

export default Skills
