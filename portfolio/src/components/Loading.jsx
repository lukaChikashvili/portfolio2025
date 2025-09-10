import React from 'react'

const Loading = () => {

    const vertex  = `
        void main() {
            gl_Position = vec4(position, 1.0);

        }
    `;

    const fragment = `
       void main() {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);


       }
    `; 
  return (
     <>
     <mesh>
       <planeGeometry args = {[10, 10, 63,63]} />
       <shaderMaterial vertexShader={vertex} fragmentShader={fragment} />
       </mesh>
     </>
  )
}

export default Loading
