export default class TrackingCamera {
  constructor(distance, angle) {
    this.distance = distance
    this.angle = angle
  }

  getViewMatrix(center_position, center_angle) {
    let pos = center_position.map(e => -e)

    let view_matrix = glMatrix.mat4.create()
    glMatrix.mat4.translate(view_matrix, view_matrix, this.distance)
    glMatrix.mat4.rotateY(view_matrix, view_matrix, -center_angle[1] - this.angle)
    glMatrix.mat4.translate(view_matrix, view_matrix, pos)
    glMatrix.mat4.translate(view_matrix, view_matrix, [0,-1,0])

    return view_matrix
  }
}