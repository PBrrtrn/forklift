class SweepB2 extends Object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    let model_matrix = this.modelMatrix(parent_model_matrix)
    let normal_matrix = this.normalMatrix(model_matrix, view_matrix)

    this.renderable.render(gl, model_matrix, normal_matrix, 
                           view_matrix, projection_matrix)
  }

  initialize3dComponents(n_rows, n_columns, shader, gl) {
    let curve = this.buildCurve(n_columns)
    let surface = new SweepSurface(curve, n_rows)

    this.renderable = new Renderable3D(shader, gl, surface)
  }

  buildCurve(n_columns) {
    let step_size = 1/n_columns
    let s = new QuadraticBSpline(step_size, [
      [0.63, 0.0, 0.77],
      [0.63, 0.0, 0.77],
      [0.25, 0.0, 0.2], // Puntos medios
      [1.0, 0.0, 0.0],
      [1.0, 0.0, 0.0],
      [0.25, 0.0, -0.1], // Puntos medios
      [0.59, 0.0, -0.81],
      [0.59, 0.0, -0.81],
      [0.0, 0.0, -0.3], // Puntos medios
      [-0.26, 0.0, -0.97],
      [-0.26, 0.0, -0.97],
      [-0.25, 0.0, -0.25], // Puntos medios
      [-0.9, 0.0, -0.4],
      [-0.9, 0.0, -0.4],
      [-0.35, 0.0, 0.0], // Puntos medios
      [-0.9, 0.0, 0.45],
      [-0.9, 0.0, 0.45],
      [-0.25, 0.0, 0.3], // Puntos medios
      [-0.2, 0.0, 0.98],
      [-0.2, 0.0, 0.98],
      [0.05, 0.0, 0.35], // Puntos medios
      [0.63, 0.0, 0.77],
      [0.63, 0.0, 0.77],
    ])

    return new Curve([s])
  }
}
