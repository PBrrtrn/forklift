export default class Renderable3D {
  constructor(shader, texture, gl, surface) {
    this.shader = shader
    this.texture = texture

    let vertex_position_array = surface.getVertexPositions()
    let vertex_normal_array = surface.getVertexNormals()
    let vertex_uv_coordinates_array = surface.getVertexUvCoordinates()
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

    this.uv_buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uv_buffer)
    gl.bufferData(gl.ARRAY_BUFFER,
                  new Float32Array(vertex_uv_coordinates_array),
                  gl.STATIC_DRAW)

    this.index_buffer = gl.createBuffer()
    this.index_buffer.number_vertex_point = vertex_index_array.length
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 
                  new Uint16Array(vertex_index_array),
                  gl.STATIC_DRAW)
  }

  render(gl, model_matrix, normal_matrix, view_matrix, projection_matrix) {
    this.shader.use(gl, model_matrix, normal_matrix, view_matrix, 
                    projection_matrix, this.vertex_buffer, this.normal_buffer, this.uv_buffer)

    this.texture.use(gl)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer)
    gl.drawElements(gl.TRIANGLE_STRIP, 
                    this.index_buffer.number_vertex_point,
                    gl.UNSIGNED_SHORT, 0)
  }

}
