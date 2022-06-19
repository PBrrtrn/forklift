class StraightLineXY {
  constructor(start_position, end_position) {
    this.start_position = start_position
    this.end_position = end_position
  }

  getVertices() {
    let l = [
      this.end_position[0] - this.start_position[0],
      this.end_position[1] - this.start_position[1],
      this.end_position[2] - this.start_position[2]
    ]

    let perp = [-l[1], l[0], 0]
    let abs = Math.sqrt((perp[0]**2) + (perp[1]**2))

    let normal_vector = [perp[0]/abs, perp[1]/abs, 0]

    return [
      {
        position: this.start_position,
        normal: normal_vector
      },
      {
        position: this.end_position,
        normal: normal_vector
      }
    ]
  }
}