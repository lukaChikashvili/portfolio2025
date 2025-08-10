import { flagFragment } from '@/shaders/flags/fragment'
import { flagVertex } from '@/shaders/flags/vertex'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

const Flag = ({ texturePath, position, rotation, onclick }) => {
   
 

  const shaderRef = useRef()
  const texture = useTexture(texturePath)

  const uniforms = useRef({
    uTime: { value: 0 },
    uAmplitude: { value: 0.5 },
    uFrequency: { value: new THREE.Vector2(1.85, 1.0) },
    uSpeed: { value: 3.0 },
    uTexture: { value: texture },
  })

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.elapsedTime
    }
  })

  return (
    <mesh rotation={rotation} position={position} onClick={onclick}>
      <planeGeometry args={[3, 10, 128, 128]} />
      <shaderMaterial
        ref={shaderRef}
        wireframe={false}
        side={THREE.DoubleSide}
        vertexShader={flagVertex}
        fragmentShader={flagFragment}
        uniforms={uniforms.current}
      />
    </mesh>
  )
}

export default Flag
