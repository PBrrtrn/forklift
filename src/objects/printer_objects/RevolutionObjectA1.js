const columns = 16

class RevolutionObjectA1 {
  constructor(shader, gl) {
    this.shader = shader

    this.rotation_angle = 0.0

    this.model_matrix = mat4.create()
    this.normal_matrix = mat4.create()

    let s1 = new StraightLine([[0.0, 0.9, 0.0], [-0.9, 0.9, 0.0], [-0.9, 0.6, 0.0]])
    let s2 = new QuadraticBSpline([
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
    for (let i = 0; i < vertex_position_array.length; i++) {
      vertex_normal_array.push(vertex_position_array[i])
    }

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
