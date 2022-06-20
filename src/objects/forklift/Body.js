class Body extends Object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    let model_matrix = this.modelMatrix(parent_model_matrix)
    let normal_matrix = this.normalMatrix(model_matrix, view_matrix)

    this.renderable.render(gl, model_matrix, normal_matrix,
                           view_matrix, projection_matrix)
  }

  initialize3dComponents(n_rows, n_columns, shader, gl) {
    let curve = this.buildCurve(n_columns)
    let surface = new SweepSurface(curve, n_rows, true)

    this.renderable = new Renderable3D(shader, gl, surface)
  }

  buildCurve(n_columns) {
    let s1 = new StraightLineXZ([0.7, 0.0, -0.4], [-0.7, 0.0, -0.4])
    let s2 = new StraightLineXZ([-0.7, 0.0, -0.4], [-0.9, 0.0, -0.15])
    let s3 = new StraightLineXZ([-0.9, 0.0, -0.15], [-0.9, 0.0, 0.15])
    let s4 = new StraightLineXZ([-0.9, 0.0, 0.15], [-0.7, 0.0, 0.4])
    let s5 = new StraightLineXZ([-0.7, 0.0, 0.4], [0.7, 0.0, 0.4])
    let s6 = new StraightLineXZ([0.7, 0.0, 0.4], [0.9, 0.0, 0.15])
    let s7 = new StraightLineXZ([0.9, 0.0, 0.15], [0.9, 0.0, -0.15])
    let s8 = new StraightLineXZ([0.9, 0.0, -0.15], [0.7, 0.0, -0.4])

    return new Curve([s1, s2, s3, s4, s5, s6, s7, s8])
  }
}