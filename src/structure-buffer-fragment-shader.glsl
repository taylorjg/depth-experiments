varying vec4 my_position;

void main() {
  float z = my_position.z / 10.0;
  float w = my_position.w;
  gl_FragColor = vec4(dFdx(z), dFdy(z), z, w);
}
