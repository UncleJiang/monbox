import * as THREE from 'three'
import { Vector3 } from 'three'
import basicSetting from '../../basicScene'
import getCamera from '../../cameras/cameraHandler'
import { textureLoader } from '../../textures/textureHandler'
// import gui from '../../utils/gui'
import { layerTexture } from './boxOutLayer'

const raycaster = new THREE.Raycaster()

function getPointer( event ) {
    const { canvas } = basicSetting
    const rect = canvas.getBoundingClientRect()
    return {
        x: ( event.clientX - rect.left ) / rect.width * 2 - 1,
        y: - ( event.clientY - rect.top ) / rect.height * 2 + 1,
    }
}


function intersectObjectWithRay( object, raycaster, includeInvisible ) {
	const allIntersections = raycaster.intersectObject( object, true );
    // console.log('all intersect: ', allIntersections)

	for ( let i = 0; i < allIntersections.length; i ++ ) {

		if ( allIntersections[ i ].object.visible || includeInvisible ) {

			return allIntersections[ i ];

		}

	}

	return false;

}




function HandleGroup (name) {
    const group = new THREE.Group()
    group.name = name || 'handleGroup'
    group.rotateX(- Math.PI * 0.5)
    group.position.set(0, -5.2, 0)
    // group.rotateY(Math.PI * 0.25)


    const maskGeometry = new THREE.TorusGeometry(12.5, 0.5, 4, 16, Math.PI * 0.4)
    const maskMaterial = new THREE.MeshMatcapMaterial({
        // color: '#f77',
        matcap: textureLoader.load('/images/blueCap.png'),
        stencilWrite: true,
        stencilRef: 6,
        stencilFunc: THREE.AlwaysStencilFunc,
        stencilFail: THREE.ReplaceStencilOp,
        stencilZFail: THREE.ReplaceStencilOp,
        stencilZPass: THREE.ReplaceStencilOp,
    })
    const handleMask = new THREE.Mesh(maskGeometry, maskMaterial)
    handleMask.name = 'handleMask'
    handleMask.rotateZ(- Math.PI * 0.7) // 旋转到正向面对屏幕，以Z轴为中心线
    group.add(handleMask)


    const capGeometry = new THREE.OctahedronGeometry(1.1, 0)
    const capMaterial = new THREE.MeshMatcapMaterial({
        matcap: layerTexture,
    })
    const capLeft = new THREE.Mesh(capGeometry, capMaterial)
    const capRight = new THREE.Mesh(capGeometry, capMaterial)
    capLeft.name = 'capLeft'
    capRight.name = 'capRight'

    const offsetX = 12.5 * Math.sin(Math.PI * 0.2)
    const offsetY = 12.5 * Math.cos(Math.PI * 0.2)
    capLeft.rotateX(Math.PI * 0.5)
    capLeft.rotateY(- Math.PI * 0.2)
    capLeft.position.set(-offsetX, -offsetY, 0)
    capRight.rotateX(Math.PI * 0.5)
    capRight.rotateY(Math.PI * 0.2)
    capRight.position.set(offsetX, -offsetY, 0)
    

    group.add(capLeft)
    group.add(capRight)
    

    const handleGeometry = new THREE.TorusGeometry(12.5, 0.8, 4, 16, Math.PI * 0.01)

    const handleMaterial = new THREE.MeshMatcapMaterial({
        // map: textureLoader.load('/images/handleIndicator.jpg'), //分辨率不高，效果不好
        // matcap: textureLoader.load('/images/blueCap.png'),
        matcap: layerTexture,
        stencilWrite: true, // TODO: set the handle range
        stencilRef: 6,
        stencilFunc: THREE.EqualStencilFunc,
        stencilFail: THREE.KeepStencilOp,
        stencilZFail: THREE.KeepStencilOp,
        stencilZPass: THREE.KeepStencilOp,
    })
    const handle = new THREE.Mesh(handleGeometry, handleMaterial)
    handle.name = 'handle'
    handle.rotateZ(- Math.PI * 0.5)

    group.add(handle)



    /**
     * handle moving logic
     */ 

    let startX = 0
    let startY = 0
    let isDragging = false
    let intersect
    // let verticalRotateAxis = new Vector3()
    const setVerticalRotateAxis = () => {
        const capLeftWorldPos = new Vector3()
        const capRightWorldPos = new Vector3()
        group.getObjectByName('capLeft').getWorldPosition(capLeftWorldPos)
        group.getObjectByName('capRight').getWorldPosition(capRightWorldPos)
        

        const centerPos = new Vector3(
            (capLeftWorldPos.x + capRightWorldPos.x) / 2,
            (capLeftWorldPos.y + capRightWorldPos.y) / 2,
            (capLeftWorldPos.z + capRightWorldPos.z) / 2,
        )
        const centerToRotateBase = new Vector3(
            centerPos.x,
            centerPos.y - (-5.2),
            centerPos.z
        )
        const verticalRotateAxis = new Vector3().copy(centerToRotateBase)
        verticalRotateAxis.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI * 0.5)
        
        // console.log('setVerticalRotateAxis: leftWorldPos, right: ', capLeftWorldPos, capRightWorldPos)
        // console.log('setVerticalRotateAxis post: centerPos, lineToO, vAxis: ', centerPos, centerToRotateBase, verticalRotateAxis)
        this.verticalRotateAxis = verticalRotateAxis
    }
    window.addEventListener('pointerdown', (e) => {
        // startX = e.clientX
        // startY = e.clientY
        console.log('down---:', isDragging)

        if(isDragging) return

        raycaster.setFromCamera(getPointer(e), getCamera())
        intersect = intersectObjectWithRay(group, raycaster, false)
        // console.log('intersect: ', intersect)
        if (intersect) {
            startX = e.clientX
            startY = e.clientY

        }
        // console.log('int start: ', startX)
        isDragging = true
    })

    window.addEventListener('pointermove', (e) => {
        if (!isDragging) return
        raycaster.setFromCamera(getPointer(e), getCamera())
        // const intersect = intersectObjectWithRay(group, raycaster, false)
        console.log('intersect move: ', intersect)
        if (intersect) {
            // let offsetX = e.clientX - startX
            // let offsetY = e.clientY - startY
            // let radianOnHorizon = Math.atan(offsetX / 12.5)
            // // let radianOnVertical = Math.atan(offsetY / 12.5)
            // let radianOnVertical = Math.atan(offsetY / (offsetX / Math.sin(radianOnHorizon)))
            // let quaternion = new THREE.Quaternion()
            // THREE.MathUtils.setQuaternionFromProperEuler(quaternion, radianOnHorizon, radianOnVertical, 0, 'YXZ')
            // group.applyQuaternion(quaternion)
            // basicSetting.renderer.render(basicSetting.scene, getCamera())
            // console.log('int radian: ', offsetX, radianOnHorizon)
            // startX = e.clientX
            // startY = e.clientY
        }
    })

    window.addEventListener('pointerup', (e) => {
        console.log('up---:', isDragging)
        if (isDragging && startX && intersect) {
            let offsetX = e.clientX - startX
            let offsetY = e.clientY - startY
            let radianOnHorizon = Math.atan(offsetX / (12.5 * 10))
            // let radianOnVertical = Math.atan(offsetY / 12.5)
            let radianOnVertical = Math.atan(offsetY / (offsetX / Math.sin(radianOnHorizon)))
            let quaternionH1 = new THREE.Quaternion() // horizontal
            let quaternionH2 = new THREE.Quaternion()
            let quaternionV = new THREE.Quaternion() // vertical
            let quaternionV2 = new THREE.Quaternion() // vertical
            
            if (offsetX !== 0) {
                THREE.MathUtils.setQuaternionFromProperEuler(quaternionH1, 0, radianOnHorizon, 0, 'XYX')
                THREE.MathUtils.setQuaternionFromProperEuler(quaternionH2, 0, radianOnHorizon, 0, 'XZX')
                if(!_.isNaN(quaternionH1.x)) {
                    handle.applyQuaternion(quaternionH2)
                    group?.perfumes?.forEach((perfume) => {
                        perfume.applyQuaternion(quaternionH1)
                    }) // make all perfumes' rotation same
                }
            }
            if (offsetY !== 0) {
                THREE.MathUtils.setQuaternionFromProperEuler(quaternionV, radianOnVertical, radianOnVertical, 0, 'XZX') // TOFIX: quaternion.xyzw为NaN, 且纵向并不水平的问题

                // console.log('this.vAxis: ', this.verticalRotateAxis)
                const quaternionV2 = new THREE.Quaternion().setFromAxisAngle(this.verticalRotateAxis, radianOnVertical * 0.1) // 以垂直于到原点的向量 为轴旋转
                if(!_.isNaN(quaternionV2.x)) {
                    group.applyQuaternion(quaternionV2)
                }

                if(!_.isNaN(quaternionV.x)) {
                    // group.applyQuaternion(quaternionV)
                    group?.perfumes?.forEach((perfume) => perfume.applyQuaternion(quaternionV)) // TOFIX
                }
            }

            basicSetting.renderer.render(basicSetting.scene, getCamera())
            // console.log('int radian: ', offsetX, e.clientX, startX, radianOnHorizon, quaternionH1, quaternionV)
        }

        isDragging = false
    })



    const onMeshChange = () => {
        
    }

    return {
        mesh: group,
        setVerticalRotateAxis,
        onMeshChange,
    }
}

export default HandleGroup