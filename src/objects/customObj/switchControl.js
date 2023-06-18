import basicSetting from "../../basicScene"
import getCamera from "../../cameras/cameraHandler"
import commonParams from "../../common"
import { handleGroups } from "./switchCase"

const switchControl = () => {

    let currControl = 'perfume-group'
    const perfumeIconGroup = document.getElementById('perfume-group')
    const cubeIconGroup = document.getElementById('cube-group')
    const perfumeBorder = document.getElementById('perfume-border')
    const perfumeElement = document.getElementById('perfume')
    const cubeBorder = document.getElementById('cube-border')
    const cubeElement = document.getElementById('cube')

    // initial state
    perfumeBorder.style.visibility = 'visible'
    cubeBorder.style.visibility = 'hidden'
    perfumeElement.classList.add('blue')
    getCamera()?.bindedControl && (getCamera().bindedControl.enabled = false)


    perfumeIconGroup.addEventListener('click', () => {
        if (currControl !== 'perfume-group') {
            perfumeBorder.style.visibility = 'visible'
            cubeBorder.style.visibility = 'hidden'
            perfumeElement.classList.add('blue')
            cubeElement.classList.remove('blue')
            currControl = 'perfume-group'

            // HandleGroup
            handleGroups[commonParams.currSectionId].visible = true
            commonParams.controlMode = 1
            if (getCamera()?.bindedControl) {
                getCamera().bindedControl.enabled = false
                
            }
            basicSetting.renderer.render(basicSetting.scene, getCamera())

        }
    })

    cubeIconGroup.addEventListener('click', () => {
        if (currControl !== 'cube-group') {
            perfumeBorder.style.visibility = 'hidden'
            cubeBorder.style.visibility = 'visible'
            perfumeElement.classList.remove('blue')
            cubeElement.classList.add('blue')
            currControl = 'cube-group'


            for (let key in handleGroups) {
                handleGroups[key].visible = false
            }
            commonParams.controlMode = 0
            const control = getCamera().bindedControl
            if (control) {
                control.enabled = true
                control.update()
            }
            basicSetting.renderer.render(basicSetting.scene, getCamera())
        }
    })



}

export default switchControl