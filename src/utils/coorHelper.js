// To configure the axesHelper, gridHelper etc.
import * as THREE from 'three'
import basicSetting from '../basicScene'

export const enableHelper = () => {
    const { scene } = basicSetting
    const axesHelper = new THREE.AxesHelper( 25 )
    scene.add( axesHelper )
}
