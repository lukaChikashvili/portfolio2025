import { flagFragment } from '@/shaders/flags/fragment'
import { flagVertex } from '@/shaders/flags/vertex'
import React from 'react'

const Menu = () => {
  return (
   <>
     <mesh rotation = {[0, 0, 0]} position={[0, 16,0]}>
         <planeGeometry args = {[5, 10, 64, 64]} />
         <shaderMaterial wireframe = {true} 
         vertexShader={flagVertex} fragmentShader={flagFragment} />
     </mesh>
   </>
  )
}

export default Menu
