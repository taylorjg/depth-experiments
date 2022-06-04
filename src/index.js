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
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)

  const container = document.getElementById('container')
  const w = WINDOW_SIZE
  const h = WINDOW_SIZE
  renderer.setSize(w, h)
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50)
  camera.translateZ(10)
  scene.add(camera)

  createObjects(scene)

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera)
  })
}

// https://discourse.threejs.org/t/apply-depth-buffer-from-render-target-to-the-next-render/37276/2

main()
