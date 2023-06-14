import gsap from "gsap"
import { Vector3 } from "three"
import basicSetting from "../../basicScene"
import getCamera from "../../cameras/cameraHandler"
import orthoCamera from "../../cameras/orthoCamera"
import gui from "../../utils/gui"
import transformControl from "../../utils/transformControl"
import HandlerGroup from "./HandlerGroup"
import testobj from "./testobj"
import testobj2 from "./testobj2"
import testobj3 from "./testobj3"

import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(CustomEase)

const switchCase = () => {

    const { scene, renderer } = basicSetting

    const handlerGroup1 = new HandlerGroup('handlerGroup-April').mesh
    const handlerGroup2 = new HandlerGroup('handlerGroup-Ocean').mesh
    const handlerGroup3 = new HandlerGroup('handlerGroup-Amber').mesh
    handlerGroup1.visible = false
    handlerGroup2.visible = false
    handlerGroup3.visible = false

    handlerGroup1.rotateZ(- Math.PI * 0.9)
    handlerGroup1.rotateX(Math.PI * 0.2)

    handlerGroup2.rotateZ(- Math.PI * 0.25)

    handlerGroup3.rotateZ(Math.PI * 0.44)

    scene.add(handlerGroup1)
    scene.add(handlerGroup2)
    scene.add(handlerGroup3)

    let currHandlerGroup = handlerGroup1



    const folder = gui.addFolder('Case selector')
    const options = ['April', 'Ocean', 'Amber']
    const params = {
        selectedCase: 'April',
    }
    
    const config = {
        April: {
            handlerGroup: handlerGroup1,
            camPosition: new Vector3(-13, -23, -36.5),
            perfumeObj: testobj,
        },
        Ocean: {
            handlerGroup: handlerGroup2,
            camPosition: new Vector3(-32.8, 8.7, 30),
            perfumeObj: testobj2,
        },
        Amber: {
            handlerGroup: handlerGroup3,
            camPosition: new Vector3(42.7, 11.2, 9.6),
            perfumeObj: testobj3,
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

    let perfume
    folder.add(params, 'selectedCase', options).onChange(() => {
        const selectedCaseConfig = config[params.selectedCase]
        currHandlerGroup.visible = false
        currHandlerGroup = selectedCaseConfig.handlerGroup
        currHandlerGroup.visible = true
        // transformControl.attach(currHandlerGroup)
        perfume = selectedCaseConfig.perfumeObj.mesh.getObjectByName('perfume')

        camAnim(orthoCamera.position, selectedCaseConfig.camPosition)
        renderer.render(scene, getCamera())
    })

    const onMeshChange = () => {
        if (perfume) {
            // just trigger(/render) once when move the handler, not rendered every frame
            // perfume.applyQuaternion(currHandlerGroup.quaternion)
        }
    }
    return { onMeshChange }
}

export default switchCase