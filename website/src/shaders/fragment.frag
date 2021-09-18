precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_fragMouse;

varying vec2 vUv;
varying float transfer;
varying float value;
  
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec2 mouse = u_fragMouse;

  st.x *= (u_resolution.x / u_resolution.y);
  mouse.x *= (u_resolution.x / u_resolution.y); 

  gl_FragColor = vec4(vec3(1.0, 0.0, transfer), 1.0);
}
