class RevolutionSurface {
  constructor(curve, n_slices) {
    let curve_vertices = curve.getVertices()

    this.vertex_positions = this.buildVertexPositions(curve_vertices, n_slices)
    this.vertex_indices = this.buildVertexIndices(curve_vertices, n_slices)
    this.vertex_normals = this.buildVertexNormals()
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

  buildVertexPositions(curve_vertices, n_slices) {
    let vertex_positions = []

    for (let i = 0; i <= n_slices; i++) {
      let phi = (i/n_slices) * 2 * Math.PI
      let vertex_slice = this.getVertexSlice(phi, curve_vertices)

      vertex_positions.push.apply(vertex_positions, vertex_slice)
    }

    return vertex_positions
  }

  buildVertexIndices(curve_vertices, n_slices) {
    let n_vertices_per_slice = curve_vertices.length

    let vertex_indices = []
    for (let i = 0; i < n_vertices_per_slice - 1; i++) {
      for (let j = 0; j < n_slices; j++) {
        vertex_indices.push(i + j * n_vertices_per_slice)
        vertex_indices.push(i + j * n_vertices_per_slice + 1)
      }
      vertex_indices.push(i)
    }

    return vertex_indices
  }

  /*
  buildVertexIndices(curve_vertices, n_slices) {
    let vertex_indices = []
    let n_vertices_per_slice = curve_vertices.length
    for (let i = 0; i < (n_vertices_per_slice); i++) {
      for (let j = 0; j < (n_slices-1); j++) {
        vertex_indices.push(i*n_slices+j);
        vertex_indices.push(i*n_slices+j+1);
        vertex_indices.push((i+1)*n_slices+j);
        vertex_indices.push((i+1)*n_slices+j+1);
      }
    }
    return vertex_indices
  }
  */

  buildVertexNormals() {
    return this.vertex_positions // SOLO DE PRUEBA, REEMPLAZAR CON LAS NORMALES REALES
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