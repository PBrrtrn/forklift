export default class SweepSurface {
  constructor(curve, n_rows, lids=false) {
    let curve_vertices = curve.getVertices()
    let vertices = this.buildVertices(curve_vertices, n_rows, lids) 

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

    if (lids) {
      let bottom_lid = []

      let lid_center_vertex_position = [0,0,0]
      for (let vertex of curve_vertices) {
        let lid_vertex = {
          position: vertex.position,
          normal: [0,-1,0] // TODO: Incluir coordenada UV
        }
        bottom_lid.push(lid_vertex)
        lid_center_vertex_position[0] += vertex.position[0]
        lid_center_vertex_position[2] += vertex.position[2]
      }
      lid_center_vertex_position[0] = lid_center_vertex_position[0] / curve_vertices.length
      lid_center_vertex_position[2] = lid_center_vertex_position[2] / curve_vertices.length

      let lid_center_vertex = {
        position: lid_center_vertex_position,
        normal: [0,-1,0]
      }

      bottom_lid.unshift(lid_center_vertex)
      vertices.push.apply(vertices, bottom_lid)
    }

    for (let i = 0; i <= n_rows; i++) {
      let y = i/n_rows
      for (let vertex of curve_vertices) {
        vertices.push({
          position: [vertex.position[0], y, vertex.position[2]],
          normal: vertex.normal
        })
      }
    }

    if (lids) {
      let top_lid = []

      let lid_center_vertex_position = [0,0,0]
      for (let vertex of curve_vertices) {
        let lid_vertex = {
          position: [vertex.position[0], 1, vertex.position[2]],
          normal: [0,1,0] // TODO: Incluir coordenada UV
        }
        top_lid.push(lid_vertex)
        lid_center_vertex_position[0] += vertex.position[0]
        lid_center_vertex_position[2] += vertex.position[2]
      }
      lid_center_vertex_position[0] = lid_center_vertex_position[0] / curve_vertices.length
      lid_center_vertex_position[2] = lid_center_vertex_position[2] / curve_vertices.length

      let lid_center_vertex = {
        position: lid_center_vertex_position,
        normal: [0,1,0]
      }

      top_lid.push(lid_center_vertex)
      vertices.push.apply(vertices, top_lid)
    }

    return vertices
  }

  buildVertexIndices(curve_vertices, n_rows, lids) {
    let indices = []

    if (lids) {
      for (let i = 1; i <= curve_vertices.length; i++) {
        indices.push(0)
        indices.push(i)
      }
    }

    let vertices = this.buildVertices(curve_vertices, n_rows, lids)

    let n_vertices = curve_vertices.length
    let start = (lids ? n_vertices + 1 : 0)
    for (let i = 0; i < n_rows; i++) {
      for (let j = 0; j < n_vertices; j++) {
        indices.push(start + j + n_vertices * i)
        indices.push(start + j + (n_vertices * (i+1)))
      }
    }

    if (lids) {
      let total_vertices = curve_vertices.length * (n_rows + 1) + (curve_vertices.length + 1) * 2
      let start = total_vertices - curve_vertices.length - 1
      indices.push(total_vertices - 1)
      indices.push(total_vertices - 1)
      for (let i = start; i < total_vertices; i++) {
        indices.push(i)
        indices.push(total_vertices - 1)
      }
    }

    return indices
  }

}
