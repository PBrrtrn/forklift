class Forklift extends Object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    let model_matrix = this.modelMatrix(parent_model_matrix)

    this.wheel1.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.wheel2.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.wheel3.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.wheel4.draw(gl, model_matrix, view_matrix, projection_matrix)

    this.chassis.draw(gl, model_matrix, view_matrix, projection_matrix)
  }

  moveForward() {
    this.translateX(Math.sin(this.angle[1] + Math.PI/2) * 0.1 )
    this.translateZ(Math.cos(this.angle[1] + Math.PI/2) * 0.1 )

    this.wheel1.rotateY(-0.2)
    this.wheel2.rotateY(-0.2)
    this.wheel3.rotateY(-0.2)
    this.wheel4.rotateY(-0.2)
  }

  moveBackwards() {
    this.translateX(Math.sin(this.angle[1] + Math.PI/2) * -0.1 )
    this.translateZ(Math.cos(this.angle[1] + Math.PI/2) * -0.1 )
  }

  turnLeft() {
    this.rotateY(0.1)
  }

  turnRight() {
    this.rotateY(-0.1)
  }

  grabObject(object) {
    // TODO: Implement
  }

  raisePlatform() {
    this.chassis.raisePlatform()
  }

  lowerPlatform() {
    this.chassis.lowerPlatform()
  }

  initialize3dComponents(n_rows, n_columns, shader, textures, gl) {
    this.wheel1 = new Wheel(n_rows, n_columns, shader, textures.wheel, gl)
    this.wheel1.translateZ(1.5)
    this.wheel1.translateX(1.5)
    this.wheel1.rotateX(Math.PI/2)

    this.wheel2 = new Wheel(n_rows, n_columns, shader, textures.wheel, gl)
    this.wheel2.translateZ(1.5)
    this.wheel2.translateX(-1.5)
    this.wheel2.rotateX(Math.PI/2)

    this.wheel3 = new Wheel(n_rows, n_columns, shader, textures.wheel, gl)
    this.wheel3.translateZ(-1.5)
    this.wheel3.translateX(1.5)
    this.wheel3.rotateX(Math.PI/2)

    this.wheel4 = new Wheel(n_rows, n_columns, shader, textures.wheel, gl)
    this.wheel4.translateZ(-1.5)
    this.wheel4.translateX(-1.5)
    this.wheel4.rotateX(Math.PI/2)

    this.chassis = new Chassis(n_rows, n_columns, shader, textures.chassis, gl)
    this.chassis.translateY(-0.4)
    this.chassis.translateZ(-0.35)
    this.chassis.scaleX(3)
    this.chassis.scaleY(5)
    this.chassis.scaleZ(3)
  }
}
