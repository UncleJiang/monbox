import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import basicSetting from '../../basicScene'
import testobj from './testobj'
import testobj2 from './testobj2'
import testobj3 from './testobj3'

/**
 * Perfume Bottle Model
 * (https://skfb.ly/oAZwP) by Michaela Blanchfield is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
 */

const contentObjs = () => {

    const mesh = new THREE.Group()

    // mesh.position.set(0, -5, 16)


    const onLoad = () => {
       console.log('All models - loaded')
    }

    const onProgress = (url, itemsLoaded, itemsTotal) => {
        console.log('All models - loading progress: ' + (itemsLoaded / itemsTotal * 100) + '% loaded ---model' )
    }

    const onError = (e) => {
        console.log('All models - error: ', e)
    }

    const manager = new THREE.LoadingManager(onLoad, onProgress, onError)

    const updateAllMaterials = (scene, envMap) => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.stencilWrite = true
                child.material.stencilRef = 3
                child.material.stencilFunc = THREE.EqualStencilFunc

                if (child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = envMap
                    child.material.envMapIntensity = 2.5
                }
            }
        })
    }

    let perfume1, perfume2, perfume3
    const addOtherPerfume = (originPerfume) => {
        // perfume2
        perfume2 = originPerfume.clone(true)
        // perfume2.position.set(12, 4, 0)
        perfume2.scale.set(50, 50, 50)
        console.log('perfume2: ', originPerfume.children[0].children[0].children[0].children[1].children[0].uuid, perfume2.children[0].children[0].children[0].children[1].children[0].uuid)

        perfume2.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = child.material.clone(true)
                child.material.stencilWrite = true
                child.material.stencilRef = 4
                child.material.stencilFunc = THREE.EqualStencilFunc
            }
        })
        // change its main color
        // mesh24 the liquid
        const blueMesh24 = perfume2.children[0].children[0].children[0].children[1].children[0]
        const blueMtl1 = blueMesh24.material.clone()
        blueMtl1.color = new THREE.Color('#3ff')
        blueMesh24.material = blueMtl1
        // perfume2.children[0].children[0].children[0].children[1].children[0] = blueMesh18 // invalid
        perfume2.children[0].children[0].children[0].children[1].add(blueMesh24)
        // mesh18 the flower
        const blueMesh18 = perfume2.children[0].children[0].children[0].children[3].children[0]
        const blueMtl2 = blueMesh18.material.clone()
        console.log('bluemtl2: ', blueMtl2)
        blueMtl2.color = new THREE.Color('#24f')
        blueMesh18.material = blueMtl2
        perfume2.children[0].children[0].children[0].children[1].add(blueMesh18)

        // perfume2.position.y -= 3
        testobj2.mesh.add(perfume2)
        // basicSetting.scene.add(perfume2)


        // perfume3
        perfume3 = originPerfume.clone(true)
        // perfume3.position.set(12, 10, 10)
        perfume3.scale.set(50, 50, 50)

        perfume3.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = child.material.clone(true)
                child.material.stencilWrite = true
                child.material.stencilRef = 5
                child.material.stencilFunc = THREE.EqualStencilFunc
            }
        })

        // change its main color
        // mesh24 the liquid
        const amberMesh24 = perfume3.children[0].children[0].children[0].children[1].children[0]
        const amberMtl1 = amberMesh24.material.clone()
        amberMtl1.color = new THREE.Color('#f95')
        amberMesh24.material = amberMtl1
        perfume3.children[0].children[0].children[0].children[1].add(amberMesh24)
        // mesh18 the flower
        const amberMesh18 = perfume3.children[0].children[0].children[0].children[3].children[0]
        const amberMtl2 = amberMesh18.material.clone()
        amberMtl2.color = new THREE.Color('#f72')
        amberMesh18.material = amberMtl2
        perfume3.children[0].children[0].children[0].children[1].add(amberMesh18)

        // basicSetting.scene.add(perfume3)
        // perfume3.position.y -= 3
        testobj3.mesh.add(perfume3)


    }

    new RGBELoader()
        .setPath('cubemaps/')
        .load('thatch_chapel_1k.hdr', function (texture) {

            texture.mapping = THREE.EquirectangularReflectionMapping

            // basicSetting.scene.background = texture
            // basicSetting.scene.environment = texture


            // model

            const loader = new GLTFLoader(manager)
            loader.load( 'models/perfume_bottle_2.glb', function ( gltf ) {

                console.log('gltf scene:', gltf.scene)
                gltf.scene.scale.set(50, 50, 50)
                updateAllMaterials(gltf.scene, texture)
                perfume1 = gltf.scene
                // mesh.add(perfume1)
                perfume1.position.y -= 3.4
                testobj.mesh.add(perfume1)

                if (perfume1?.children && perfume1.children.length !== 0) {
                    addOtherPerfume(perfume1)
                    

                }
                

            })

        })



    return {
        mesh,
        onMeshChange: null,
    }

}

export default contentObjs()