import * as THREE from 'three'

const testObj = () => {

    const geometry = new THREE.BoxGeometry(7, 7, 7)
    const material = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        color: '#5a9',
        transparent: true,
        opacity: 0,
        stencilWrite: true,
        // stencilWrite: false,
        stencilRef: 4,
        stencilFunc: THREE.EqualStencilFunc,
        stencilFail: THREE.KeepStencilOp,
        stencilZFail: THREE.KeepStencilOp,
        stencilZPass: THREE.KeepStencilOp,
    })


    material.onBeforeCompile = (shader) => {
        console.log('test shader 2: ', shader)
    }
    const mesh = new THREE.Mesh(geometry, material)

    const group = new THREE.Group()
    group.add(mesh)

    // mesh.renderOrder = 1

    return {
        mesh: group,
        onMeshChange: null
    }
}

export default testObj()