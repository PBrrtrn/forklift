class ShaderProgram {
  constructor(vertex_source, fragment_source, gl) {
    let vertex_shader = this.makeShader(vertex_source, gl.VERTEX_SHADER)
    let fragment_shader = this.makeShader(fragment_source, gl.FRAGMENT_SHADER)

    this.program = gl.createProgram()

    gl.attachShader(this.program, vertex_shader)
    gl.attachShader(this.program, fragment_shader)
    gl.linkProgram(this.program)

    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program")
    }
  }

  use(gl) {
    gl.useProgram(this.program)
  }

  makeShader(source, type) {
    let shader = gl.createShader(type)
    gl.shaderSource(shader, src)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log("Error compiling shader: " + gl.getShaderInfoLog(shader));
    }

    return shader
  }
}