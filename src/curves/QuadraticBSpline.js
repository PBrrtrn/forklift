class QuadraticBSpline extends BSpline {
  getPoint(u) {
    let segment = (u < 1) ? Math.floor(u * (this.segments + 1)) : this.segments
    let local_u = u * (this.segments + 1) - segment

    let p0 = this.control_points[segment]
    let p1 = this.control_points[segment + 1]
    let p2 = this.control_points[segment + 2]

    let B0 = 1/2 * (1-local_u)*(1-local_u)
    let B1 = 1/2 + local_u*(1-local_u)
    let B2 = 1/2 * local_u*local_u

    let B0_d = 1 - local_u
    let B1_d = 1 - 2 * local_u
    let B2_d = local_u

    let vertex_position = [
      B0*p0[0] + B1*p1[0] + B2*p2[0],
      B0*p0[1] + B1*p1[1] + B2*p2[1],
      B0*p0[2] + B1*p1[2] + B2*p2[2]
    ]

    let derivative = [
      B0_d*p0[0] + B1_d*p1[0] + B2_d*p2[0],
      B0_d*p0[1] + B1_d*p1[1] + B2_d*p2[1],
      B0_d*p0[2] + B1_d*p1[2] + B2_d*p2[2]
    ]

    let perp = [
      Math.cos(1.5708)*derivative[0] - Math.sin(1.5708)*derivative[1],
      Math.sin(1.5708)*derivative[0] + Math.cos(1.5708)*derivative[1]
    ]

    let abs = Math.sqrt((perp[0]**2) + (perp[1]**2))

    let vertex_normal = [perp[0]/abs, perp[1]/abs, 0]

    return {
      position: vertex_position,
      normal: vertex_normal
    }
  }

}

QuadraticBSpline.degree = 3
