import * as THREE from 'three'

import basicSetting from '../basicScene.js'
import boxOutLayer from './customObj/boxOutLayer.js'
import containerBox from './customObj/containerBox.js'
import contentObjs from './customObj/contentObjs.js'
// import handlerGroup from './customObj/HandlerGroup.js'
import testobj from './customObj/testobj.js'
import testobj2 from './customObj/testobj2.js'
import testobj3 from './customObj/testobj3.js'
// import SphereObj from './basicMeshObj/SphereObj.js'
// import sky from './advancedMeshObj/sky.js'
// import timeGroup from './customObj/timeGroup/index.js'

const objects = []


/**
 * create objects and add in objects array
 * 
 * code sample:
 * `
 * const sphere = new SphereObj()
 * objects.push(sphere)
 * 
 * objects.push(sky)
 * objects.push(timeGroup)
 * `
 */

objects.push(containerBox)
objects.push(contentObjs)
objects.push(testobj)
objects.push(testobj2)
objects.push(testobj3)
objects.push(boxOutLayer)

// objects.push(handlerGroup)



export const addObjects = () => {
    const scene = basicSetting.scene

    if (!scene) return

    for (let obj of objects) {
        obj?.mesh && scene.add(obj.mesh)
    }
}

export const objectsOnChange = (elapsedTime, deltaTime) => {
    const scene = basicSetting.scene

    for (let obj of objects) {
        obj?.onMeshChange?.(elapsedTime, deltaTime, scene)
    }
}
