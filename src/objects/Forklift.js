class Forklift extends object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    // TODO: Implement
  }

  moveForward(distance) {
    // TODO: Implement
  }

  moveBackwards(distance) {
    // TODO: Implement
  }

  grabObject(object) {
    // TODO: Implement
  }

  raise() {
    // TODO: Implement
  }

  lower() {
    // TODO: Implement
  }

  initialize3dComponents(n_rows, n_columns, shader, gl) {
    this.wheel1 = new Wheel(n_rows, n_columns, shader, gl)
    this.wheel2 = new Wheel(n_rows, n_columns, shader, gl)
    this.wheel3 = new Wheel(n_rows, n_columns, shader, gl)
    this.wheel4 = new Wheel(n_rows, n_columns, shader, gl)

    this.chassis = new Chassis(n_rows, n_columns, shader, gl)

    this.lift = new Lift(n_rows, n_columns, shader, gl)
  }
}
