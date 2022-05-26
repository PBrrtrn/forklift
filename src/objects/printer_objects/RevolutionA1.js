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

  modelMatrix(parent_model_matrix) {
    let model_matrix = mat4.clone(parent_model_matrix)

    mat4.translate(model_matrix, model_matrix, this.position)

    mat4.rotateX(model_matrix, model_matrix, this.angle[0])
    mat4.rotateY(model_matrix, model_matrix, this.angle[1])
    mat4.rotateZ(model_matrix, model_matrix, this.angle[2])

    mat4.scale(model_matrix, model_matrix, this.scale)

    return model_matrix
  }

  normalMatrix(model_matrix, view_matrix) {
    let normal_matrix = mat4.create()

    mat4.identity(normal_matrix)
    mat4.multiply(normal_matrix, view_matrix, model_matrix)
    mat4.invert(normal_matrix, normal_matrix)
    mat4.transpose(normal_matrix, normal_matrix)

    return normal_matrix
  }

  buildCurve(n_rows) {
    let step_size = 1 / (n_rows - 6)
    let s1 = new StraightLine([[0.0, 0.9, 0.0], [-0.9, 0.9, 0.0], [-0.9, 0.6, 0.0]])
    let s2 = new QuadraticBSpline(step_size, [
      [-0.9, 0.6, 0.0],
      [-0.9, 0.6, 0.0],
      [-0.9, 0.6, 0.0],
      [-0.1, 0.5, 0.0],
      [-0.6, 0.0, 0.0],
      [-0.1, -0.5, 0.0],
      [-0.9, -0.6, 0.0],
      [-0.9, -0.6, 0.0],
      [-0.9, -0.6, 0.0]
    ])
    let s3 = new StraightLine([[-0.9, -0.6, 0.0], [-0.9, -0.9, 0.0], [0.0, -0.9, 0.0]])

    return new Curve([s1, s2, s3])
  }
}
