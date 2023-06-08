import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import basicSetting from '../basicScene.js'
import gui from '../utils/gui.js'


// camera
const mainCamera = () => {
    const params = {
        posX: 0,
        posY: 19.7,
        posZ: 40.7,
        offsetX: 0,
        offsetY: 0,
        offsetZ: 0,
        targetPosX: 0,
        targetPosY: 0,
        targetPosZ: 0,
    }


    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
    camera.name = 'mainCamera'
    camera.position.y = 19.7
    camera.position.z = 40.7
    const targetPos = new THREE.Vector3(params.targetPosX, params.targetPosY, params.targetPosZ)
    camera.lookAt(targetPos)

    const onChangePos = () => {
        camera.position.set(params.posX, params.posY, params.posZ)
        basicSetting.renderer.render(basicSetting.scene, camera)
    }

    const onChangeOffset = () => {
        camera.position.x += params.offsetX
        camera.position.y += params.offsetY
        camera.position.z += params.offsetZ
        basicSetting.renderer.render(basicSetting.scene, camera)
    }

    const onChangeTarget = () => {
        targetPos.set(params.targetPosX, params.targetPosY, params.targetPosZ)
        camera.lookAt(targetPos)
        basicSetting.renderer.render(basicSetting.scene, camera)
    }

    const folder = gui.addFolder('mainCamera')
    folder.close()

    folder.add(params, 'posX', -100, 100, 1).onChange(onChangePos)
    folder.add(params, 'posY', -100, 100, 1).onChange(onChangePos)
    folder.add(params, 'posZ', -100, 100, 1).onChange(onChangePos)
    
    folder.add(params, 'offsetX', -100, 100, 1).onChange(onChangeOffset)
    folder.add(params, 'offsetY', -100, 100, 1).onChange(onChangeOffset)
    folder.add(params, 'offsetZ', -100, 100, 1).onChange(onChangeOffset)
    
    folder.add(params, 'targetPosX', -100, 100, 1).onChange(onChangeTarget)
    folder.add(params, 'targetPosY', -100, 100, 1).onChange(onChangeTarget)
    folder.add(params, 'targetPosZ', -100, 100, 1).onChange(onChangeTarget)



    // control
    const orbitControl = new OrbitControls(camera, basicSetting.canvas)
    orbitControl.update()

    camera.bindedControl = orbitControl

    return camera
}
export default mainCamera()


