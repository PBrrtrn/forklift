class RevolutionSurface {
  constructor(curve, n_columns) {
    let curve_vertices = curve.getVertices()

    this.vertex_positions = this.buildVertexPositions(curve_vertices, n_columns)
    this.vertex_normals = this.buildVertexNormals(this.vertex_positions)
    this.vertex_indices = this.buildVertexIndices(curve_vertices, n_columns)
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

  buildVertexPositions(curve_vertices, n_columns) {
    let vertex_positions = []

    for (let i = 0; i <= n_columns; i++) {
      let phi = (i/n_columns) * 2 * Math.PI
      let vertex_slice = this.getVertexSlice(phi, curve_vertices)

      vertex_positions.push.apply(vertex_positions, vertex_slice)
    }

    return vertex_positions
  }

  buildVertexNormals(vertex_positions, curve_vertices) {
    return vertex_positions // SOLO DE PRUEBA, REEMPLAZAR CON LAS NORMALES REALES
  }

  buildVertexIndices(curve_vertices, n_columns) {
    let vertex_indices = []
    let n_rows = curve_vertices.length
    for (let i = 0; i < (n_rows); i++) {
      vertex_indices.push(i*n_columns)

      for (let j = 0; j < (n_columns-1); j++) {
        vertex_indices.push(i*n_columns+j);
        vertex_indices.push((i+1)*n_columns+j);
        vertex_indices.push(i*n_columns+j+1);
        vertex_indices.push((i+1)*n_columns+j+1);
      }
      vertex_indices.push((i+1) * n_columns + n_columns - 1);
    }
    return vertex_indices
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