class ColorTexture {
  constructor(gl, color_array) {
    this.texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this.texture)     
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                  new Uint8Array(color_array))
  }

  use(gl) {
    gl.bindTexture(gl.TEXTURE_2D, this.texture)
  }

}
