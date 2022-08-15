class SweepSurface {
  constructor(curve, n_rows, lids=false) {
    let curve_vertices = curve.getVertices()
    let vertices = this.buildVertices(curve_vertices, n_rows, lids) 
    /* 
    Hacer un pattern ¿Decorator? 
      Surface podría recibir un SurfaceDecorator, por ejemplo un LiddedSweepSurfaceDecorator 
      que dentro usa un SweepSurfaceDecorator, el SweepSurfaceDecorator directamente, o un 
      RevolutionSurfaceDecorator. Así no sería necesario usar el parámetro lids
    */

    this.vertex_positions = vertices.map((v) => v.position).flat()
    this.vertex_normals = vertices.map((v) => v.normal).flat()
    this.vertex_uv_coordinates = vertices.map((v) => [0,0]).flat() // Hacer de verdad

    this.vertex_indices = this.buildVertexIndices(curve_vertices, n_rows, lids)

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

  buildVertices(curve_vertices, n_rows, lids) {
    let vertices = []

    for (let i = 0; i <= n_rows; i++) {
      let u = i/n_rows
      let vertex_slice = this.getVertexSlice(u, curve_vertices)
      vertices.push.apply(vertices, vertex_slice)
    }

    if (lids) {
      let len = curve_vertices.length

      let bottom_vertex_pos = [0,0,0]
      let top_vertex_pos = [0,1,0]
      for (let i = 0; i < len; i++) {
        bottom_vertex_pos[0] += vertices[i].position[0]
        bottom_vertex_pos[2] += vertices[i].position[2]

        top_vertex_pos[0] += vertices[i].position[0]
        top_vertex_pos[2] += vertices[i].position[2]
      }

      bottom_vertex_pos[0] = bottom_vertex_pos[0]/len
      bottom_vertex_pos[2] = bottom_vertex_pos[2]/len

      top_vertex_pos[0] = top_vertex_pos[0]/len
      top_vertex_pos[2] = top_vertex_pos[2]/len

      let bottom_vertex = {
        position: bottom_vertex_pos,
        normal: [0, -1, 0]
      }

      let top_vertex = {
        position: top_vertex_pos,
        normal: [0, 1, 0]
      }

      vertices.unshift(bottom_vertex)
      vertices.push(top_vertex)
    }


    return vertices
  }

  buildVertexIndices(curve_vertices, n_rows, lids) {
    let vertex_indices = []

    let n_columns = curve_vertices.length
    for (let i = 0; i < n_rows; i++) {
      for (let j = 0; j < (n_columns); j++) {
        vertex_indices.push(i + j * n_columns)
        vertex_indices.push(i + j * n_columns + 1)
      }
      vertex_indices.push(i);
    }

    if (lids) {
      let bottom_lid = []
      let top_lid = []

      let n_vertices = (n_rows + n_columns * (n_columns - 1))
      for (let i = 1; i < curve_vertices.length; i++){
        bottom_lid.push(0)
        bottom_lid.push(i)

        top_lid.push(n_vertices - 1)
        top_lid.push(n_vertices - 1 - i)
      }

      vertex_indices = bottom_lid.concat(vertex_indices).concat(top_lid)
    }
    return vertex_indices
  }

  getVertexSlice(u, curve_vertices) {
    let vertex_slice = []
    for (let i = 0; i < curve_vertices.length; i++) {
      let vertex = curve_vertices[i]

      let pos_x = vertex.position[0]
      let pos_y = u
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
