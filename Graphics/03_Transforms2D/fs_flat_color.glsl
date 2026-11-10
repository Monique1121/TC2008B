#version 300 es
precision highp float;
// Fragment shader
uniform vec4 u_color;

out vec4 outColor;

void main() {
    outColor = u_color;
}
