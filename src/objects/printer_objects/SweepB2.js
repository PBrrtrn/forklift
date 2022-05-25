class SweepB2 extends Object3D {
  buildSurface(n_rows, n_columns) {
    let curve = this.buildCurve(n_columns)
    return new SweepSurface(curve, n_rows)
  }

  draw(gl, model_matrix, view_matrix, projection_matrix) {
    this.renderable.render(this.position, this.angle, this.scale, gl, 
                           model_matrix, view_matrix, projection_matrix)
  }

  buildCurve(n_columns) {
    let step_size = 1/n_columns
    let s = new QuadraticBSpline(step_size, [
      [0.63, 0.0, 0.77],
      [0.63, 0.0, 0.77],
      [0.63, 0.0, 0.77],
      [0.05, 0.0, 0.35], // Puntos medios
      [-0.2, 0.0, 0.98],
      [-0.2, 0.0, 0.98],
      [-0.25, 0.0, 0.3], // Puntos medios
      [-0.9, 0.0, 0.45],
      [-0.9, 0.0, 0.45],
      [-0.35, 0.0, 0.0], // Puntos medios
      [-0.9, 0.0, -0.4],
      [-0.9, 0.0, -0.4],
      [-0.25, 0.0, -0.25], // Puntos medios
      [-0.26, 0.0, -0.97],
      [-0.26, 0.0, -0.97],
      [0.0, 0.0, -0.3], // Puntos medios
      [0.59, 0.0, -0.81],
      [0.59, 0.0, -0.81],
      [0.25, 0.0, -0.1], // Puntos medios
      [1.0, 0.0, 0.0],
      [1.0, 0.0, 0.0],
      [0.25, 0.0, 0.2], // Puntos medios
      [0.63, 0.0, 0.77],
      [0.63, 0.0, 0.77],
      [0.63, 0.0, 0.77]
    ])

    return new Curve([s])
  }
}
