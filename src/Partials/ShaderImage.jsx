import { useRef, useEffect } from "react"

export default function ShaderImage({ imageUrl, width, height }) {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext("webgl")
    if (!gl) return console.error("WebGL not supported")

    // Define shader sources directly instead of importing
    const vertSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      
      void main() {
        gl_Position = vec4(a_position, 0, 1);
        v_texCoord = vec2(a_position.x * 0.5 + 0.5, 0.5 - a_position.y * 0.5);
      }
    `

    const fragSource = `
      precision mediump float;
      varying vec2 v_texCoord;
      uniform sampler2D u_texture;
      uniform float u_time;
      
      void main() {
        vec2 uv = v_texCoord;
        
        // Simple distortion effect
        uv.x += sin(uv.y * 1.0 + u_time) * 0.01;
         

        // Wavy effect on hover
        uv.y += sin(uv.y * 2.0 + u_time) * 0.01;
        
        vec4 color = texture2D(u_texture, uv);
        gl_FragColor = color;
      }
    `

    // Compile shader helper
    function compile(type, src) {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s))
      }
      return s
    }

    // Build program
    const vShader = compile(gl.VERTEX_SHADER, vertSource)
    const fShader = compile(gl.FRAGMENT_SHADER, fragSource)
    const program = gl.createProgram()
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
    }
    gl.useProgram(program)

    // Set up a full-screen quad
    const posLoc = gl.getAttribLocation(program, "a_position")
    const posBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    // Time uniform for animation
    const timeLoc = gl.getUniformLocation(program, "u_time")
    const startTime = Date.now()

    // Load image into texture
    const tex = gl.createTexture()
    const img = new Image()
    img.crossOrigin = "anonymous" // Important to avoid CORS issues
    img.src = imageUrl
    img.onload = () => {
      // Calculate aspect ratio to maintain image proportions
      const imgAspect = img.width / img.height

      // Set canvas dimensions based on parent container
      const container = canvas.parentElement
      const containerWidth = container.clientWidth
      const containerHeight = containerWidth / imgAspect

      canvas.width = containerWidth * window.devicePixelRatio
      canvas.height = containerHeight * window.devicePixelRatio
      canvas.style.width = containerWidth + "px"
      canvas.style.height = containerHeight + "px"

      gl.viewport(0, 0, canvas.width, canvas.height)

      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.uniform1i(gl.getUniformLocation(program, "u_texture"), 0)

      // Animation loop
      function render() {
        const time = (Date.now() - startTime) / 1000
        gl.uniform1f(timeLoc, time)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        requestAnimationFrame(render)
      }
      render()
    }

    return () => {
      // Cleanup
      gl.deleteProgram(program)
      gl.deleteShader(vShader)
      gl.deleteShader(fShader)
      gl.deleteBuffer(posBuf)
      gl.deleteTexture(tex)
    }
  }, [imageUrl])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto object-cover object-center duration-700  hover:scale-105 transition-all duration-800  bg-blend-difference"
    />
  )
}
