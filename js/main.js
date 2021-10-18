import * as THREE from 'https://cdn.skypack.dev/three@0.132.2'

const loader = new THREE.TextureLoader()
const height = loader.load('static/height.png')
const texture = loader.load('static/texture_x2.jpg')
const alpha = loader.load('static/alpha.png')

function main() {
  const canvas = document.querySelector('.webgl')
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
  })

  const fov = 50
  const aspect = 2
  const near = 0.3
  const far = 100
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.x = 0
  camera.position.y = -0.25
  camera.position.z = 5

  const scene = new THREE.Scene()

  {
    const pointLight = new THREE.PointLight(0x2e2e2e, 9)
    pointLight.position.x = 2
    pointLight.position.y = 50
    pointLight.position.z = 70
    scene.add(pointLight)
  }
  const geometry = new THREE.PlaneBufferGeometry(3, 3, 30, 30)

  const material = new THREE.MeshStandardMaterial({
    color: '#ced4da',
    map: texture,
    displacementMap: height,
    displacementScale: 0.25,
    roughness: 1,
    metalness: 0.3,
    alphaMap: alpha,
    transparent: true,
    depthTest: true,
    // vertexColors: true,
  })

  const plane = new THREE.Mesh(geometry, material)
  scene.add(plane)
  plane.rotation.x = 389

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = (canvas.clientWidth * pixelRatio) | 0
    const height = (canvas.clientHeight * pixelRatio) | 0
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  function render(time) {
    time *= 0.001
    plane.rotation.z = 0.3 * time

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()