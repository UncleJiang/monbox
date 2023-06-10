import _, { Object } from 'lodash'
import * as THREE from 'three'
import { Event, Texture } from 'three'


// initialize loader
const onLoad = (texture) => {
    console.log('=====on load======', texture)
}
const onProgress = () => {
    console.log('=====on progress======')
}
const onError = (e) => {
    console.log('=====on error======', e)
}

const loadingManager = new THREE.LoadingManager(onLoad, onProgress, onError)
export const textureLoader = new THREE.TextureLoader(loadingManager)
export const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)
