class RevolutionSurface {
  constructor(curve, n_slices) {
    let curve_vertices = curve.getVertices()
    let vertices = this.buildVertices(curve_vertices, n_slices)

    this.vertex_positions = vertices.map((v) => v.position).flat()
    this.vertex_normals = vertices.map((v) => v.normal).flat()
    this.vertex_uv_coordinates = vertices.map((v) => v.uv_coordinates).flat()

    this.vertex_indices = this.buildVertexIndices(curve_vertices, n_slices)
  }

  getVertexPositions() {
    return this.vertex_positions
  }

  getVertexNormals() {
    return this.vertex_normals
  }
  
  getVertexUvCoordinates() {
    return this.vertex_uv_coordinates
  }

  getVertexIndices() {
    return this.vertex_indices
  }

  buildVertices(curve_vertices, n_slices) {
    let vertices = []

    for (let i = 0; i <= n_slices; i++) {
      let u = (i/n_slices)
      let vertex_slice = this.getVertexSlice(u, curve_vertices)

      vertices.push.apply(vertices, vertex_slice)
    }

    return vertices
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

  getVertexSlice(u, curve_vertices) {
    let phi = u * 2 * Math.PI
    let vertex_slice = []
    for (let i = 0; i < curve_vertices.length; i++) {
      let v = i/curve_vertices.length

      let curve_vertex = curve_vertices[i]

      let pos_x = curve_vertex.position[0]*Math.cos(phi)
      let pos_y = curve_vertex.position[1]
      let pos_z = curve_vertex.position[0]*Math.sin(phi)

      let normal_x = curve_vertex.normal[0]*Math.cos(phi)
      let normal_y = curve_vertex.normal[1]
      let normal_z = curve_vertex.normal[0]*Math.sin(phi)

      let vertex = {
        position: [pos_x, pos_y, pos_z],
        normal: [normal_x, normal_y, normal_z],
        uv_coordinates: [u,v]
      }

      vertex_slice.push(vertex)
    }

    return vertex_slice
  }

}
