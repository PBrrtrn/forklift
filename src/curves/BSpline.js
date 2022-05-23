class BSpline {

  constructor(step_size, control_points) {
    this.step_size = step_size
    this.control_points = control_points
    this.segments = this.control_points.length - this.constructor.degree
  }

  getVertices() {
    let vertices = []
    for (let u = 0; u < 1 - this.step_size; u += this.step_size) {
      let vertex = this.getPoint(u)
      vertices.push(vertex)
    }

    return vertices
  }
}
