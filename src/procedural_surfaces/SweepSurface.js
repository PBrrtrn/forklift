class SweepSurface {
  constructor(curve, n_rows) {
    let curve_vertices = curve.getVertices()
    let vertices = this.buildVertices(curve_vertices, n_rows)

    this.vertex_positions = vertices.map((v) => v.position).flat()
    this.vertex_normals = vertices.map((v) => v.normal).flat()

    this.vertex_indices = this.buildVertexIndices(curve_vertices, n_rows)

  }

  getVertexPositions() {
    return this.vertex_positions
  }

  getVertexNormals() {
    return this.vertex_normals
  }

  getVertexIndices() {
    return this.vertex_indices
  }

  buildVertices(curve_vertices, n_rows) {
    let vertices = []

    for (let i = 0; i <= n_rows; i++) {
      let u = i/n_rows
      let vertex_slice = this.getVertexSlice(u, curve_vertices)
      vertices.push.apply(vertices, vertex_slice)
    }

    return vertices
  }

  buildVertexIndices(curve_vertices, n_rows) {
    let vertex_indices = []

    let n_columns = curve_vertices.length
    for (let i = 0; i < n_rows - 1; i++) {
      for (let j = 0; j < (n_columns); j++) {
        vertex_indices.push(i + j * n_columns)
        vertex_indices.push(i + j * n_columns + 1)
      }
      vertex_indices.push(i);
    }

    return vertex_indices
  }

  getVertexSlice(u, curve_vertices) {
    let vertex_slice = []
    for (let i = 0; i < curve_vertices.length; i++) {
      let vertex = curve_vertices[i]

      let pos_x = vertex.position[0]
      let pos_y = u*2
      let pos_z = vertex.position[2]

      let normal_x = vertex.normal[0]
      let normal_y = vertex.normal[1]
      let normal_z = vertex.normal[2]

      vertex = {
        position: [pos_x, pos_y, pos_z],
        normal: [normal_z, normal_y, normal_z]
      }

      vertex_slice.push(vertex)
    }

    return vertex_slice
  }
}
