export const flagFragment = `
 uniform sampler2D uTexture;
 varying vec2 vUv;

    void main() {
       
        vec4 color = texture(uTexture, vUv);


        gl_FragColor = color;

    }
`;
