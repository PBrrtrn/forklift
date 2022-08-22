export default class StraightLineXZ {
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

    let perp = [-l[2], 0, l[0]]
    let abs = Math.sqrt((perp[0]**2) + (perp[2]**2))

    let normal_vector = [perp[0]/abs, 0, perp[2]/abs]

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