attribute vec3 a_position;
uniform mat4 u_modelViewMatrix;

void main() {
    gl_Position = u_modelViewMatrix * vec4(a_position, 1.0);
}