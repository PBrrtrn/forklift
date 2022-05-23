const columns = 16

class RevolutionObjectA1 extends Object3D {

  generateVertexBuffers() {
    let s1 = new StraightLine([[0.0, 0.9, 0.0], [-0.9, 0.9, 0.0], [-0.9, 0.6, 0.0]])
    let s2 = new QuadraticBSpline(0.1, [
      [-0.9, 0.6, 0.0],
      [-0.9, 0.6, 0.0],
      [-0.9, 0.6, 0.0],
      [-0.1, 0.5, 0.0],
      [-0.6, 0.0, 0.0],
      [-0.1, -0.5, 0.0],
      [-0.9, -0.6, 0.0],
      [-0.9, -0.6, 0.0],
      [-0.9, -0.6, 0.0]
    ])
    let s3 = new StraightLine([[-0.9, -0.6, 0.0], [-0.9, -0.9, 0.0], [0.0, -0.9, 0.0]])

    let curve = new Curve([s1, s2, s3])
    let curve_vertices = curve.getVertices()

    let vertex_position_array = []
    let vertex_normal_array = []
    let vertex_index_array = []

    // Generate vertex position array
    for (let i = 0; i <= columns; i++) {
      let phi = (i/columns) * 2 * Math.PI
      let vertex_slice = this.getVertexSlice(phi, curve_vertices)

      vertex_position_array.push.apply(vertex_position_array, vertex_slice)
    }

    // Generate vertex normal array
    // SOLO DE PRUEBA, REEMPLAZAR POR LAS NORMALES DE VERDAD
    vertex_normal_array = vertex_position_array

    // Generate vertex index array
    let rows = curve_vertices.length
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

  getVertexSlice(phi, curve_vertices) {
    let vertex_slice = []
    for (let i = 0; i < curve_vertices.length; i++) {
      let x = curve_vertices[i][0]*Math.cos(phi)
      let y = curve_vertices[i][1]
      let z = curve_vertices[i][0]*Math.sin(phi)

      vertex_slice.push(x, y, z)
    }

    return vertex_slice
  }

}
