import { useRef } from "react";

const Lights = ({ isNight }) => {
  const sun = useRef();

  if (isNight) {
    // Night lights
    return (
      <>
        <ambientLight intensity={10} color="#471396" />
        <spotLight
          ref={sun}
          position={[10, 200, 10]}
          angle={0.5}
          penumbra={0.8}
          intensity={3}
          color="#aabbee"
          castShadow
          distance={50}
          decay={2}
          target-position={[0, 0, 0]}
        />
      </>
    );
  }

  // Day lights
  return (
    <>
      <ambientLight intensity={8} color="#FF9B00" />
      <directionalLight
        ref={sun}
        position={[50, 50, 50]}
        intensity={1}
        color="#fff5e1"
        castShadow
      />
    </>
  );
};

export default Lights;