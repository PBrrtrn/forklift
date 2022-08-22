export default class ImageTexture {
  constructor(gl, path) {
    let self = this
    self.texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, self.texture)
     
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                  new Uint8Array([0, 0, 255, 255]))
     
    var image = new Image()
    image.src = path
    image.addEventListener('load', function() {
      gl.bindTexture(gl.TEXTURE_2D, self.texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image)
      gl.generateMipmap(gl.TEXTURE_2D)
    })
  }

  use(gl) {
    gl.bindTexture(gl.TEXTURE_2D, this.texture)
  }

}