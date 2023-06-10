import * as THREE from 'three'

import { textureLoader } from '../../textures/textureHandler'
import Particles from '../advancedMeshObj/Particles'

// blue case - perfume2
const testObj = () => {

    const stencilSetting = {
        stencilWrite: true,
        stencilRef: 4,
        stencilFunc: THREE.EqualStencilFunc,
        stencilFail: THREE.KeepStencilOp,
        stencilZFail: THREE.KeepStencilOp,
        stencilZPass: THREE.KeepStencilOp,
    }

    const group = new THREE.Group()

    const geometry = new THREE.BoxGeometry(7, 7, 7)
    const material = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        color: '#5a9',
        transparent: true,
        opacity: 0,
        ...stencilSetting,
    })


    material.onBeforeCompile = (shader) => {
        console.log('test shader 2: ', shader)
    }
    const mesh = new THREE.Mesh(geometry, material)

    // group.add(mesh)


    const particleCount = 10
    const particleTexture = textureLoader.load('/images/bubble.png')
    const particlePositionArr1 = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
        particlePositionArr1[i] = (i % 3 == 1)
            ? (Math.random() - 0.5) * 10 // on y axis
            : (Math.random() - 0.5) * 20
    }
    const particlesFn = (particles) => {
        const { position } = particles.geometry.attributes

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3
            if (position.array[i3 + 1] > 5) { // axis y
                position.array[i3 + 1] = -5
            }
            position.array[i3] += (Math.random() - 0.5) * 0.02
            position.array[i3 + 1] += Math.random() * 0.015
            position.array[i3 + 2] += (Math.random() - 0.5) * 0.02
        }

        position.needsUpdate = true
    }

    const particles1 = new Particles({
        count: particleCount,
        map: particleTexture,
        transparent: true,
        opacity: 0.7,
        alphaMap: particleTexture,
        size: 36,
        positions: particlePositionArr1,
        changeFn: particlesFn,
        name: 'flowerParticles',
        extraProps: {
            depthWrite: false,
            ...stencilSetting,
        }
    })

    const particlePositionArr2 = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
        particlePositionArr2[i] = (i % 3 == 1)
            ? (Math.random() - 0.5) * 10 // on y axis
            : (Math.random() - 0.5) * 20
    }
    const particles2 = new Particles({
        count: particleCount,
        map: particleTexture,
        transparent: true,
        opacity: 0.7,
        alphaMap: particleTexture,
        size: 20,
        positions: particlePositionArr2,
        changeFn: particlesFn,
        name: 'flowerParticles',
        extraProps: {
            depthWrite: false,
            ...stencilSetting,
        }
    })

    group.add(particles1.mesh)
    group.add(particles2.mesh)

    const onMeshChange = () => {
        particles1.onMeshChange()
        particles2.onMeshChange()
    }

    // mesh.renderOrder = 1

    return {
        mesh: group,
        onMeshChange: onMeshChange
    }
}

export default testObj()