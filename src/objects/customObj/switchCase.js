import gsap from "gsap"
import * as THREE from 'three'
import { Vector3 } from "three"
import basicSetting from "../../basicScene"
import getCamera from "../../cameras/cameraHandler"
import orthoCamera from "../../cameras/orthoCamera"
import gui from "../../utils/gui"
import HandleGroup from "./HandleGroup"
import testobj from "./testobj"
import testobj2 from "./testobj2"
import testobj3 from "./testobj3"

import { CustomEase } from "gsap/CustomEase"
import productText from "./productText"

gsap.registerPlugin(CustomEase)

const switchCase = () => {

    const { scene, renderer } = basicSetting

    const { mesh: handleGroup1, setVerticalRotateAxis: setGroup1Axis} = new HandleGroup('handleGroup-April')
    const { mesh: handleGroup2, setVerticalRotateAxis: setGroup2Axis} = new HandleGroup('handleGroup-Ocean')
    const { mesh: handleGroup3, setVerticalRotateAxis: setGroup3Axis} = new HandleGroup('handleGroup-Amber')
    handleGroup1.visible = false
    handleGroup2.visible = false
    handleGroup3.visible = false

    // position each group
    handleGroup1.rotateZ(- Math.PI * 0.9)
    handleGroup1.rotateX(Math.PI * 0.2)

    handleGroup2.rotateZ(- Math.PI * 0.25)

    handleGroup3.rotateZ(Math.PI * 0.44)

    scene.add(handleGroup1)
    scene.add(handleGroup2)
    scene.add(handleGroup3)

    // set vertical moving based axis for each group
    setGroup1Axis()
    setGroup2Axis()
    setGroup3Axis()


    let currHandleGroup = handleGroup1

    
    const config = {
        April: {
            handleGroup: handleGroup1,
            camPosition: new Vector3(-13, -23, -36.5),
            perfumeObj: testobj,
            text: productText.April,
        },
        Ocean: {
            handleGroup: handleGroup2,
            camPosition: new Vector3(-32.8, 8.7, 30),
            perfumeObj: testobj2,
            text: productText.Ocean,
        },
        Amber: {
            handleGroup: handleGroup3,
            camPosition: new Vector3(42.7, 11.2, 9.6),
            perfumeObj: testobj3,
            text: productText.Amber,
        },
    }
    const camTarget = new Vector3(0, 0, 0)

    const camAnim = (srcPos, dstPos) => {
        gsap.to(srcPos, {
            x: dstPos.x,
            y: dstPos.y,
            z: dstPos.z,
            duration: 1.5,
            delay: 0.5,
            // ease: 'back', //'bounce', // 'power2.inOut',
            ease: CustomEase.create("custom", "M0,0 C0,0 0.05,0.228 0.09,0.373 0.12,0.484 0.139,0.547 0.18,0.654 0.211,0.737 0.235,0.785 0.275,0.864 0.291,0.896 0.303,0.915 0.325,0.944 0.344,0.97 0.356,0.989 0.38,1.009 0.413,1.039 0.472,1.08 0.516,1.08 0.588,1.08 0.658,0.995 0.692,0.986 0.78,0.961 0.822,1.035 0.91,1.011 0.943,1.002 1,1 1,1 "),
            onUpdate: () => {
                // console.log('cam pos: ',srcPos, dstPos)
                orthoCamera.lookAt(camTarget)
                orthoCamera.updateProjectionMatrix()
            },
            onComplete: () => {
                // console.log('gsap  pos complete')
            }
        })
    }

    const subTitle = document.getElementById('subTitle')
    const description = document.getElementById('description')
    const title = document.getElementById('title')
    const scent = document.getElementById('scent')
    const changeText = (text) => {
        subTitle && (subTitle.innerText = text.subTitle)
        description && (description.innerText = text.description)
        title && (title.innerText = text.title)
        scent && (scent.innerText = text.scent)
    }


    const resetRotation = (perfumes) => {
        // reset perfume and handle's rotation
        perfumes.forEach((perfume) => {
            console.log('reset perfume up: ', perfume.up, perfume)
            // perfume.up = THREE.Object3D.DEFAULT_UP // doesn't work, .up is always (0,1,0)
            perfume.lookAt(new Vector3(0, 0, 50)) // (-26, -8, 32)
            
        })
        
        // the setting order cannot be disrupted.
        handleGroup1.lookAt(new Vector3(0,0,0))
        handleGroup2.lookAt(new Vector3(0,0,0))
        handleGroup3.lookAt(new Vector3(0,0,0))

        const handle = handleGroup1.getObjectByName('handle')
        handle.lookAt(new Vector3(0, 0, 0))
        handle.rotateZ(- Math.PI * 0.5)

        const handle2 = handleGroup2.getObjectByName('handle')
        handle2.lookAt(new Vector3(0, 0, 0))
        handle2.rotateZ(- Math.PI * 0.5)

        const handle3 = handleGroup3.getObjectByName('handle')
        handle3.lookAt(new Vector3(0, 0, 0))
        handle3.rotateZ(- Math.PI * 0.5)


        handleGroup1.rotateZ(- Math.PI * 0.9)
        handleGroup1.rotateX(Math.PI * 0.2)

        handleGroup2.rotateZ(- Math.PI * 0.25)

        handleGroup3.rotateZ(Math.PI * 0.44)

    }


    const caseOnchange = (selectedCase) => {
        const selectedCaseConfig = config[selectedCase]
        currHandleGroup.visible = false
        currHandleGroup = selectedCaseConfig.handleGroup
        currHandleGroup.visible = true
        // transformControl.attach(currHandleGroup)
        // perfume = selectedCaseConfig.perfumeObj.mesh.getObjectByName('perfume')
        const perfumes = []
        perfumes.push(testobj.mesh.getObjectByName('perfume'))
        perfumes.push(testobj2.mesh.getObjectByName('perfume'))
        perfumes.push(testobj3.mesh.getObjectByName('perfume'))
        currHandleGroup.perfumes = perfumes

        resetRotation(perfumes)


        // TODO: doesn't work, handle's up is alway the default, never change
        // currHandleGroup.getObjectByName('handle').up = THREE.Object3D.DEFAULT_UP
        console.log('handle r: ', currHandleGroup.getObjectByName('handle'))

        camAnim(orthoCamera.position, selectedCaseConfig.camPosition)
        changeText(selectedCaseConfig.text)
        renderer.render(scene, getCamera())
    }

    const markerIcons = document.querySelectorAll('#marker-group svg')
    let currSectionId = 'April'
    markerIcons.forEach((icon) => {
        icon.addEventListener('click', () => {
            if (currSectionId !== icon.id) {
                markerIcons.forEach((icon)=> {
                    icon.classList.remove('blue')
                })
                icon.classList.add('blue')
                currSectionId = icon.id

                caseOnchange(currSectionId)
            }
        })
    })

    const onMeshChange = () => {}

    return { onMeshChange }
}

export default switchCase