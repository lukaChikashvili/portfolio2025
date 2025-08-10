export const flagVertex = `
    uniform float uTime;
    uniform float uSpeed;
    uniform vec2 uFrequency;
    uniform float uAmplitude;
    varying vec2 vUv;

   
   void main() {

    
     vec3 pos = position;
     
     float wave = sin(pos.x * uFrequency.x + uTime * uSpeed) * sin(pos.z * uFrequency.y + uTime * uSpeed) * uAmplitude;

     pos.z += wave;
     pos.y += wave;

     vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);


   }
`;
