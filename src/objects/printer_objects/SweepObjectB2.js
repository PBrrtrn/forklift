const rows = 16

class SweepObjectB2 extends Object3D {

  generateVertexBuffers() {
    let s = new QuadraticBSpline(0.01, [
      [0.63, 0.77, 0.0],
      [0.63, 0.77, 0.0],
      [0.63, 0.77, 0.0],
      [0.05, 0.35, 0.0], // Puntos medios
      [-0.2, 0.98, 0.0],
      [-0.2, 0.98, 0.0],
      [-0.25, 0.3, 0.0], // Puntos medios
      [-0.9, 0.45, 0.0],
      [-0.9, 0.45, 0.0],
      [-0.35, 0.0, 0.0], // Puntos medios
      [-0.9, -0.4, 0.0],
      [-0.9, -0.4, 0.0],
      [-0.25, -0.25, 0.0], // Puntos medios
      [-0.26, -0.97, 0.0],
      [-0.26, -0.97, 0.0],
      [0.0, -0.3, 0.0], // Puntos medios
      [0.59, -0.81, 0.0],
      [0.59, -0.81, 0.0],
      [0.25, -0.1, 0.0], // Puntos medios
      [1.0, 0.0, 0.0],
      [1.0, 0.0, 0.0],
      [0.25, 0.2, 0.0], // Puntos medios
      [0.63, 0.77, 0.0],
      [0.63, 0.77, 0.0],
      [0.63, 0.77, 0.0]
    ])

    let curve = new Curve([s])
    let curve_vertices = curve.getVertices()

    let vertex_position_array = []
    let vertex_normal_array = []
    let vertex_index_array = []

    // Generate vertex position array
    for (let i = 0; i <= rows; i++) {
      let u = i/rows
      let vertex_slice = this.getVertexSlice(u, curve_vertices)

      vertex_position_array.push.apply(vertex_position_array, vertex_slice)
    }

    // Generate vertex normal array
    // SOLO DE PRUEBA, REEMPLAZAR POR LAS NORMALES DE VERDAD
    vertex_normal_array = vertex_position_array

    // Generate vertex index array
    let columns = curve_vertices.length
    for (let i = 0; i < (rows); i++) {
      vertex_index_array.push(i*columns)

      for (let j = 0; j < (columns-1); j++) {
        vertex_index_array.push(i*columns+j);
        vertex_index_array.push((i+1)*columns+j);
        vertex_index_array.push(i*columns+j+1);
        vertex_index_array.push((i+1)*columns+j+1);
      }
      vertex_index_array.push((i+1) * columns + columns - 1);
    }

    // Create and bind buffers
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

  getVertexSlice(u, curve_vertices) {
    let vertex_slice = []
    for (let i = 0; i < curve_vertices.length; i++) {
      let x = curve_vertices[i][0]
      let y = u
      let z = curve_vertices[i][2]

      vertex_slice.push(x, y, z)
    }

    return vertex_slice
  }
}
