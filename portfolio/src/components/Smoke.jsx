import { smokeFragment } from '@/shaders/smoke/smokeFragment'
import { smokeVertex } from '@/shaders/smoke/smokeVertex'
import React from 'react'
import * as THREE from 'three'

const Smoke = () => {
  return (
    <>
      <mesh position={[6.75, 17.3, 5.7]}>
      <planeGeometry args = {[1, 5, 16, 64]} />
      <shaderMaterial color = "red" wireframe = {false} 
      vertexShader={smokeVertex} fragmentShader={smokeFragment} side = {THREE.DoubleSide} />
      </mesh>
    </>
  )
}

export default Smoke
