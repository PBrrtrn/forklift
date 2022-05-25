const fov = 45
const near = 0.1
const far = 100.0

let mat4 = glMatrix.mat4
let vec3 = glMatrix.vec3

let gl = null
canvas = null

let shader = null
let sweep_b2 = null

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

  shader = new ShaderProgram(vertex_shader_source, fragments_shader_source, gl)
}

/* Calls the constructor for every renderable object in the scene.
 A renderable object is expected to create its own vertex, normal and
 index buffers, populate them with appropriate data, and bind them */
function initObjects() {
  sweep_b2 = new SweepB2(2, 100, shader, gl)
  sweep_b2.rotateX(0.8)
  sweep_b2.translateY(-0.5)
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
  let m = mat4.create()
  sweep_b2.draw(gl, m, view_matrix, projection_matrix)
}

function updateScene() {
  sweep_b2.rotateY(0.01)
}

window.onload = run