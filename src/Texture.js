class Texture {
  constructor(gl, texture_source_path) {
    this.texture = gl.createTexture()

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                  new Uint8Array([0, 0, 255, 255]));

    debugger

    let image = new Image()
    image.addEventListener('load', () => {
      gl.bindTexture(gl.TEXTURE_2D, this.texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, 
                    gl.UNSIGNED_BYTE, image)
      gl.generateMipmap(gl.TEXTURE_2D)
    })
    image.src = texture_source_path
  }

  use(gl) {
    gl.bindTexture(gl.TEXTURE_2D, this.texture)
  }
}