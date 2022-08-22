export default class Object3D {
  constructor(n_rows, n_columns, shader, textures, gl) {
    this.position = [0.0, 0.0, 0.0]
    this.angle = [0.0, 0.0, 0.0]
    this.scale = [1.0, 1.0, 1.0]

    this.initialize3dComponents(n_rows, n_columns, shader, textures, gl)
  }

  render(gl, model_matrix, view_matrix, projection_matrix) {
    throw "Must implement in derived classes"
  }

  rotateX(angle) {
    this.angle[0] = (this.angle[0] + angle) % (2*Math.PI)
  }

  rotateY(angle) {
    this.angle[1] = (this.angle[1] + angle) % (2*Math.PI)
  }

  rotateZ(angle) {
    this.angle[2] = (this.angle[2] + angle) % (2*Math.PI)
  }

  translateX(distance) {
    this.position[0] += distance
  }

  translateY(distance) {
    this.position[1] += distance
  }

  translateZ(distance) {
    this.position[2] += distance
  }

  scaleX(factor) {
    this.scale[0] = this.scale[0]*factor
  }

  scaleY(factor) {
    this.scale[1] = this.scale[1]*factor
  }

  scaleZ(factor) {
    this.scale[2] = this.scale[2]*factor
  }

  modelMatrix(parent_model_matrix) {
    let model_matrix = glMatrix.mat4.clone(parent_model_matrix)

    glMatrix.mat4.translate(model_matrix, model_matrix, this.position)

    glMatrix.mat4.rotateX(model_matrix, model_matrix, this.angle[0])
    glMatrix.mat4.rotateY(model_matrix, model_matrix, this.angle[1])
    glMatrix.mat4.rotateZ(model_matrix, model_matrix, this.angle[2])

    glMatrix.mat4.scale(model_matrix, model_matrix, this.scale)

    return model_matrix
  }

  normalMatrix(model_matrix, view_matrix) {
    let normal_matrix = glMatrix.mat4.create()

    glMatrix.mat4.identity(normal_matrix)
    glMatrix.mat4.multiply(normal_matrix, view_matrix, model_matrix)
    glMatrix.mat4.invert(normal_matrix, normal_matrix)
    glMatrix.mat4.transpose(normal_matrix, normal_matrix)

    return normal_matrix
  }

  initialize3dComponents(n_rows, n_columns, shader, textures, gl) {
    throw "Must implement in derived classes"
  }
}