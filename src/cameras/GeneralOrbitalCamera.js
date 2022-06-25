class GeneralOrbitalCamera {
  constructor(position, angle) {
    this.position = position
    this.angle = angle
  }

  update(center, angle) {
    // pass
  }

  getViewMatrix() {
    let view_matrix = glMatrix.mat4.create()

    mat4.translate(view_matrix, view_matrix, this.position)

    mat4.rotateX(view_matrix, view_matrix, this.angle[0])
    mat4.rotateY(view_matrix, view_matrix, this.angle[1])
    mat4.rotateZ(view_matrix, view_matrix, this.angle[2])

    return view_matrix
  }
}