import * as THREE from 'three'
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

  const map = renderTarget.depthTexture
  // const map = renderTarget.texture

  const quadGemoetry = new THREE.PlaneBufferGeometry(2, 2)
  const quadMaterial = new THREE.MeshBasicMaterial({ map })
  const quadMesh = new THREE.Mesh(quadGemoetry, quadMaterial)
  postScene.add(quadMesh)

  const myRender = () => {
    renderer1.setRenderTarget(renderTarget)
    renderer1.render(mainScene, mainCamera)
    renderer1.setRenderTarget(null)
    renderer1.render(postScene, postCamera)
  }

  myRender()
}

main()
