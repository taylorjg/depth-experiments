uniform vec3 color;

void main() {
  float r = color.r;
  float g = color.g;
  float b = color.b;
  gl_FragColor = vec4(r, g, b, 1.0);

  // float v1 = gl_FragCoord.w;
  // float v = v1 > 0.12 ? 0.8 : 0.2;
  // float v = gl_FragCoord.w;

  // float v = gl_FragCoord.w;
  // gl_FragColor = vec4(v, v, v, 1.0);
}
