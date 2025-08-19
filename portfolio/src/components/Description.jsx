import { useTexture } from '@react-three/drei'
import React, { forwardRef } from 'react'
import gsap from 'gsap'
import { useThree } from '@react-three/fiber'

const Description = forwardRef(({ onShowOverlay }, ref) => {
  const desc = useTexture('./desc.png')
  const { camera } = useThree()

  const descCameraAnim = () => {
    gsap.to(camera.position, {
      x: 12,
      y: 15,
      z: -80,
      duration: 1.5,
      ease: 'power2.inOut'
    })

    
    if (onShowOverlay) onShowOverlay()
  }

  return (
    <mesh ref={ref} position={[15, 30, -55]} rotation={[0, 0.5, 0]} onClick={descCameraAnim}>
      <boxGeometry args={[4, 3]} />
      <meshBasicMaterial map={desc} />
    </mesh>
  )
})

export default Description
