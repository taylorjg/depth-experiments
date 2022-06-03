import * as THREE from 'three'

const createObject1 = scene => {
  const width = 20
  const height = 20
  const geometry = new THREE.PlaneBufferGeometry(width, height)
  const material = new THREE.MeshBasicMaterial({ color: "DeepPink" })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, 0, 1)
  scene.add(mesh)
}

const createObject2 = scene => {
  const width = 4
  const height = 4
  const geometry = new THREE.PlaneBufferGeometry(width, height)
  const material = new THREE.MeshBasicMaterial({ color: "MediumVioletRed" })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, 0, 2)
  scene.add(mesh)
}

const createObject3 = scene => {
  const width = 2
  const height = 2
  const geometry = new THREE.PlaneBufferGeometry(width, height)
  const material = new THREE.MeshBasicMaterial({ color: "PaleVioletRed" })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, 0, 3)
  scene.add(mesh)
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
  const w = container.offsetWidth
  const h = container.offsetHeight
  renderer.setSize(w, h)
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50)
  camera.position.set(0, 0, 10)
  camera.lookAt(0, 0, 0)
  scene.add(camera)

  createObjects(scene)

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera)
  })

  window.addEventListener('resize', () => {
    const w = container.offsetWidth
    const h = container.offsetHeight
    renderer.setSize(w, h)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  })
}

main()
