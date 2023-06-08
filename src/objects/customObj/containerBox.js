import * as THREE from 'three'
import basicSetting from '../../basicScene'
import getCamera from '../../cameras/cameraHandler'


const containerBox = () => {
    const mesh = new THREE.Group()
    mesh.name = 'containerBox'

    const sideGeometry = new THREE.PlaneGeometry(10, 10)

    const sideMtl1 = new THREE.MeshBasicMaterial({
        color: '#d77',
        // transparent: true,
        // opacity: 0.4,
        stencilWrite: true,
        stencilRef: 3,
        stencilFunc: THREE.AlwaysStencilFunc,
        // stencilFail: THREE.ReplaceStencilOp,
        stencilZFail: THREE.ReplaceStencilOp,
        stencilZPass: THREE.ReplaceStencilOp,

    })

    const sideMtl2 = new THREE.MeshBasicMaterial({
        color: '#7d7',
        // transparent: true,
        // opacity: 0.4,
        stencilWrite: true,
        stencilRef: 4,
        stencilFunc: THREE.AlwaysStencilFunc,
        // stencilFail: THREE.ReplaceStencilOp,
        stencilZFail: THREE.ReplaceStencilOp,
        stencilZPass: THREE.ReplaceStencilOp,

    })

    const sideMtl3 = new THREE.MeshBasicMaterial({
        color: '#77d',
        // transparent: true,
        // opacity: 0.4,
        stencilWrite: true,
        stencilRef: 5,
        stencilFunc: THREE.AlwaysStencilFunc,
        // stencilFail: THREE.ReplaceStencilOp,
        stencilZFail: THREE.ReplaceStencilOp,
        stencilZPass: THREE.ReplaceStencilOp,

    })


    sideMtl1.onBeforeCompile = (shader) => {
        console.log('face shader:  ', shader)
    }


    const frontSide = new THREE.Mesh(sideGeometry, sideMtl1)
    const topSide = new THREE.Mesh(sideGeometry, sideMtl1)
    const rightSide = new THREE.Mesh(sideGeometry, sideMtl2)
    const backSide = new THREE.Mesh(sideGeometry, sideMtl2)
    const bottomSide = new THREE.Mesh(sideGeometry, sideMtl3)
    const leftSide = new THREE.Mesh(sideGeometry, sideMtl3)

    // combine them to a cube
    // make the backside out, to seems transparent
    frontSide.rotateY(Math.PI)
    frontSide.position.set(0, 0, 5)

    backSide.rotateY(Math.PI) 
    backSide.rotateX(Math.PI)
    backSide.position.set(0, 0, -5)

    topSide.rotateX(Math.PI * 0.5)
    topSide.position.set(0, 5, 0)

    bottomSide.rotateX(-Math.PI * 0.5)
    bottomSide.position.set(0, -5, 0)

    rightSide.rotateY(-Math.PI * 0.5)
    rightSide.position.set(5, 0, 0)
    leftSide.rotateY(Math.PI * 0.5)
    leftSide.position.set(-5, 0, 0)

    mesh.add(frontSide)
    mesh.add(backSide)
    mesh.add(topSide)
    mesh.add(bottomSide)
    mesh.add(rightSide)
    mesh.add(leftSide)

    // frontSide.renderOrder = 30
    // mesh.renderOrder = 40
    return {
        mesh,
        onMeshChange: null,
    }
}

export default containerBox()