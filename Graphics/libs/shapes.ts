/*
Function to create the vertex and color information for simple shapes
These can be used in multiple examples.

Gilberto Echeverria
2024-09-15
*/

import * as twgl from 'twgl-base.js';

// Create the data for the vertices of a polygon with the shape of the
// letter F. This is useful to view the transformations on the object.
function shapeF(): twgl.Arrays {
    const arrays = {
        a_position: {
            numComponents: 2,
            data: [
                // Letter F
                0, 0,
                0, 200,
                40, 200,
                40, 0,
                40, 40,
                200, 40,
                200, 0,
                40, 120,
                150, 120,
                150, 80,
                40, 80,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                // Front face
                0, 1, 2,
                2, 3, 0,
                3, 4, 5,
                5, 6, 3,
                7, 8, 9,
                9, 10, 7,
            ]
        }
    };

    return arrays;
}

function shapeF_centered() : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 2,
            data: [
                // Letter F
                0, 200,
                0, 0,
                40, 0,
                40, 200,
                40, 160,
                200, 160,
                200, 200,
                40, 80,
                150, 80,
                150, 120,
                40, 120,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                // Front face
                0, 1, 2,
                2, 3, 0,
                3, 4, 5,
                5, 6, 3,
                7, 8, 9,
                9, 10, 7,
            ]
        }
    };

    return arrays;
}

function smiley(radius: number) : twgl.Arrays {
    // The arrays are initially empty
    const positionData: number[] = [];
    const colorData: number[] = [];
    const indexData: number[] = [];

    // TODO: Create you own shape for a smiley face
    //  - Add coordinates as pairs of elements into the positionData array
    //  - Add color values as 3 values (RBG) into the colorData array
    //  - Add index for the order in which vertices are connected, 3 values for each triangle
    // HINT: You can use polar coordinates to define the positions of vertices,
    // using the radius and an angle. Then convert them to polar coordinates.

    // Number of triangles used for each circle
    const sides = 64;

    // FACE: yellow circle centered at (0, 0)
    // Initialize the center vertex, at the origin and with white color
    positionData.push(0);   // Coordenadas del centro
    positionData.push(0);
    colorData.push(1);
    colorData.push(0.85);
    colorData.push(0.1);
    colorData.push(1);

    const angleStep = 2 * Math.PI / sides;  // Ángulo entre cada triángulo

    // Loop over the sides to create the rest of the vertices
    for (let s = 0; s < sides; s++) {
        const angle = angleStep * s;

        // Generate the coordinates of the vertex
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        positionData.push(x);
        positionData.push(y);

        // Generate a random color for the vertex
        colorData.push(1, 0.85, 0.1, 1);  // Opaco si es más cercano a uno

        // Define the triangles, in counter clockwise order
        indexData.push(0);
        indexData.push(s + 1);  // S es = a cero
        indexData.push(((s + 2) <= sides) ? (s + 2) : 1);
    }

    // LEFT EYE: small black circle
    const lefteyeX = radius * - 0.5;
    const lefteyeY =  radius * 0.2;
    const eyeR =  radius * 0.15;
    let start = positionData.length / 2; 

    positionData.push(lefteyeX);
    positionData.push(lefteyeY);
    colorData.push(0.1, 0.1, 0.1, 1);

        // Loop over the sides to create the rest of the vertices
    for (let s = 0; s < sides; s++) {
        const angle = angleStep * s;

        // Generate the coordinates of the vertex
        const x = lefteyeX + eyeR* Math.cos(angle);
        const y = lefteyeY + eyeR * Math.sin(angle);
        positionData.push(x);
        positionData.push(y);

        // Generate a random color for the vertex
        colorData.push(0.1, 0.1, 0.1, 1);  // Opaco si es más cercano a uno

        // Define the triangles, in counter clockwise order
        indexData.push(start);
        indexData.push(start + s + 1);  // S es = a cero
        indexData.push(start + (((s + 2) <= sides) ? (s + 2) : 1));
    }

    // RIGHT EYE: small black circle
    const righteyeX = radius * 0.5;
    const righteyeY =  radius * 0.2;
    start = positionData.length / 2;

    positionData.push(righteyeX);
    positionData.push(righteyeY);
    colorData.push(0.1, 0.1, 0.1, 1);

        // Loop over the sides to create the rest of the vertices
    for (let s = 0; s < sides; s++) {
        const angle = angleStep * s;

        // Generate the coordinates of the vertex
        const x = righteyeX + eyeR * Math.cos(angle);
        const y = righteyeY + eyeR * Math.sin(angle);
        positionData.push(x);
        positionData.push(y);

        // Generate a random color for the vertex
        colorData.push(0.1, 0.1, 0.1, 1);  // Opaco si es más cercano a uno

        // Define the triangles, in counter clockwise order
        indexData.push(start);
        indexData.push(start + s + 1);  // S es = a cero
        indexData.push(start + (((s + 2) <= sides) ? (s + 2) : 1));

    }

    // MOUTH: black half circle (smile)
    const mouthY =  radius * - 0.3;
    const mouthR = radius * 0.4
    start = positionData.length / 2;

    positionData.push(0);
    positionData.push(mouthY);
    colorData.push(0.1, 0.1, 0.1, 1);

    // Loop over the sides to create the rest of the vertices
    // Only half a turn: from 180° (PI) to 360° (2 * PI), the lower half.
    for (let s = 0; s <= sides / 2; s++) {
        const angle = Math.PI + angleStep * s;

        // Generate the coordinates of the vertex
        const x = mouthR * Math.cos(angle);
        const y = mouthY + mouthR * Math.sin(angle);
        positionData.push(x);
        positionData.push(y);

        // Generate a random color for the vertex
        colorData.push(0.1, 0.1, 0.1, 1);  // Opaco si es más cercano a uno

        // There is one less triangle than border vertices, and the half circle
        // is not closed, so no triangle is created on the last iteration.
        if (s < sides / 2) {
            indexData.push(start);
            indexData.push(start + s + 1);
            indexData.push(start + s + 2);
        }

    }


    const arrays: twgl.Arrays = {
        // Two components for each position in 2D
        a_position: { numComponents: 2, data: positionData },
        // Four components for a color (RGBA)
        a_color: { numComponents: 4, data: colorData },
        // Three components for each triangle, the 3 vertices
        indices: { numComponents: 3, data: indexData },
    };

    console.log(arrays);
    return arrays;
}

