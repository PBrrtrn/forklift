class QuadraticBSpline {
  constructor(control_points) {
    this.control_points = control_points
    this.segments = Math.floor(this.control_points.length/3)
  }

  getPoint(u) {
    let segment = (u < 1) ? Math.floor(u * (this.segments + 1)) : this.segments
    let local_u = u * (this.segments + 1) - segment

    let p0 = this.control_points[segment]
    let p1 = this.control_points[segment + 1]
    let p2 = this.control_points[segment + 2]

    let B0 = 1/2 * (1-local_u)*(1-local_u)
    let B1 = 1/2 + local_u*(1-local_u)
    let B2 = 1/2 * local_u*local_u

    return [
      B0*p0[0] + B1*p1[0] + B2*p2[0],
      B0*p0[1] + B1*p1[1] + B2*p2[1],
      B0*p0[2] + B1*p1[2] + B2*p2[2]
    ]
  }

}