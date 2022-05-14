const fov = 45
const near = 0.1
const far = 100.0

let mat4 = glMatrix.mat4
let vec3 = glMatrix.vec3

let gl = null
canvas = null

let projection_matrix = mat4.create()

shaders_program = null
vertex_shader = null
fragments_shader = null

function run() {
  canvas = document.getElementById("my-canvas")

  try {
    gl = canvas.getContext("webgl")
  } catch(error) {
    alert("Error: Your browser does not appear to support WebGL.")
  }

  if (gl) {
    setupWebGL()
    initShaders()
    setupObjects()
    setupVertexShaderMatrices()

    tick()
  } else {
    alert("Error: Your browser does not appear to support WebGL.")
  }
}

function setupWebGL() {
  gl.enable(gl.DEPTH_TEST)

  gl.clearColor(0.1, 0.1, 0.2, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  gl.viewport(0, 0, canvas.width, canvas.height)

  let aspect_ratio = canvas.width/canvas.height
  mat4.perspective(projection_matrix, fov, aspect_ratio, near, far)
}

function initShaders() {
  let vertex_shader_source = document.getElementById('shader-vs').innerHTML
  let fragments_shader_source = document.getElementById('shader-fs').innerHTML

  vertex_shader = makeShader(vertex_shader_source, gl.VERTEX_SHADER)
  fragments_shader = makeShader(fragments_shader_source, gl.FRAGMENT_SHADER)

  gl.attachShader(shaders_program, vertex_shader)
  gl.attachShader(shaders_program, fragments_shader)
  gl.linkProgram(shaders_program)

  if (!gl.getProgramParameter(shaders_program, gl.LINK_STATUS))
    alert("Unable to initialize the shader program.")

  gl.useProgram(shaders_program)
}

function makeShader(src, type) {
  let shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log("Error compiling shader: " + gl.getShaderInfoLog(shader));
  }

  return shader
}

function setupObjects() {
  // Llamar al set_buffers de los objetos
}

function setupVertexShaderMatrices() {
  // Llamar al set_vertex_shader de cada objeto que lo necesite
}

function tick() {
  requestAnimationFrame(tick)
  drawScene()
  animate() // Escuchar eventos de teclado?
}

function drawScene() {

}

function animate() {
  
}

window.onload = run