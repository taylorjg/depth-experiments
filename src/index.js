import * as THREE from 'three'
// import Stats from 'stats.js'
import vertexShader from './my-vertex-shader.glsl'
import fragmentShader from './my-fragment-shader.glsl'

const WINDOW_SIZE = 250

const makeMaterial = color => {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      color: { value: new THREE.Color(color) }
    }
  })
}

const makeObject = (scene, color, size, z) => {
  const width = size
  const height = size
  const geometry = new THREE.PlaneBufferGeometry(width, height)
  const material = makeMaterial(color)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.translateZ(z)
  scene.add(mesh)
}

const createObject1 = scene => {
  return makeObject(scene, "DeepPink", 20, 1)
}

const createObject2 = scene => {
  return makeObject(scene, "MediumVioletRed", 4, 2)
}

const createObject3 = scene => {
  return makeObject(scene, "PaleVioletRed", 2, 3)
}

const createObjects = scene => {
  createObject1(scene)
  createObject2(scene)
  createObject3(scene)
}

const main = async () => {
  // const stats = new Stats()
  // document.body.appendChild(stats.dom)
  // stats.dom.style.left = 'unset'
  // stats.dom.style.top = '.5rem'
  // stats.dom.style.right = '.5rem'

  const w = WINDOW_SIZE
  const h = WINDOW_SIZE

  const canvas1 = document.getElementById('canvas1')
  const renderer1 = new THREE.WebGLRenderer({ antialias: true, canvas: canvas1 })
  renderer1.setPixelRatio(window.devicePixelRatio)
  renderer1.setSize(w, h)

  const canvas2 = document.getElementById('canvas2')
  const renderer2 = new THREE.WebGLRenderer({ antialias: true, canvas: canvas2 })
  renderer2.setPixelRatio(window.devicePixelRatio)
  renderer2.setSize(w, h)

  const mainScene = new THREE.Scene()
  const mainCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50)
  mainCamera.translateZ(10)
  mainScene.add(mainCamera)

  createObjects(mainScene)

  const wp = w * window.devicePixelRatio
  const hp = h * window.devicePixelRatio

  const renderTarget = new THREE.WebGLRenderTarget(wp, hp)
  renderTarget.depthTexture = new THREE.DepthTexture(wp, hp)

  const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const postScene = new THREE.Scene()
  postScene.add(postCamera)

  // renderTarget.depthTexture:
  // format: 1026 = DepthFormat
  // type: 1014 = UnsignedIntType
  // 1003 = NearestFilter
  // 1001 = ClampToEdgeWrapping
  // 300 = UVMapping
  // 3000 = LinearEncoding
  // unpackAlignment: 4

  // renderTarget.texture:
  // format: 1023 = RGBAFormat
  // type: 1009 = UnsignedByteType
  // 1006 = LinearFilter
  // 1001 = ClampToEdgeWrapping
  // 300 = UVMapping
  // 3000 = LinearEncoding
  // unpackAlignment: 4

  const map = renderTarget.depthTexture
  // const map = renderTarget.texture

  // const spriteMaterial = new THREE.SpriteMaterial({ map })
  // const sprite = new THREE.Sprite(spriteMaterial)
  // postScene.add(sprite)

  const quadGemoetry = new THREE.PlaneBufferGeometry(2, 2)
  const quadMaterial = new THREE.MeshBasicMaterial({ map })
  const quadMesh = new THREE.Mesh(quadGemoetry, quadMaterial)
  postScene.add(quadMesh)

  const myRender = () => {
    renderer1.setRenderTarget(renderTarget)
    renderer1.render(mainScene, mainCamera)
    renderer1.setRenderTarget(null)
    // renderer1.render(mainScene, mainCamera)
    renderer1.render(postScene, postCamera)

    console.log(renderTarget)

    // renderer2.render(postScene, postCamera)

    // const pixels = new Uint8Array(w * h * 4)
    // renderer.readRenderTargetPixels(renderTarget, 0, 0, w, h, pixels)
    // console.log('pixels:', pixels)
  }

  // renderer.setAnimationLoop(() => {
  //   stats.begin()
  //   myRender()
  //   stats.end()
  // })

  myRender()
}

// https://github.com/mrdoob/three.js/blob/master/examples/webgl_depth_texture.html
// https://discourse.threejs.org/t/apply-depth-buffer-from-render-target-to-the-next-render/37276/2
// https://codepen.io/repalash/pen/ExoMRpO?editors=0010

main()
