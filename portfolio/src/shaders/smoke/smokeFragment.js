export const smokeFragment = `
varying vec2 vUv;
uniform sampler2D uPerlineTexture;

void main() {
   

    float smoke = texture(uPerlineTexture, vUv).r;

    gl_FragColor = vec4(1.0, 1.0, 1.0, smoke);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>

}

`;
