class Forklift {
  constructor(gl, shader) {
    this.position_x = 0.0
    this.position_z = 0.0

    this.rotation = 0.0

    this.lift_elevation = 0.0

    this.wheel1 = new Wheel(gl, shader)
    this.wheel2 = new Wheel(gl, shader)
    this.wheel3 = new Wheel(gl, shader)
    this.wheel4 = new Wheel(gl, shader)

    // this.chassis = new Chassis(gl)
    // this.lift = new Lift(gl)
  }

  draw() {
    // Implementar
  }

  moveForward() {
    this.position_x += 0.1
  }

  moveBack() {
    this.position_x -= 0.1
  }

  turnRight() {
    this.rotation += 0.1
  }

  turnLeft() {
    this.rotation -= 0.1
  }

  raise() {
    if (this.lift_elevation < 1.0)
      this.lift_elevation += 0.1
  }

  lower() {
    if (this.lift_elevation > 0.0)
      this.lift_elevation -= 0.1
  }

  grabObject(object) {
    // Implement
  }


}