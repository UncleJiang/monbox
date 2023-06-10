import mainCamera from './mainCamera.js'
import basicSetting from '../basicScene.js'
import commonParams from '../common.js'
import orthoCamera from './orthoCamera.js'

export const cameraArr = []
cameraArr.push(orthoCamera)
cameraArr.push(mainCamera)

// let selectedCamera = mainCamera
// temp
let selectedCamera = orthoCamera


// Only the camera with a not-empty name is valid.
export const changeCamera = (name) => {

    if (!name) return

    const cameraNameArr = cameraArr.map((item) => item.name)
    if (!cameraNameArr.includes(name)) return

    for (let i = 0; i < cameraArr.length; i ++) {
        cameraArr[i]?.bindedControl && (cameraArr[i].bindedControl.enabled = false)
        if (cameraArr[i].name === name) {
            selectedCamera = cameraArr[i]
        }
    }
    selectedCamera?.bindedControl && (selectedCamera.bindedControl.enabled = true)
    selectedCamera?.bindedControl.update()
}

const getCamera = (name) => {
    // return the selected camera directly if passing no param
    changeCamera(name)
    return selectedCamera
}

// TODO 单独处理事件
const { sizes } = commonParams
const { renderer } = basicSetting
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update camera
    if (selectedCamera?.isOrthographicCamera) {
        selectedCamera.left = sizes.width / -2
        selectedCamera.right = sizes.width / 2
        selectedCamera.top = sizes.height / 2
        selectedCamera.bottom = sizes.height / -2
    } else {
        selectedCamera.aspect = sizes.width / sizes.height
    }
    selectedCamera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height + 100) // to enable the scroll animation of gsap

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

export default getCamera