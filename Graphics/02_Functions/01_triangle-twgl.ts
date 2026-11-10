/*
 * Script to draw a color triangle using WebGL 2 and TypeScript
 * Also using external functions from the TWGL library to boilerplate code
 *
 * Gilberto Echeverria
 * 2026-07-13
 */

// Sirve para hacer el triángulo
import * as twgl from 'twgl-base.js';

// Vertex Shader as a string
// Es el código del vertex shader escrito en GLSL, parecido a la sintaxis de C
// Tiene cosas adicionales como tipos de dato
// Las variables vec4 son de x, y, z y w en posición. Si es de color es R, G, B, A.
// in es de input
// Esas variables que recibe el vertex shader son atributos de lo que voy a dibujar.
// Daré como resultado un vec4 con un color, el cual es v de varying.
// gl_position es una variable que ya existe y siempre se debe llenar
const vsGLSL = `#version 300 es
in vec4 a_position;
in vec4 a_color;

out vec4 v_color;

void main() {
    gl_Position = a_position;
    v_color = a_color;
}
`;

// Fragment Shader as a string
// Empieza igual con la versión y se define con variables float para tener mejor resolución de colores.
// Recibo el v_color del programa anterior y el resultado será un color.
// Solo hace que el color de salida sea el mismo que le llegó.
// El v_color son todos los colores que varían según la posición del pixel según la interpolación hecha por el rasterizer.
const fsGLSL = `#version 300 es
precision highp float;

in vec4 v_color;

out vec4 outColor;

void main() {
    outColor = v_color;
    //outColor = vec4(0, 0, 255, 0.6);
}
`;

// getContext dibuja
// twgl y createProgramInfo recibe el contexto gl y un arreglo de los shaders.
// generateData genera la figura
// Creo buffers donde cargo la info del objeto y creo un vertex array object (representación del objeto en WebGL)
// Elijo ese objeto, el programa a usar y dibujo, es lo que hace el pipeline
function main_twgl(): void {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
        throw new Error('No canvas element found in the document');
    }

    const gl = canvas.getContext('webgl2');
    if (!gl) {
        throw new Error('WebGL2 is not supported by this browser');
    }

    const programInfo = twgl.createProgramInfo(gl, [vsGLSL, fsGLSL]);
    //console.log(programInfo.program);

    // Create an object that contains the arrays with the data
    // for each of the vertices
    const arrays = generateData();
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
    const vao = twgl.createVAOFromBufferInfo(gl, programInfo, bufferInfo);

    gl.bindVertexArray(vao);
    gl.useProgram(programInfo.program);

    // compute 3 vertices for 1 triangle
    twgl.drawBufferInfo(gl, bufferInfo);
}

// Create the data for the vertices and colors of the polygon
// Return an object with two arrays
function generateData(): twgl.Arrays {
    // The names of the arrays must be the same as the attributes used in the
    // shaders. In this case: a_position and a_color
    const arrays: twgl.Arrays = {
        a_position: {
            // Two components for the coordinates in X and Y
            // El origen esta en el centro del triángulo y las coordenadas son de los vértices.
            numComponents: 2,
            data: new Float32Array([
                 0.0,   0.9,
                 0.5,  -0.9,
                -0.5,  -0.9,
            ]),
        },
        a_color: {
            // Four components for the color (RGBA)
            numComponents: 4,
            /*
            // If not type is indicated, twgl will assume a type of float
            data: [
                1, 0, 0, 1,
                0, 1, 0, 1,
                0, 0, 1, 1,
            ]
            */
            // To pass integer values, the type must be specified
            // 255 es completamente opaco
            data: new Uint8Array([
                255, 0, 255, 100,
                255, 255, 0, 255,
                0, 255, 255, 255,
            ]),
        },
    };
    return arrays;
}

main_twgl();
