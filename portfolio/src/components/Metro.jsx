import React from 'react'

const Metro = () => {
  return (
    <>
        
            <group position={[0, -18.5, 0]}>
      {/* Floor */}
      <mesh receiveShadow>
        <boxGeometry args={[200, 0.5, 50]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[200, 0.5, 50]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 4, -25]}>
        <boxGeometry args={[200, 10, 0.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-100, 4, 0]}>
        <boxGeometry args={[0.5, 10, 50]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[100, 4, 0]}>
        <boxGeometry args={[0.5, 10, 50]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
    </>
  )
}

export default Metro
