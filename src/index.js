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
  const canvas2 = document.getElementById('canvas2')
  const canvas3 = document.getElementById('canvas3')

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(w, h)

  const mainScene = new THREE.Scene()
  const mainCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50)
  mainCamera.translateZ(10)
  mainScene.add(mainCamera)

  createObjects(mainScene)

  const wp = w * window.devicePixelRatio
  const hp = h * window.devicePixelRatio

  const renderTarget = new THREE.WebGLRenderTarget(wp, hp)
  renderTarget.type = THREE.FloatType
  renderTarget.depthTexture = new THREE.DepthTexture(wp, hp)

  const makePostScene = (texture) => {
    const postScene = new THREE.Scene()
    const quadGemoetry = new THREE.PlaneBufferGeometry(2, 2)
    const quadMaterial = new THREE.MeshBasicMaterial({ map: texture })
    const quadMesh = new THREE.Mesh(quadGemoetry, quadMaterial)
    postScene.add(quadMesh)
    return postScene
  }

  const postScene1 = makePostScene(renderTarget.depthTexture)
  const postScene2 = makePostScene(renderTarget.texture)

  const setCanvasSize = canvas => {
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    canvas.width = wp
    canvas.height = hp
  }

  setCanvasSize(canvas1)
  setCanvasSize(canvas2)
  setCanvasSize(canvas3)

  const canvasContext1 = canvas1.getContext('2d')
  const canvasContext2 = canvas2.getContext('2d')
  const canvasContext3 = canvas3.getContext('2d')

  const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

  const render = () => {
    renderer.setRenderTarget(renderTarget)
    renderer.render(mainScene, mainCamera)

    renderer.setRenderTarget(null)
    renderer.render(mainScene, mainCamera)
    canvasContext1.drawImage(renderer.domElement, 0, 0)

    renderer.render(postScene1, postCamera)
    canvasContext2.drawImage(renderer.domElement, 0, 0)

    renderer.render(postScene2, postCamera)
    canvasContext3.drawImage(renderer.domElement, 0, 0)
  }

  render()
}

main()
