precision highp float;
varying vec3 vPosWorld;
varying vec3 vNormal;
varying vec2 vUvCoordinate;

uniform sampler2D texture_uniform;

void main(void) {
  vec3 ambient_light_intensity = vec3(0.3, 0.3, 0.3);
  vec3 directional_light_intensity = vec3(0.9, 0.9, 0.9);
  vec3 directional_light_direction = normalize(vec3(1.0, -4.6, 0.0));

  vec4 texel = texture2D(texture_uniform, vUvCoordinate);

  vec3 light_intensity = ambient_light_intensity + 
    directional_light_intensity * 
    max(0.0, dot(vNormal, directional_light_direction));

  gl_FragColor = vec4(texel.rgb * light_intensity, 1.0); 
}