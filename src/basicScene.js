import './style.css'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'


const stats = new Stats()
document.body.appendChild(stats.dom)

// canvas
const canvas = document.querySelector('canvas.webgl')
canvas.width = window.innerWidth
canvas.height = window.innerHeight + 100 // to enable the scroll animation of gsap


// scene
const scene = new THREE.Scene()


// renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true })
renderer.setClearColor('#000', 0)
renderer.outputColorSpace = THREE.SRGBColorSpace

// object sample
const geometry = new THREE.BoxGeometry(3, 3, 3)
const material = new THREE.MeshPhongMaterial({ color: '#3ff' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
// mesh.position.set(-17, 0, 5)
mesh.visible = false


// handle full screen
const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    }
})


const basicSetting = {
    canvas,
    scene,
    renderer,
    mesh,
    stats,
}


export default basicSetting