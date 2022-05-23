class Object3D {
  constructor(shader, gl) {
    this.shader = shader

    this.rotation_angle = 0.0

    this.model_matrix = mat4.create()
    this.normal_matrix = mat4.create()

    this.generateVertexBuffers()
  }

  draw(gl, view_matrix, projection_matrix) {
    mat4.identity(this.model_matrix)
    mat4.rotate(this.model_matrix, this.model_matrix, 
                this.rotation_angle, [1.0, 0.0, 1.0])

    mat4.identity(this.normal_matrix)
    mat4.multiply(this.normal_matrix, view_matrix, this.model_matrix)
    mat4.invert(this.normal_matrix, this.normal_matrix)
    mat4.transpose(this.normal_matrix, this.normal_matrix)

    this.shader.use(gl, this.model_matrix, this.normal_matrix, view_matrix,
                    projection_matrix, this.vertex_buffer, this.normal_buffer)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer)
    gl.drawElements(gl.TRIANGLE_STRIP, 
                    this.index_buffer.number_vertex_point,
                    gl.UNSIGNED_SHORT, 0)
  }

  rotate(angle) {
    this.rotation_angle += angle
  }
}