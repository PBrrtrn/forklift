class Object3D {
  constructor(n_rows, n_columns, shader, gl) {
    this.position = [0.0, 0.0, 0.0]
    this.angle = [0.0, 0.0, 0.0]
    this.scale = [1.0, 1.0, 1.0]

    let surface = this.buildSurface(n_rows, n_columns)
    this.renderable = new Renderable3D(shader, gl, surface)
  }

  draw(gl, model_matrix, view_matrix, projection_matrix) {
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

  buildSurface(n_rows, n_columns) {
    throw "Must implement in derived classes"
  }
}