import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const Loading = () => {
  const materialRef = useRef();

  useEffect(() => {
    const loadingManager = new THREE.LoadingManager(
      () => {
        // when loading is done → fade out overlay
        if (materialRef.current) {
          materialRef.current.uniforms.uAlpha.value = 0.0;
        }
      },
      (url, itemsLoaded, itemsTotal) => {
        // progress
        const progress = itemsLoaded / itemsTotal;
        if (materialRef.current) {
          // alpha goes from 0.7 → 0 as progress reaches 100%
          materialRef.current.uniforms.uAlpha.value = 0.7 * (1.0 - progress);
        }
      }
    );

  }, []);

  const vertex = `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragment = `
    uniform float uAlpha;
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
    }
  `;

  return (
    <mesh>
      {/* make sure this plane covers the screen */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent={true}
        uniforms={{ uAlpha: { value: 0.7 } }}
      />
    </mesh>
  );
};

export default Loading;
