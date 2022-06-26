const fov = 45
const near = 0.1
const far = 100.0

let mat4 = glMatrix.mat4
let vec3 = glMatrix.vec3

let gl = null
let canvas = null

let current_camera = 1
let cameras = {}

let side_camera = null
let rear_tracking_camera = null

let shader = null

let forklift = null
let shelf = null

let projection_matrix = mat4.create()

function run() {
  canvas = document.getElementById("my-canvas")

  document.addEventListener("keydown", handleInput)

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
  cameras[1] = new OrbitalCamera([1,-2,-10], [0.5,0,0])
  cameras[5] = new TrackingCamera([0,0,-5], -Math.PI/2) // Rear tracking camera
  cameras[6] = new TrackingCamera([0,0,-10], Math.PI) // Side tracking camera

  forklift = new Forklift(60, 60, shader, gl)
  forklift.translateY(0.3)
  forklift.scaleX(0.5)
  forklift.scaleY(0.5)
  forklift.scaleZ(0.5)

  shelf = new Shelf(20, 20, shader, gl)
  shelf.translateZ(2.5)
  shelf.translateX(-3)
  shelf.rotateY(Math.PI/2)
}

function handleInput(e) {
  switch (e.key) {
    case 'w':
      forklift.moveForward()
      return
    case 'a':
      forklift.turnLeft()
      return
    case 's':
      forklift.moveBackwards()
      return
    case 'd':
      forklift.turnRight()
      return
    case 'q':
      forklift.raisePlatform()
      return
    case 'e':
      forklift.lowerPlatform()
      return
    case '1':
        current_camera = 1
        return
    case '5':
      current_camera = 5
      return
    case '6':
      current_camera = 6
      return
  }
}

function tick() {
  requestAnimationFrame(tick)
  // updateScene()
  drawScene()
}

/* Calls to draw every renderable object in the scene.
 A renderable object is expected to apply all necessary transformations,
 set up its vertex shader matrices, use the appropriate GL Shader program,
 bind all buffers and make a call to drawElements */
function drawScene() {
  let view_matrix = cameras[current_camera].getViewMatrix(forklift.position, forklift.angle)
  let model_matrix = mat4.create()

  forklift.draw(gl, model_matrix, view_matrix, projection_matrix)
  shelf.draw(gl, model_matrix, view_matrix, projection_matrix)
}

function updateScene() {
  forklift.rotateY(0.01)
}

window.onload = run