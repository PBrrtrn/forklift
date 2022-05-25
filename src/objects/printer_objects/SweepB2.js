class SweepB2 extends Object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    let model_matrix = this.modelMatrix(parent_model_matrix)
    let normal_matrix = this.normalMatrix(model_matrix, view_matrix)

    this.renderable.render(gl, model_matrix, normal_matrix, 
                           view_matrix, projection_matrix)
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

  initialize3dComponents(n_rows, n_columns, shader, gl) {
    let curve = this.buildCurve(n_rows)
    let surface = new SweepSurface(curve, n_rows)

    this.renderable = new Renderable3D(shader, gl, surface)
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
