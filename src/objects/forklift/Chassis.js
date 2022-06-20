class Chassis extends Object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    let model_matrix = this.modelMatrix(parent_model_matrix)
    let normal_matrix = this.normalMatrix(model_matrix, view_matrix)

    this.body.draw(gl, model_matrix, view_matrix, projection_matrix)
    // this.front.draw(gl, model_matrix, view_matrix, projection_matrix)
    // this.seat.draw(gl, model_matrix, view_matrix, projection_matrix)
    // this.lift.draw(gl, model_matrix, view_matrix, projection_matrix)
  }

  initialize3dComponents(n_rows, n_columns, shader, gl) {
    this.body = new Body(n_rows, n_columns, shader, gl)
    // this.front = new Front(n_rows, n_columns, shader, gl)
    // this.seat = new Seat(n_rows, n_columns, shader, gl)
    // this.lift = new Lift(n_rows, n_columns, shader, gl)
  }
}