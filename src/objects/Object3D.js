class Object3D {
  constructor(shader, gl) {
    this.shader = shader

    this.position = [0.0, 0.0, 0.0]

    this.x_angle = 0.0
    this.y_angle = 0.0
    this.z_angle = 0.0

    this.scale = [1.0, 1.0, 1.0]

    this.generateVertexBuffers()
  }

  rotateX(angle) {
    this.x_angle = (this.x_angle + angle) % (2*Math.PI)
  }

  rotateY(angle) {
    this.y_angle = (this.y_angle + angle) % (2*Math.PI)
  }

  rotateZ(angle) {
    this.z_angle = (this.z_angle + angle) % (2*Math.PI)
  }

  translateX(distance) {
    this.position[0] += distance
  }

  translateY(distance) {
    this.position[1] += distance
  }

  translateZ(distance) {
    this.position[2] += distance
  }

  draw(gl, model_matrix, view_matrix, projection_matrix) {
    let object_model_matrix = this.createObjectModelMatrix(model_matrix)
    let normal_matrix = this.createNormalMatrix(object_model_matrix, 
                                                view_matrix)

    this.shader.use(gl, object_model_matrix, normal_matrix, view_matrix,
                    projection_matrix, this.vertex_buffer, this.normal_buffer)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer)
    gl.drawElements(gl.TRIANGLE_STRIP, 
                    this.index_buffer.number_vertex_point,
                    gl.UNSIGNED_SHORT, 0)
  }

  createObjectModelMatrix(model_matrix) {
    let object_model_matrix = mat4.clone(model_matrix)

    mat4.translate(object_model_matrix, object_model_matrix, this.position)

    mat4.rotateX(object_model_matrix, object_model_matrix, this.x_angle)
    mat4.rotateY(object_model_matrix, object_model_matrix, this.y_angle)
    mat4.rotateZ(object_model_matrix, object_model_matrix, this.z_angle)

    mat4.scale(object_model_matrix, object_model_matrix, this.scale)

    return object_model_matrix
  }

  createNormalMatrix(model_matrix, view_matrix) {
    let normal_matrix = mat4.create()

    mat4.identity(normal_matrix)
    mat4.multiply(normal_matrix, view_matrix, model_matrix)
    mat4.invert(normal_matrix, normal_matrix)
    mat4.transpose(normal_matrix, normal_matrix)

    return normal_matrix
  }

}