precision highp float;

uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;
uniform mat4 normal_matrix;

attribute vec3 vertexPosition;
attribute vec3 vertexNormal;
attribute vec2 vertexUvCoordinate;

varying vec3 fragmentPosition;
varying vec3 fragmentNormal;
varying vec2 fragmentUvCoordinate;

void main() {
  fragmentPosition = (model_matrix * vec4(vertexPosition, 1.0)).xyz;
  fragmentNormal = vertexNormal;
  fragmentUvCoordinate = vertexNormal;

  gl_Position = projection_matrix * view_matrix * vec4(fragmentPosition, 1.0);
}