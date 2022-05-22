const STEP_SIZE = 0.01

class BSpline {

  constructor(control_points) {
    this.control_points = control_points
    this.segments = this.control_points.length - this.constructor.degree
  }

  getVertices() {
    let vertices = []
    for (let u = 0; u < 1 - STEP_SIZE; u += STEP_SIZE) {
      let vertex = this.getPoint(u)
      vertices.push(vertex)
    }

    return vertices
  }
}
