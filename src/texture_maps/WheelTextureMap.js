class WheelTextureMap {
  constructor(curve) {
    this.mapping = {}

    this.mapping[curve.segments[0].start_position] = [0.5, 0.5]
    this.mapping[curve.segments[0].end_position] = [0.3, 0.5]
    this.mapping[curve.segments[1].end_position] = [0.25, 0.5]
    this.mapping[curve.segments[2].getPoint(0).position] = [0.2, 0.5]

    let segment = curve.segments[2]
    for (let i = segment.step_size; i < 1; i += segment.step_size) {
      let position = segment.getPoint(i).position

      let t = position[0]
      let x = 0.2 * (t + 0.9)/(0.1) + 0.1 * (t + 0.75)/(-0.1)

      this.mapping[position] = [x, 0.5]
    }

    this.mapping[curve.segments[2].getPoint(1).position] = [0.2, 0.5]
    this.mapping[curve.segments[3].start_position] = [0.25, 0.5]
    this.mapping[curve.segments[3].end_position] = [0.3, 0.5]
    this.mapping[curve.segments[4].end_position] = [0.5, 0.5]
  }
}