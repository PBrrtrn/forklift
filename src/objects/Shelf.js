class Shelf extends Object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    let model_matrix = this.modelMatrix(parent_model_matrix)

    for (let i = 0; i < 9; i++) {
      this.beam.translateX(i)
      this.beam.draw(gl, model_matrix, view_matrix, projection_matrix)

      this.beam.translateZ(0.65)
      this.beam.draw(gl, model_matrix, view_matrix, projection_matrix)
      this.beam.translateZ(-0.65)

      this.beam.translateX(-i)
    }

    this.plank.translateY(1)
    for (let i = 0; i < 3; i++) {
      this.plank.draw(gl, model_matrix, view_matrix, projection_matrix)
      this.plank.translateY(1.7)
    }
    this.plank.position[1] = 0
    
  }

  initialize3dComponents(n_rows, n_columns, shader, textures, gl) {
    this.beam = new Cuboid(n_rows, n_columns, shader, textures.beam, gl)
    this.beam.scaleY(10)
    this.beam.scaleX(0.02)
    this.beam.scaleZ(0.02)

    this.plank = new Cuboid(n_rows, n_columns, shader, textures.plank, gl)
    this.plank.translateZ(0.3)
    this.plank.translateX(4.1)
    this.plank.scaleY(0.1)
    this.plank.scaleX(4.2)
    this.plank.scaleZ(0.5)
  }

}