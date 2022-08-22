import Object3D from '../Object3D.js'
import Cuboid from '../Cuboid.js'

export default class PrinterArm extends Object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    let model_matrix = this.modelMatrix(parent_model_matrix)

    this.dock.draw(gl, model_matrix, view_matrix, projection_matrix)

    this.beam.translateZ(-0.05)
    this.beam.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.beam.translateZ(0.1)
    this.beam.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.beam.translateZ(-0.05)

    this.base.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.screen.draw(gl, model_matrix, view_matrix, projection_matrix)
  }

  initialize3dComponents(_n_rows, _n_columns, shader, textures, gl) {
    this.dock = new Cuboid(10, 10, shader, textures.dock, gl)
    this.dock.scaleX(0.1)
    this.dock.scaleZ(0.15)
    this.dock.scaleY(0.2)

    this.beam = new Cuboid(10, 10, shader, textures.beam, gl)
    this.beam.translateX(-0.3)
    this.beam.scaleX(0.25)
    this.beam.scaleZ(0.03)
    this.beam.scaleY(0.05)

    this.base = new Cuboid(10, 10, shader, textures.base, gl)
    this.base.translateX(-0.6)
    this.base.scaleX(0.1)
    this.base.scaleZ(0.15)
    this.base.scaleY(0.1)

    this.screen = new Cuboid(10, 10, shader, textures.screen, gl)
    this.screen.translateX(-0.6)
    this.screen.scaleX(0.4)
    this.screen.scaleZ(0.4)
    this.screen.scaleY(0.025)
  }

}