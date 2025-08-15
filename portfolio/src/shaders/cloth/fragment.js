export const clothFragment = `
uniform vec3 uColor;
varying vec2 vUv;
void main() {

  vec3 color = uColor;
 
  float grain = fract(sin(dot(vUv, vec2(12.9898,78.233))) * 43758.5453);
  color -= grain * 0.05;
  gl_FragColor = vec4(color, 1.0);
}
`;

