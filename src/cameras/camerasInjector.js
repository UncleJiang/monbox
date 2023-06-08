import gui from '../utils/gui.js'

import basicSetting from '../basicScene.js'
import trackCamera from './trackCamera.js'
import mainCamera from './mainCamera.js'
import { cameraArr, changeCamera } from './cameraHandler.js'
import orthoCamera from './orthoCamera.js'


const { scene } = basicSetting

cameraArr.push(trackCamera)
cameraArr.push(orthoCamera)

const cameraNameArr = cameraArr.map((item) => item.name)

const addCamera = () => {
    for (let i = 0; i < cameraArr.length; i++) {
        scene.add(cameraArr[i])
    }
}

let params = { name: mainCamera.name }

const folder = gui.addFolder('Camera Selector')
folder.add(params, 'name', cameraNameArr)
    .onChange(changeCamera)


export default addCamera