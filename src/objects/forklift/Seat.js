class Seat extends Object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    let model_matrix = this.modelMatrix(parent_model_matrix)
    let normal_matrix = this.normalMatrix(model_matrix, view_matrix)

    this.renderable.render(gl, model_matrix, normal_matrix,
                           view_matrix, projection_matrix)
  }

  initialize3dComponents(n_rows, n_columns, shader, gl) {
    let curve = this.buildCurve(n_columns)
    let surface = new SweepSurface(curve, n_rows)

    this.renderable = new Renderable3D(shader, null, gl, surface)
  }

  buildCurve(n_columns) {
  }
}