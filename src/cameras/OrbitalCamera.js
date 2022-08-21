export default class OrbitalCamera {
  constructor(position, angle) {
    this.position = position
    this.angle = angle
  }

  getViewMatrix(_position, _angle) {
    let view_matrix = glMatrix.mat4.create()

    glMatrix.mat4.translate(view_matrix, view_matrix, this.position)

    glMatrix.mat4.rotateX(view_matrix, view_matrix, this.angle[0])
    glMatrix.mat4.rotateY(view_matrix, view_matrix, this.angle[1])
    glMatrix.mat4.rotateZ(view_matrix, view_matrix, this.angle[2])

    return view_matrix
  }
}