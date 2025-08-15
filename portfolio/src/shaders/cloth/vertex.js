export const clothVertex = `
uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;

  vec3 pos = position;
  
  pos.z += sin(pos.y * 4.0 + uTime * 2.0) * 0.06; 
  pos.x += sin(pos.y * 3.0 + uTime * 1.5) * 0.04; 

  

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;
