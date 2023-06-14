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
    let perfume
    folder.add(params, 'selectedCase', options).onChange(() => {
        const selectedCaseConfig = config[params.selectedCase]
        currHandlerGroup.visible = false
        currHandlerGroup = selectedCaseConfig.handlerGroup
        currHandlerGroup.visible = true
        transformControl.attach(currHandlerGroup)
        perfume = selectedCaseConfig.perfumeObj.mesh.getObjectByName('perfume')

        orthoCamera.position.copy(selectedCaseConfig.camPosition)
        orthoCamera.lookAt(camTarget)
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