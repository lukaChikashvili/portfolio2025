
import React, { useRef } from 'react'
import Flag from './Flag';

const Menu = () => {

 


  return (
   <>
        <Flag
        texturePath='./projects.png'
        position={[-20, 10, 0]}
        rotation={[-0.2, -0.7, 0]}
      />

<Flag
        texturePath='./about.png'
        position={[10, 10, 20]}
        rotation={[0, -0.9, 0]}
      />
   </>
  )
}

export default Menu
