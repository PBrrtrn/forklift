export default class ShaderProgram {
  constructor(gl, vertex_source, fragment_source) {
    let vertex_shader = this.makeShader(gl, vertex_source, gl.VERTEX_SHADER)
    let fragment_shader = this.makeShader(gl, fragment_source, gl.FRAGMENT_SHADER)

    this.program = gl.createProgram()

    gl.attachShader(this.program, vertex_shader)
    gl.attachShader(this.program, fragment_shader)
    gl.linkProgram(this.program)

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program")
    }
  }

  use(gl, model_matrix, normal_matrix, view_matrix, projection_matrix, 
      vertex_position_buffer, vertex_normal_buffer, vertex_uv_buffer) {
    gl.useProgram(this.program)

    let model_uniform = gl.getUniformLocation(this.program, "model_matrix")
    let view_uniform = gl.getUniformLocation(this.program, "view_matrix")
    let projection_uniform = gl.getUniformLocation(this.program, "projection_matrix")
    let normal_uniform = gl.getUniformLocation(this.program, "normal_matrix")

    let texture_uniform = gl.getUniformLocation(this.program, "texture_uniform")

    let light_position_uniform = gl.getUniformLocation(this.program, "light.position")
    let light_ambient_intensity_uniform = gl.getUniformLocation(this.program, "light.ambient_intensity")
    let light_diffuse_intensity_uniform = gl.getUniformLocation(this.program, "light.diffuse_intensity")
    let light_specular_intensity_uniform = gl.getUniformLocation(this.program, "light.specular_intensity")

    gl.uniformMatrix4fv(model_uniform, false, model_matrix)
    gl.uniformMatrix4fv(normal_uniform, false, normal_matrix)
    gl.uniformMatrix4fv(view_uniform, false, view_matrix)
    gl.uniformMatrix4fv(projection_uniform, false, projection_matrix)

    gl.uniform1i(texture_uniform, 0)

    gl.uniform3fv(light_position_uniform, [10.0, 10.0, 0.0])
    gl.uniform1f(light_ambient_intensity_uniform, 0.75)
    gl.uniform1f(light_diffuse_intensity_uniform, 0.2)
    gl.uniform1f(light_specular_intensity_uniform, 1.0)

    let vertex_position = gl.getAttribLocation(this.program, "vertexPosition")
    gl.enableVertexAttribArray(vertex_position)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_position_buffer)
    gl.vertexAttribPointer(vertex_position, 3, gl.FLOAT, false, 0, 0)

    let vertex_normal = gl.getAttribLocation(this.program, "vertexNormal")
    gl.enableVertexAttribArray(vertex_normal)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_normal_buffer)
    gl.vertexAttribPointer(vertex_normal, 3, gl.FLOAT, false, 0, 0)

    let vertex_uv_coordinate = gl.getAttribLocation(this.program, "vertexUvCoordinate")
    gl.enableVertexAttribArray(vertex_uv_coordinate)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_uv_buffer)
    gl.vertexAttribPointer(vertex_uv_coordinate, 2, gl.FLOAT, false, 0, 0)
  }

  makeShader(gl, source, type) {
    let shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log("Error compiling shader: " + gl.getShaderInfoLog(shader));
    }

    return shader
  }
}