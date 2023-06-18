import _ from 'lodash'
import * as THREE from 'three'
import { textureLoader } from '../../textures/textureHandler'
import Particles from '../advancedMeshObj/Particles'

// amber case - perfume3
const testObj = () => {

    const stencilSetting = {
        stencilWrite: true,
        stencilRef: 5,
        stencilFunc: THREE.EqualStencilFunc,
        stencilFail: THREE.KeepStencilOp,
        stencilZFail: THREE.KeepStencilOp,
        stencilZPass: THREE.KeepStencilOp,
    }

    const group = new THREE.Group()

    const geometry = new THREE.BoxGeometry(7, 7, 7)
    const material = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        color: '#9a9',
        transparent: true,
        opacity: 0,
        ...stencilSetting,
    })


    material.onBeforeCompile = (shader) => {
        console.log('test shader 3: ', shader)
    }
    const mesh = new THREE.Mesh(geometry, material)
    // group.add(mesh)



    const particleCount = 30
    const particleTexture = textureLoader.load('./images/glitter.png')
    const particlePositionArr1 = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
        particlePositionArr1[i] = (i % 3 == 1)
            ? (Math.random() - 0.5) * 10 // on y axis
            : (Math.random() - 0.5) * 20
    }
    const particlesFn = (particles, elapsedTime) => {
        const { position, color } = particles.geometry.attributes

        for (let i = 0; i < particleCount; i++) {
            color.array[i * 4 * 3 + 3] = _.round(_.round((elapsedTime + Math.random() * 0.2) * 0.5, 1) % 2, 2) // set opacity to [0, 1] per second.
        }
        color.needsUpdate = true
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3
            if (position.array[i3] > 5) {
                position.array[i3] = -5
            }
            position.array[i3] += (Math.random() - 0.5) * 0.0001
            position.array[i3 + 1] += (Math.random() - 0.5) * 0.0001
            position.array[i3 + 2] += (Math.random() - 0.5) * 0.0001
        }
        position.needsUpdate = true
    }
    const particles1 = new Particles({ // square type
        count: particleCount,
        // map: particleTexture,
        transparent: true,
        // alphaMap: particleTexture,
        size: 4,
        positions: particlePositionArr1,
        changeFn: particlesFn,
        name: 'flowerParticles',
        extraProps: {
            color: '#fff700',
            ...stencilSetting,
        }
    })


    const particlePositionArr2 = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
        particlePositionArr2[i] = (Math.random() - 0.5) * 18
    }
    const particleColorArr = new Float32Array(particleCount * 4)
    for (let i = 0; i < particleCount * 4; i++) {
        particleColorArr[4 * i] = 1.0 // r
        particleColorArr[4 * i + 1] = 1.0 // g
        particleColorArr[4 * i + 2] = 0.8 * Math.random() // b
        particleColorArr[4 * i + 3] = 1.0 // a
    }
    const particles2 = new Particles({ // square type
        count: particleCount,
        map: particleTexture,
        transparent: true,
        alphaMap: particleTexture,
        size: 44,
        positions: particlePositionArr2,
        colors: particleColorArr,
        changeFn: particlesFn,
        name: 'flowerParticles',
        extraProps: {
            color:  new THREE.Color('#ffc'), //'#ffa',
            vertexColors: true,
            depthWrite: false,
            ...stencilSetting,
        }
    })

    group.add(particles1.mesh)
    group.add(particles2.mesh)

    const onMeshChange = (elapsedTime) => {
        particles1.onMeshChange()
        particles2.onMeshChange(elapsedTime)
    }


    // mesh.renderOrder = 1

    return {
        mesh: group,
        onMeshChange: onMeshChange
    }
}

export default testObj()