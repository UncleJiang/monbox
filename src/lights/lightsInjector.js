import basicSetting from '../basicScene.js'
import ambientLight from './ambientLight.js'
import directionalLight from './directionalLight.js'

const objects = []

// create objects
objects.push(ambientLight)
objects.push(directionalLight)

export const addLights = () => {
    const scene = basicSetting.scene

    if (!scene) return

    for (let obj of objects) {
        console.log('addLight: ', obj)
        scene.add(obj.light)
        scene.add(obj.target) // TODO: 验证是否需要添加
        scene.add(obj.helper)
    }
}

export const lightsOnChange = () => {
    for (let obj of objects) {
        obj.onLightChange?.()
    }
}
