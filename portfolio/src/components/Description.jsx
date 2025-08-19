import { useTexture } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier';
import React from 'react'
import * as THREE from 'three'

const Description = ({ ref }) => {

    const desc = useTexture('./desc.png');

  return (
    <>
   
      <mesh ref = {ref} position = {[15, 30, -55]} rotation ={[0, 0.5, 0]}>
       <boxGeometry args = {[4, 3]} />
        <meshBasicMaterial map = {desc} />
        </mesh>
        


    </>
  )
}

export default Description
