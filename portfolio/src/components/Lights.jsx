import { useRef } from "react";

const Lights = ({ isNight }) => {
  const sun = useRef();

  if (isNight) {
    // Night lights
    return (
      <>
        <ambientLight intensity={0.2} color="#4455ff" />
        <spotLight
          ref={sun}
          position={[10, 50, 10]}
          angle={0.5}
          penumbra={0.7}
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
      <ambientLight intensity={1} color="#ffffff" />
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