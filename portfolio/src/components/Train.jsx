import { useGLTF } from '@react-three/drei'
import React from 'react'

const Train = () => {
  
     const train = useGLTF('./train.glb');



  return (
   <>
     <primitive object={train.scene} scale = {3} rotation = {[0, 1.6, 0]} position = {[70, 8, 0]} />
   </>
  )
}

export default Train
