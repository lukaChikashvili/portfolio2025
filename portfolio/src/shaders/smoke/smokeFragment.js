export const smokeFragment = `
void main() {
    gl_FragColor = vec4(1.0, 0.4, 0.5, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    
}

`;
