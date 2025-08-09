import { smokeFragment } from '@/shaders/smoke/smokeFragment'
import { smokeVertex } from '@/shaders/smoke/smokeVertex'
import { useGLTF, useTexture } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'

const Smoke = () => {
   
    // perlin noise
    const perlineTexture = useTexture('./perlin.png');

    const uniforms = useRef({
        uPerlineTexture: { value: perlineTexture}
    })
     
  return (
    <>
      <mesh position={[6.75, 17.3, 5.7]}>
      <planeGeometry args = {[1, 5, 16, 64]} />
      <shaderMaterial color = "red" wireframe = {false} 
      vertexShader={smokeVertex} fragmentShader={smokeFragment}
       side = {THREE.DoubleSide} transparent = {true} uniforms = {uniforms.current} />
      </mesh>
    </>
  )
}

export default Smoke
