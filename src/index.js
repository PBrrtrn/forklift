const fov = 45
const near = 0.1
const far = 100.0

let mat4 = glMatrix.mat4
let vec3 = glMatrix.vec3

let gl = null
canvas = null

shaders_program = null

let weird_sphere = null

let view_matrix = mat4.create()
let projection_matrix = mat4.create()

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
    initObjects()
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

  mat4.identity(view_matrix)
  mat4.translate(view_matrix, view_matrix, [0.0, 0.0, -5.0])
}

function initShaders() {
  let vertex_shader_source = document.getElementById('shader-vs').innerHTML
  let fragments_shader_source = document.getElementById('shader-fs').innerHTML

  let vertex_shader = makeShader(vertex_shader_source, gl.VERTEX_SHADER)
  let fragments_shader = makeShader(fragments_shader_source, gl.FRAGMENT_SHADER)

  shaders_program = gl.createProgram()

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

/* Calls the constructor for every renderable object in the scene.
 A renderable object is expected to create its own vertex, normal and
 index buffers, populate them with appropriate data, and bind them */
function initObjects() {
  weird_sphere = new WeirdSphere(gl)
}

function tick() {
  requestAnimationFrame(tick)
  drawScene()
  updateScene() // Escuchar eventos de teclado?
}

/* Calls to draw every renderable object in the scene.
 A renderable object is expected to apply all necessary transformations,
 set up its vertex shader matrices, use the appropriate GL Shader program,
 bind all buffers and make a call to drawElements */
function drawScene() {
  weird_sphere.draw(gl, shaders_program, view_matrix, projection_matrix)
}

function updateScene() {
  weird_sphere.rotate(0.01)
}

window.onload = run