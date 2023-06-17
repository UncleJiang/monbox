import * as THREE from 'three'
import { textureLoader } from '../../textures/textureHandler'

export const layerTexture = textureLoader.load('/images/metalCap.png') // 金属质感

const boxOutLayer = () => {

    const geometry = new THREE.BoxGeometry(10.6, 10.6, 10.6)

    // ('https://makio135.com/matcaps/64/312C34_A2AAB3_61656A_808494-64px.png') // medium grey
    // ('https://makio135.com/matcaps/64/386169_A9CFDB_153C23_7CA3AC-64px.png') // less // blue
    // ('https://makio135.com/matcaps/64/394641_B1A67E_75BEBE_7D7256-64px.png')
    // ('https://makio135.com/matcaps/64/474643_696F7D_A9ABB8_8B8C93-64px.png')
    // ('https://makio135.com/matcaps/64/3E95CC_65D9F1_A2E2F6_679BD4-64px.png')

    const material = new THREE.MeshMatcapMaterial({
        // color: '#444',
        matcap: layerTexture,
        side: THREE.BackSide,
        stencilWrite: true,
        stencilRef: 0,
        stencilFunc: THREE.EqualStencilFunc,
        stencilFail: THREE.KeepStencilOp,
        stencilZFail: THREE.KeepStencilOp,
        stencilZPass: THREE.KeepStencilOp,
    })


    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = 'boxOutLayer'

    return {
        mesh,
        onMeshChange: null
    }
}

export default boxOutLayer()