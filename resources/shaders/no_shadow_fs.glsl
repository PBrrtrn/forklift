precision highp float;

struct PointLight {
  vec3 position;
  float ambient_intensity;
  float diffuse_intensity;
} uniform PointLight light;

varying vec3 fragmentPosition;
varying vec3 fragmentNormal;
varying vec2 fragmentUvCoordinate;

uniform sampler2D texture_uniform;

void main() {
  vec3 toLightNormal = normalize(light.position - fragmentPosition);
  float lightIntensity = light.ambient_intensity + 
    light.diffuse_intensity * max(dot(fragmentNormal, toLightNormal), 0.0);

  vec4 texel = texture2D(texture_uniform, vUvCoordinate);

  gl_FragColor = vec4(texel.rgb * lightIntensity, 1.0);

}