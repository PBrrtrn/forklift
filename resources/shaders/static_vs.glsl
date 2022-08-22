precision highp float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aVertexUvCoordinate;

uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;
uniform mat4 normal_matrix;

varying vec3 vPosWorld;
varying vec3 vNormal;
varying vec2 vUvCoordinate;

void main(void) {
  gl_Position = projection_matrix * view_matrix * model_matrix * vec4(aVertexPosition, 1.0);

  vPosWorld = (model_matrix * vec4(aVertexPosition, 1.0) ).xyz;
  vNormal = aVertexNormal;                
  vUvCoordinate = aVertexUvCoordinate;
}
