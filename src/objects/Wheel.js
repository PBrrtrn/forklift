const n_rows = 4

class Wheel extends Object3D {
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
    let step_size = 1 / (n_rows - 4)
    let s1 = new StraightLine([[0, -0.5, 0], [-0.4, -0.5, 0]])
    let s2 = new QuadraticBSpline(step_size, [
      [-0.4, -0.5, 0],
      [-0.6, -0.6, 0],
      [-0.6, -0.6, 0],
      [-0.9, -0.6, 0],
      [-0.9, -0.1, 0],
      [-0.6, -0.1, 0],
      [-0.6, -0.1, 0],
      [-0.4, -0.2, 0],
      [-0.4, -0.2, 0]
    ])
    let s3 = new StraightLine([[-0.4, -0.2, 0], [0, -0.2, 0], [0, -0.2, 0]])

    return new Curve([s1, s2, s3])
  }
}
