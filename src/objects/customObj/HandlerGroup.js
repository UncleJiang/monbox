import * as THREE from 'three'
import basicSetting from '../../basicScene'
import getCamera from '../../cameras/cameraHandler'
import { textureLoader } from '../../textures/textureHandler'
import gui from '../../utils/gui'
import { layerTexture } from './boxOutLayer'

function HandlerGroup (name) {
    const group = new THREE.Group()
    group.name = name || 'handlerGroup'
    group.rotateX(- Math.PI * 0.5)
    group.position.set(0, -5.2, 0)
    // group.rotateY(Math.PI * 0.25)

    // const maskGeometry = new THREE.RingGeometry(10, 15, 16, 1, 0, Math.PI * 0.4)
    const maskGeometry = new THREE.TorusGeometry(12.5, 0.5, 4, 16, Math.PI * 0.4)
    const maskMaterial = new THREE.MeshPhongMaterial({
        color: '#f77',
        stencilWrite: true,
        stencilRef: 6,
        stencilFunc: THREE.AlwaysStencilFunc,
        stencilFail: THREE.ReplaceStencilOp,
        stencilZFail: THREE.ReplaceStencilOp,
        stencilZPass: THREE.ReplaceStencilOp,
    })
    const handlerMask = new THREE.Mesh(maskGeometry, maskMaterial)
    handlerMask.name = 'handlerMask'
    handlerMask.rotateZ(- Math.PI * 0.7) // 旋转到正向面对屏幕，以Z轴为中心线
    group.add(handlerMask)


    // const capGeometry = new THREE.CapsuleGeometry(1.2, 0.4, 5, 4)
    const capGeometry = new THREE.OctahedronGeometry(1.1, 0)
    // const capMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    const capMaterial = new THREE.MeshMatcapMaterial({
        matcap: layerTexture,
    })
    const capLeft = new THREE.Mesh(capGeometry, capMaterial)
    const capRight = new THREE.Mesh(capGeometry, capMaterial)
    capLeft.name = 'capLeft'
    capRight.name = 'capRight'

    const offsetX = 12.5 * Math.sin(Math.PI * 0.2)
    const offsetY = 12.5 * Math.cos(Math.PI * 0.2)
    capLeft.rotateX(Math.PI * 0.5)
    capLeft.rotateY(- Math.PI * 0.2)
    capLeft.position.set(-offsetX, -offsetY, 0)
    // capRight.rotateZ(Math.PI * 0.2)
    capRight.rotateX(Math.PI * 0.5)
    capRight.rotateY(Math.PI * 0.2)
    capRight.position.set(offsetX, -offsetY, 0)
    

    // capLeft.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI * 0.2)
    group.add(capLeft)
    group.add(capRight)
    


    // 624541_FCD0C6_E4A19A_FCBCB4-64px
    // 604A30_DC9065_212C14_AC9C92-64px
    // 637598_B7C4D3_22293A_9BACBF-64px
    // 3E95CC_65D9F1_A2E2F6_679BD4-64px
    
    // const handlerGeometry = new THREE.RingGeometry(11, 14, 16, 1, 0, Math.PI)
    const handlerGeometry = new THREE.TorusGeometry(12.5, 0.8, 4, 16, Math.PI)

    const handlerMaterial = new THREE.MeshMatcapMaterial({
        // color: '#cff',
        // map: textureLoader.load('/images/caustics.jpeg'),
        matcap: textureLoader.load('https://makio135.com/matcaps/64/65A0C7_C3E4F8_A7D5EF_97CAE9-64px.png'),
        stencilWrite: true,
        stencilRef: 6,
        stencilFunc: THREE.EqualStencilFunc,
        stencilFail: THREE.KeepStencilOp,
        stencilZFail: THREE.KeepStencilOp,
        stencilZPass: THREE.KeepStencilOp,
    })
    const handler = new THREE.Mesh(handlerGeometry, handlerMaterial)
    handler.name = 'handler'
    // handler.position.z += 0.2
    handler.rotateZ(Math.PI)
    // handler.layers.set(2) // for raycasting

    group.add(handler)


    const onMeshChange = () => {
        
    }

    return {
        mesh: group,
        onMeshChange,
    }
}

export default HandlerGroup