class CubicBSpline extends BSpline {
  getPoint(u) {
    let segment = (u < 1) ? Math.floor(u * (this.segments + 1)) : this.segments
    let local_u = u * (this.segments + 1) - segment

    let p0 = this.control_points[segment]
    let p1 = this.control_points[segment + 1]
    let p2 = this.control_points[segment + 2]
    let p3 = this.control_points[segment + 3]

    let u2 = u*u
    let u3 = u*u*u

    let B0 = 1/6 * (1 - 3*u + 3*u2 - u3)
    let B1 = 1/6 * (4 - 6*u2 + 3*u3)
    let B2 = 1/6 * (1 - 3*u + 3*u2 - 3*u3)
    let B3 = 1/6 * u3

    return [
      B0*p0[0] + B1*p1[0] + B2*p2[0] + B3*p3[0],
      B0*p0[1] + B1*p1[1] + B2*p2[1] + B3*p3[1],
      B0*p0[2] + B1*p1[2] + B2*p2[2] + B3*p3[2]
    ]
  }
}

CubicBSpline.degree = 4
