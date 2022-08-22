export default class Curve {
  constructor(segments) {
    this.segments = segments
  }

  getVertices() {
    let vertices = []
    for (let i = 0; i < this.segments.length; i++) {
      let segment_vertices = this.segments[i].getVertices()
      vertices.push.apply(vertices, segment_vertices)
    }

    return vertices
  }
}
