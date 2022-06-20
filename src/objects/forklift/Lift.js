class Lift extends Object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    let model_matrix = this.modelMatrix(parent_model_matrix)
    let normal_matrix = this.normalMatrix(model_matrix, view_matrix)

    this.vertical_beam_1.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.vertical_beam_2.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.horizontal_beam_1.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.horizontal_beam_2.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.horizontal_beam_3.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.platform.draw(gl, model_matrix, view_matrix, projection_matrix)
  }

  raisePlatform() {
    if (this.platform_height < 1) {
      this.platform_height += 0.035
      this.platform.translateY(0.03)
    }
  }

  lowerPlatform() {
    if (this.platform_height > 0) {
      this.platform_height -= 0.035
      this.platform.translateY(-0.03)
    }
  }

  initialize3dComponents(n_rows, n_columns, shader, gl) {
    this.vertical_beam_1 = new Cuboid(12, 12, shader, gl)
    this.vertical_beam_1.translateX(0.95)
    this.vertical_beam_1.translateZ(0.25)
    this.vertical_beam_1.scaleY(1.9)
    this.vertical_beam_1.scaleX(0.02)
    this.vertical_beam_1.scaleZ(0.035)

    this.vertical_beam_2 = new Cuboid(12, 12, shader, gl)
    this.vertical_beam_2.translateX(0.95)
    this.vertical_beam_2.translateZ(-0.25)
    this.vertical_beam_2.scaleY(1.9)
    this.vertical_beam_2.scaleX(0.02)
    this.vertical_beam_2.scaleZ(0.035)
    
    this.horizontal_beam_1 = new Cuboid(12, 12, shader, gl)
    this.horizontal_beam_1.translateY(0.1)
    this.horizontal_beam_1.translateX(0.95)
    this.horizontal_beam_1.scaleY(0.05)
    this.horizontal_beam_1.scaleX(0.03)
    this.horizontal_beam_1.scaleZ(0.3)

    this.horizontal_beam_2 = new Cuboid(12, 12, shader, gl)
    this.horizontal_beam_2.translateY(0.65)
    this.horizontal_beam_2.translateX(0.95)
    this.horizontal_beam_2.scaleY(0.05)
    this.horizontal_beam_2.scaleX(0.03)
    this.horizontal_beam_2.scaleZ(0.3)

    this.horizontal_beam_3 = new Cuboid(12, 12, shader, gl)
    this.horizontal_beam_3.translateY(1.2)
    this.horizontal_beam_3.translateX(0.95)
    this.horizontal_beam_3.scaleY(0.05)
    this.horizontal_beam_3.scaleX(0.03)
    this.horizontal_beam_3.scaleZ(0.3)

    this.platform = new Cuboid(12, 12, shader, gl)
    this.platform.translateY(0.3)
    this.platform.translateX(1.45)
    this.platform.scaleY(0.02)
    this.platform.scaleX(0.5)
    this.platform.scaleZ(0.5)

    this.platform_height = 0
  }
}
