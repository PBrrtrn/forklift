class RevolutionA1 extends Object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    let model_matrix = this.modelMatrix(parent_model_matrix)
    let normal_matrix = this.normalMatrix(model_matrix, view_matrix)

    this.renderable.render(gl, model_matrix, normal_matrix,
                           view_matrix, projection_matrix)
  }

  initialize3dComponents(n_rows, n_columns, shader, gl) {
    let curve = this.buildCurve(n_rows)
    let surface = new RevolutionSurface(curve, n_columns)

    this.renderable = new Renderable3D(shader, gl, surface)
  }

  buildCurve(n_rows) {
    let step_size = 1 / (n_rows - 6)

    let s1 = new StraightLineXY([0.0, -0.9, 0.0], [-0.9, -0.9, 0.0])
    let s2 = new StraightLineXY([-0.9, -0.9, 0.0], [-0.9, -0.6, 0.0])
    let s3 = new QuadraticBSpline(step_size, [
      [-0.9, -0.6, 0.0],
      [-0.9, -0.6, 0.0],
      [-0.9, -0.6, 0.0],
      [-0.1, -0.5, 0.0],
      [-0.6, 0.0, 0.0],
      [-0.1, 0.5, 0.0],
      [-0.9, 0.6, 0.0],
      [-0.9, 0.6, 0.0],
      [-0.9, 0.6, 0.0],
    ])
    let s4 = new StraightLineXY([-0.9, 0.6, 0.0], [-0.9, 0.9, 0.0])
    let s5 = new StraightLineXY([-0.9, 0.9, 0.0], [0.0, 0.9, 0.0])

    return new Curve([s1, s2, s3, s4, s5])
  }
}
