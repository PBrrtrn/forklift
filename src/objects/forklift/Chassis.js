import Object3D from './../Object3D.js'

import Body from './Body.js'
import Lift from './Lift.js'
import Parallelepiped from './Parallelepiped.js'

export default class Chassis extends Object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    let model_matrix = this.modelMatrix(parent_model_matrix)
    let normal_matrix = this.normalMatrix(model_matrix, view_matrix)

    this.body.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.front.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.seat.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.lift.draw(gl, model_matrix, view_matrix, projection_matrix)
  }

  raisePlatform() {
    this.lift.raisePlatform()
  }

  lowerPlatform() {
    this.lift.lowerPlatform()
  }

  initialize3dComponents(n_rows, n_columns, shader, textures, gl) {
    this.body = new Body(n_rows, n_columns, shader, textures.body, gl)

    this.front = new Parallelepiped(n_rows, n_columns, shader, textures.front, gl)
    this.front.translateX(0.4)
    this.front.translateZ(-0.55)
    this.front.translateY(0.88)
    this.front.scaleY(0.75)
    this.front.scaleX(0.15)
    this.front.scaleZ(0.3)
    this.front.rotateX(Math.PI)

    this.seat = new Parallelepiped(n_rows, n_columns, shader, textures.seat, gl)
    this.seat.translateY(0.2)
    this.seat.translateX(-0.5)
    this.seat.translateZ(-0.8)
    this.seat.scaleY(0.6)
    this.seat.scaleX(0.15)
    this.seat.rotateZ(Math.PI)
    this.seat.rotateX(Math.PI)

    this.lift = new Lift(n_rows, n_columns, shader, textures.lift, gl)
    this.lift.translateY(0.5)
    this.lift.translateZ(0.3)
    this.lift.scaleY(2)
    this.lift.rotateX(-Math.PI/2)
  }
}