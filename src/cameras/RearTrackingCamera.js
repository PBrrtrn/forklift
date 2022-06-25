class RearTrackingCamera {
  constructor() {
    this.view_matrix = mat4.create()
  }

  update(center_position, center_angle) {
    mat4.identity(this.view_matrix)
    mat4.translate(this.view_matrix, this.view_matrix, [0, 0, -7])
    mat4.translate(this.view_matrix, this.view_matrix, [0, -2, 0])
    mat4.translate(this.view_matrix, this.view_matrix, center_position)
    mat4.rotateY(this.view_matrix, this.view_matrix, - center_angle[1] + (Math.PI/2))
  }

  getViewMatrix() {
    return this.view_matrix
  }
}