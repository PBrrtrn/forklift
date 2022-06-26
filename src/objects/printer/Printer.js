class Printer extends Object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    let model_matrix = this.modelMatrix(parent_model_matrix)

    this.base.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.arm_stand.draw(gl, model_matrix, view_matrix, projection_matrix)
    this.printer_arm.draw(gl, model_matrix, view_matrix, projection_matrix)

    if (this.printing) {
      if (this.printer_arm_position < 1){
        this.printer_arm.translateY(0.01)
        this.printer_arm_position += 0.013
      } else {
        this.printing = false
      }
    }

    if (this.object) {
      this.object.draw(gl, model_matrix, view_matrix, projection_matrix)
    }
  }

  print(object) {
    this.object = object
    this.object.translateY(0.25)
    this.object.scaleX(0.4)
    this.object.scaleY(0.4)
    this.object.scaleZ(0.4)

    this.printing = true
  }

  discard_object() {
    this.object = null
  }

  initialize3dComponents(n_rows, n_columns, shader, gl) {
    this.base = new Wheel(n_rows, n_columns, shader, gl)
    this.base.scaleY(2)

    this.arm_stand = new Cuboid(10, 10, shader, gl)
    this.arm_stand.translateY(-0.25)
    this.arm_stand.translateX(0.7)
    this.arm_stand.scaleX(0.025)
    this.arm_stand.scaleY(2.5)
    this.arm_stand.scaleZ(0.025)

    this.printer_arm = new PrinterArm(n_rows, n_columns, shader, gl)
    this.printer_arm.translateY(-0.1)
    this.printer_arm.translateX(0.7)
    this.printer_arm_position = 0

    this.object = null
  }

}