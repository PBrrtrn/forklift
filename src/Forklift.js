class Forklift {
  constructor() {
    this.position_x = 0.0
    this.position_y = 0.0
    this.position_z = 0.0

    this.angle = 0.0

    this.lift_elevation = 0.0
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
    this.angle += 0.1
  }

  turnLeft() {
    this.angle -= 0.1
  }

  raise() {
    if (this.lift_elevation < 1.0)
      this.lift_elevation += 0.1
  }

  lower() {
    if (this.lift_elevation > 0.0)
      this.lift_elevation -= 0.1
  }

  grabObject() {
    // Implement
  }


}