function diamond(size: number) : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 2,
            data: [
                // A diamond shape
                size, 0,
                0, size,
                -size, 0,
                0, -size,
            ]
        },
        a_color: {
            numComponents: 4,
            data: [
                0.5, 0.5, 0.5, 1,
                0.5, 0.5, 0.5, 1,
                0.5, 0.5, 0.5, 1,
                0.5, 0.5, 0.5, 1,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                // Front face
                0, 1, 2,
                2, 3, 0,
            ]
        }
    };

    return arrays;
}

function car2D() : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 2,
            data: [
                -100,  -40,
                 -40,  -40,
                  40,  -40,
                 100,  -40,
                 100,  -20,
                  40,   10,
                 -40,   10,
                -100,   20,
                 -30,   40,
                  24,   30,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                0, 1, 6,      0, 6, 7,    // Car back
                1, 2, 5,      1, 5, 6,    // Car middle
                2, 3, 4,      2, 4, 5,    // Car front
                6, 5, 9,      6, 9, 8     // Car top
            ]
        }
    }

    return arrays;
}


// Create the data for a cube where each face has a different color
function cubeFaceColors(size: number) : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 3,
            data: [
                // Front Face
                -1.0, -1.0,  1.0,
                 1.0, -1.0,  1.0,
                 1.0,  1.0,  1.0,
                -1.0,  1.0,  1.0,

                // Back face
                -1.0, -1.0, -1.0,
                -1.0,  1.0, -1.0,
                 1.0,  1.0, -1.0,
                 1.0, -1.0, -1.0,

                // Top face
                -1.0,  1.0, -1.0,
                -1.0,  1.0,  1.0,
                 1.0,  1.0,  1.0,
                 1.0,  1.0, -1.0,

                // Bottom face
                -1.0, -1.0, -1.0,
                 1.0, -1.0, -1.0,
                 1.0, -1.0,  1.0,
                -1.0, -1.0,  1.0,

                // Right face
                 1.0, -1.0, -1.0,
                 1.0,  1.0, -1.0,
                 1.0,  1.0,  1.0,
                 1.0, -1.0,  1.0,

                // Left face
                -1.0, -1.0, -1.0,
                -1.0, -1.0,  1.0,
                -1.0,  1.0,  1.0,
                -1.0,  1.0, -1.0
            ].map(e => size * e)
        },
        a_normal: {
            numComponents: 3,
            data: [
                // Front Face
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,

                // Back face
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,

                // Top face
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,

                // Bottom face
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,

                // Right face
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,

                // Left face
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
            ]
        },
        a_color: {
            numComponents: 4,
            data: [
                // Front face
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                // Back Face
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                // Top Face
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                // Bottom Face
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                // Right Face
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                // Left Face
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                0, 1, 2,      0, 2, 3,    // Front face
                4, 5, 6,      4, 6, 7,    // Back face
                8, 9, 10,     8, 10, 11,  // Top face
                12, 13, 14,   12, 14, 15, // Bottom face
                16, 17, 18,   16, 18, 19, // Right face
                20, 21, 22,   20, 22, 23  // Left face
            ]
        }
    };

    return arrays;
}

