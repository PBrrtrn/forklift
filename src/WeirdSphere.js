class WeirdSphere {
  constructor(shader, gl) {
    this.shader = shader

    this.rotation_angle = 0.0

    this.model_matrix = mat4.create()
    this.normal_matrix = mat4.create()

    let vertex_position_array = []
    let vertex_normal_array = []
    let vertex_index_array = []

    let rows = 128
    let columns = 256

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let u = j/(columns - 1) * Math.PI * 2
        let v = (0.1 + (i / (rows-1)*0.8)) * Math.PI

        let position = this.getVertexPosition(u, v)
        vertex_position_array.push(position[0])
        vertex_position_array.push(position[1])
        vertex_position_array.push(position[2])

        let normal = this.getVertexNormal(u, v)
        vertex_normal_array.push(normal[0])
        vertex_normal_array.push(normal[1])
        vertex_normal_array.push(normal[2])
      }
    }

    for (let i = 0; i < (rows-1); i++) {
      vertex_index_array.push(i*columns)

      for (let j = 0; j < (columns-1); j++) {
        vertex_index_array.push(i*columns+j);
        vertex_index_array.push((i+1)*columns+j);
        vertex_index_array.push(i*columns+j+1);
        vertex_index_array.push((i+1)*columns+j+1);
      }
      vertex_index_array.push((i+1) * columns + columns - 1);
    }

    this.vertex_buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, 
                  new Float32Array(vertex_position_array),
                  gl.STATIC_DRAW)

    this.normal_buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normal_buffer)
    gl.bufferData(gl.ARRAY_BUFFER,
                  new Float32Array(vertex_normal_array),
                  gl.STATIC_DRAW)

    this.index_buffer = gl.createBuffer()
    this.index_buffer.number_vertex_point = vertex_index_array.length
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, 
                  new Uint16Array(vertex_index_array),
                   gl.STATIC_DRAW)
  }

  getVertexPosition(u, v) {
    var r=2;
    var nx=Math.sin(v)*Math.sin(u);
    var ny=Math.sin(v)*Math.cos(u);
    var nz=Math.cos(v);


    var g=v%0.5;
    var h=u%1;
    var f=1;

    if (g<0.25) f=0.95;
    if (h<0.5) f=f*0.95;
    
    var x=nx*r*f;
    var y=ny*r*f;
    var z=nz*r*f;

    return [x,y,z];
  }

  getVertexNormal(u, v) {
    var delta=0.05;
    var p1=this.getVertexPosition(u,v);
    var p2=this.getVertexPosition(u,v+delta);
    var p3=this.getVertexPosition(u+delta,v);

    var v1=vec3.fromValues(p2[0]-p1[0],p2[1]-p1[1],p2[2]-p1[2]);
    var v2=vec3.fromValues(p3[0]-p1[0],p3[1]-p1[1],p3[2]-p1[2]);

    vec3.normalize(v1,v1);
    vec3.normalize(v2,v2);
    
    var n=vec3.create();
    vec3.cross(n,v1,v2);
    vec3.scale(n,n,-1);
    return n;
  }

  draw(gl, view_matrix, projection_matrix) {
    mat4.identity(this.model_matrix)
    mat4.rotate(this.model_matrix, this.model_matrix, 
                this.rotation_angle, [1.0, 0.0, 1.0])

    mat4.identity(this.normal_matrix)
    mat4.multiply(this.normal_matrix, view_matrix, this.model_matrix)
    mat4.invert(this.normal_matrix, this.normal_matrix)
    mat4.transpose(this.normal_matrix, this.normal_matrix)

    this.shader.use(gl, this.model_matrix, this.normal_matrix, view_matrix,
                    projection_matrix, this.vertex_buffer, this.normal_buffer)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer)
    gl.drawElements(gl.TRIANGLE_STRIP, 
                    this.index_buffer.number_vertex_point,
                    gl.UNSIGNED_SHORT, 0)
  }

  rotate(angle) {
    this.rotation_angle += angle
  }

}
