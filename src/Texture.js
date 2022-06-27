class Texture {
  constructor(gl, texture_source_path) {
    this.texture = gl.createTexture()

    let image = new Image()
    image.addEventListener('load', () => {
      gl.bindTexture(gl.TEXTURE_2D, this.texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, 
                    gl.UNSIGNED_BYTE, image)
      gl.generateMipmap(gl.TEXTURE_2D)
    })
    image.src = texture_source_path
  }
}