// Create the data for a cube with each vertex in a different color
function cubeVertexColors(size: number) : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 3,
            data: [
                 1,  1,  1, // v_0
                 1, -1,  1, // v_1
                -1, -1,  1, // v_2
                -1,  1,  1, // v_3
                 1,  1, -1, // v_4
                 1, -1, -1, // v_5
                -1, -1, -1, // v_6
                -1,  1, -1, // v_7
            ].map(e => size * e)
        },
        a_color: {
            numComponents: 4,
            data: [
                1, 1, 1, 1, // v_0
                1, 0, 0, 1, // v_1
                0, 1, 0, 1, // v_2
                0, 0, 1, 1, // v_3
                0, 0, 0, 1, // v_4
                1, 1, 0, 1, // v_5
                0, 1, 1, 1, // v_6
                1, 0, 1, 1, // v_7
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                // Front face
                0, 2, 1,
                2, 0, 3,
                // Top face
                0, 5, 4,
                5, 0, 1,
                // Left face
                1, 6, 5,
                6, 1, 2,
                // Right face
                0, 7, 3,
                7, 0, 4,
                // Bottom face
                2, 7, 6,
                7, 2, 3,
                // Back face
                4, 6, 7,
                6, 4, 5,
            ]
        }
    };

    return arrays;
}

// Create the data for a cube with vertex coordinates
function cubeTextured(size: number) : twgl.Arrays {
    let arrays = {
        a_position: {
            numComponents: 3,
            data: [
                // Front Face
                -1.0, -1.0,  1.0,
                 1.0, -1.0,  1.0,
                 1.0,  1.0,  1.0,
                -1.0,  1.0,  1.0,

                // Back face
                -1.0, -1.0, -1.0,
                -1.0,  1.0, -1.0,
                 1.0,  1.0, -1.0,
                 1.0, -1.0, -1.0,

                // Top face
                -1.0,  1.0, -1.0,
                -1.0,  1.0,  1.0,
                 1.0,  1.0,  1.0,
                 1.0,  1.0, -1.0,

                // Bottom face
                -1.0, -1.0, -1.0,
                 1.0, -1.0, -1.0,
                 1.0, -1.0,  1.0,
                -1.0, -1.0,  1.0,

                // Right face
                 1.0, -1.0, -1.0,
                 1.0,  1.0, -1.0,
                 1.0,  1.0,  1.0,
                 1.0, -1.0,  1.0,

                // Left face
                -1.0, -1.0, -1.0,
                -1.0, -1.0,  1.0,
                -1.0,  1.0,  1.0,
                -1.0,  1.0, -1.0
            ].map(e => size * e)
        },
        a_normal: {
            numComponents: 3,
            data: [
                // Front Face
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,
                0, 0, 1,

                // Back face
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,
                0, 0, -1,

                // Top face
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,
                0, 1, 0,

                // Bottom face
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,
                0, -1, 0,

                // Right face
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,
                1, 0, 0,

                // Left face
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
                -1, 0, 0,
            ]
        },
        a_color: {
            numComponents: 4,
            data: [
                // Front face
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                1, 0, 0, 1, // v_1
                // Back Face
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                0, 1, 0, 1, // v_2
                // Top Face
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                0, 0, 1, 1, // v_3
                // Bottom Face
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                1, 1, 0, 1, // v_4
                // Right Face
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                0, 1, 1, 1, // v_5
                // Left Face
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
                1, 0, 1, 1, // v_6
            ]
        },
        a_texCoord: {
            numComponents: 2,
            data: [
                // Front Face
                0.0, 0.0,
                1.0, 0.0,
                1.0,  1.0,
                0.0, 1.0,

                // Back face
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
                0.0, 0.0,

                // Top face
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,

                // Bottom face
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,

                // Right face
                0.0, 1.0,
                1.0, 1.0,
                1.0, 0.0,
                0.0, 0.0,

                // Left face
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
            ]
        },
        indices: {
            numComponents: 3,
            data: [
                0, 1, 2,      0, 2, 3,    // Front face
                4, 5, 6,      4, 6, 7,    // Back face
                8, 9, 10,     8, 10, 11,  // Top face
                12, 13, 14,   12, 14, 15, // Bottom face
                16, 17, 18,   16, 18, 19, // Right face
                20, 21, 22,   20, 22, 23  // Left face
            ]
        }
    };

    return arrays;
}

export { shapeF, diamond, cubeFaceColors, cubeVertexColors, cubeTextured,
         car2D, smiley, shapeF_centered };
