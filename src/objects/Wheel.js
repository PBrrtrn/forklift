const n_rows = 4

export default class Wheel extends Object3D {
  draw(gl, parent_model_matrix, view_matrix, projection_matrix) {
    // TODO: Implement
  }

  initialize3dComponents(n_rows, n_columns, shader, gl) {
    let curve = this.buildCurve(n_rows)
    this.surface = new SweepSurface(curve, n_rows)
  }

  buildCurve(n_columns) {
    /* La forma de la curva debe ser la silueta de la rueda vista desde arriba
     Algo así:
            __
           /  \    ]
          |    |   |
          \    /   |
           |  |    |
           |  |    L
           |  |    |
          /    \   |
          |    |   |
           \__/    ]

      TODO: Definir los vértices con una extrusión sin la superficie de barrido, de forma tal que la rueda se haga redonda
      reduciendo el largo L en los extremos de Y, y que alcance máximo en el centro de la rueda 
    */
  }
}