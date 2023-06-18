import * as THREE from 'three'
import { textureLoader } from '../../textures/textureHandler'
import Particles from '../advancedMeshObj/Particles'

// pink case - perfume1
const testObj = () => {

    const stencilSetting = {
        stencilWrite: true,
        stencilRef: 3,
        stencilFunc: THREE.EqualStencilFunc,
        stencilFail: THREE.KeepStencilOp,
        stencilZFail: THREE.KeepStencilOp,
        stencilZPass: THREE.KeepStencilOp,
    }

    const group = new THREE.Group()
    group.name = 'testObj'

    const geometry = new THREE.BoxGeometry(7, 7, 7)
    const material = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        color: '#1f1',
        transparent: true,
        opacity: 0.0,
        ...stencilSetting,
    })


    material.onBeforeCompile = (shader) => {
        console.log('test shader: ', shader)
    }

    const mesh = new THREE.Mesh(geometry, material)
    // group.add(mesh)

    /**
     * willow leaf
     */
    const leafGeometry = new THREE.PlaneGeometry(3, 5)
    const leafTexture = textureLoader.load('./images/leaf1.png')
    const leafMaterial = new THREE.MeshBasicMaterial({
        color: '#7fa',
        map: leafTexture,
        transparent: true,
        alphaMap: leafTexture,
        // side: THREE.BackSide,
        // side: THREE.DoubleSide,
        // alphaTest: 0.9,
        depthWrite: false,
        ...stencilSetting,
    })
    const leafMesh1 = new THREE.InstancedMesh(leafGeometry, leafMaterial, 3)

    const quaternion = new THREE.Quaternion()
    quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI )
    const scale = new THREE.Vector3(1, 1, 1)

    leafMesh1.setMatrixAt(0, new THREE.Matrix4().compose(new THREE.Vector3(0, 2.5, -3), quaternion, scale))
    leafMesh1.setMatrixAt(1, new THREE.Matrix4().compose(new THREE.Vector3(-3, 2.5, 0), quaternion, scale))
    leafMesh1.setMatrixAt(2, new THREE.Matrix4().compose(new THREE.Vector3(3, 2.5, 0), quaternion, scale))
    

    leafMesh1.instanceMatrix.needsUpdate = true
    group.add(leafMesh1)

    const leafTexture2 = textureLoader.load('./images/leaf2.png')
    const leafMaterial2 = new THREE.MeshBasicMaterial({
        color: '#afc',
        map: leafTexture2,
        transparent: true,
        alphaMap: leafTexture2,
        // side: THREE.BackSide,
        // side: THREE.DoubleSide,
        // alphaTest: 0.9,
        depthWrite: false,
        ...stencilSetting,
    })
    const leafMesh2 = new THREE.InstancedMesh(leafGeometry, leafMaterial2, 3)

    leafMesh2.setMatrixAt(0, new THREE.Matrix4().compose(new THREE.Vector3(-3, 2.5, -3), quaternion, scale))
    leafMesh2.setMatrixAt(1, new THREE.Matrix4().compose(new THREE.Vector3(3, 2.5, -3), quaternion, scale))
    leafMesh2.setMatrixAt(2, new THREE.Matrix4().compose(new THREE.Vector3(0, 2.5, 0), quaternion, scale))
    
    leafMesh2.instanceMatrix.needsUpdate = true
    leafMesh2.position.z -= 1.3

    group.add(leafMesh2)


    /**
     * flower particle
     */

    const particleCount = 8
    const particleTexture = textureLoader.load('./images/flower1.png')
    const particlePositionArr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
        particlePositionArr[i * 3] = (Math.random() - 0.8) * 20 // axis x
        particlePositionArr[i * 3 + 1] = (Math.random() - 1) * 10 // axis y
        particlePositionArr[i * 3] = (Math.random() * 0.8 - 0.2) * 20 // axis z
    }
    const particlesFn = (particles) => {
        // TODO: use cannon.js 
        const { position } = particles.geometry.attributes
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3
            if (position.array[i] > 5) {
                position.array[i] = -5
            }
            position.array[i3] += 0.02
            position.array[i3 + 1] += 0.03
            position.array[i3 + 2] += 0.02
        }
        position.needsUpdate = true
    }
    const particles = new Particles({
        count: particleCount,
        map: particleTexture,
        transparent: true,
        alphaTest: 0.9,
        // alphaMap: particleTexture,
        size: 120,
        positions: particlePositionArr,
        changeFn: particlesFn,
        name: 'flowerParticles',
        extraProps: {
            depthWrite: false,
            ...stencilSetting,
        }
    })
    group.add(particles.mesh)

    const onMeshChange = () => {
        particles.onMeshChange()
    }



    // mesh.renderOrder = 1

    return {
        mesh: group,
        onMeshChange: onMeshChange
    }
}

export default testObj()