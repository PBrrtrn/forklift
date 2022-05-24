// TODO: Esto no debería extender Object3D; debería ser un colaborador.
// Quizás deba extender de una clase Shape3D común que represente una
// forma de construir la geometría de un Object3D.
class SweepObject extends Object3D {

  constructor(shader, gl, n_rows) {
    super(shader, gl)
    this.n_rows = n_rows
  }

  generateVertexBuffers() {
    let curve = this.getCurve()
    let curve_vertices = curve.getVertices()

    let vertex_position_array = this.vertexPositionArray(curve_vertices)
    let vertex_normal_array = vertex_position_array // SOLO DE PRUEBA, REEMPLAZAR CON LAS NORMALES REALES
    let vertex_index_array = this.vertexIndexArray(curve_vertices)

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

  vertexPositionArray(curve_vertices) {
    let array = []
    for (let i = 0; i <= this.n_rows; i++) {
      let u = i/this.n_rows
      let vertex_slice = this.getVertexSlice(u, curve_vertices)

      array.push.apply(array, vertex_slice)
    }
  }

  vertexIndexArray(curve_vertices) {
    let n_columns = curve_vertices.length
    for (let i = 0; i < this.n_rows; i++) {
      vertex_index_array.push(i*n_columns)

      for (let j = 0; j < (n_columns-1); j++) {
        vertex_index_array.push(i*n_columns+j);
        vertex_index_array.push((i+1)*n_columns+j);
        vertex_index_array.push(i*n_columns+j+1);
        vertex_index_array.push((i+1)*n_columns+j+1);
      }
      vertex_index_array.push((i+1) * n_columns + n_columns - 1);
    }
  }

  getVertexSlice(u, curve_vertices) {
    let vertex_slice = []
    for (let i = 0; i < curve_vertices.length; i++) {
      let x = curve_vertices[i][0]
      let y = u*2
      let z = curve_vertices[i][2]

      vertex_slice.push(x, y, z)
    }

    return vertex_slice
  }

}
