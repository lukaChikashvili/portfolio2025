export const clothVertex = `
uniform float uTime;
uniform float uSpeed;
uniform vec2 uFrequency;
uniform float uAmplitude;
varying vec2 vUv;

void main() {
  vUv = uv;

  vec3 pos = position;
  
  pos.z += sin(pos.y * 4.0 + uTime * 2.0) * 0.06; 
  pos.x += sin(pos.y * 3.0 + uTime * 1.5) * 0.04; 

  float wave = sin(pos.x * uFrequency.x + uTime * uSpeed) * sin(pos.z * uFrequency.y + uTime * uSpeed) * uAmplitude;

  pos.z += wave;
  pos.y += wave;


  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
