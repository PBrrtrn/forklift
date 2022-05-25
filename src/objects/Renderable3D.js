class Renderable3D {
  constructor(shader, gl, surface) {
    this.shader = shader

    let vertex_position_array = surface.getVertexPositions()
    let vertex_normal_array = surface.getVertexNormals()
    let vertex_index_array = surface.getVertexIndices()

    this.vertex_buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, 
                  new Float32Array(vertex_position_array),
                  gl.STATIC_DRAW)

    this.normal_buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normal_buffer)
    gl.bufferData(gl.ARRAY_BUFFER,
                  new Float32Array(vertex_normal_array),
                  gl.STATIC_DRAW)

    this.index_buffer = gl.createBuffer()
    this.index_buffer.number_vertex_point = vertex_index_array.length
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 
                  new Uint16Array(vertex_index_array),
                  gl.STATIC_DRAW)
  }

  render(position, angle, scale, gl, 
         model_matrix, view_matrix, projection_matrix) {
    let object_model_matrix = this.createObjectModelMatrix(model_matrix, 
                                                           position, angle, 
                                                           scale)

    let normal_matrix = this.createNormalMatrix(object_model_matrix, 
                                                view_matrix)

    this.shader.use(gl, object_model_matrix, normal_matrix, view_matrix,
                    projection_matrix, this.vertex_buffer, this.normal_buffer)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer)
    gl.drawElements(gl.TRIANGLE_STRIP, 
                    this.index_buffer.number_vertex_point,
                    gl.UNSIGNED_SHORT, 0)
  }

  createObjectModelMatrix(model_matrix, position, angle, scale) {
    let object_model_matrix = mat4.clone(model_matrix)

    mat4.translate(object_model_matrix, object_model_matrix, position)

    mat4.rotateX(object_model_matrix, object_model_matrix, angle[0])
    mat4.rotateY(object_model_matrix, object_model_matrix, angle[1])
    mat4.rotateZ(object_model_matrix, object_model_matrix, angle[2])

    mat4.scale(object_model_matrix, object_model_matrix, scale)

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