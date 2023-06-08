import './style.css'

import basicSetting from './basicScene.js'
import { addObjects, objectsOnChange } from './objects/objectsInjector.js'
import { addLights, lightsOnChange } from './lights/lightsInjector.js'
import transformControl from './utils/transformControl.js'
import commonPanel from './commonPanel.js'
import addCamera from './cameras/camerasInjector.js'
import getCamera from './cameras/cameraHandler'

commonPanel()

addCamera()
addObjects()
addLights()

const {
    canvas,
    scene,
    renderer,
    mesh,
    stats,
} = basicSetting

scene.add(transformControl)

console.log('index scene: ', scene)
// animation
const anim = () => {
    window.requestAnimationFrame(anim)

    stats.update()


    renderer.render(scene, getCamera())
    // getCamera()?.bindedControl.update() // 不需要持续update

    mesh.rotateX(0.01)
    mesh.rotateY(0.01)

    objectsOnChange()
    lightsOnChange()
}

anim()

