import * as THREE from 'three'

import gui from '../../utils/gui.js'
import commonParams from '../../common.js'

function Particles (params) {

  let {
        count = 10,
        map = null,
        transparent = false,
        alphaMap = null,
        size = 1,
        changeFn = null,
        name = 'particles',
        positions = null,
        colors = null,
        extraProps = {},
    } = params
    const particlesGeometry = new THREE.BufferGeometry()

    const maxWidth = (commonParams.COMMON_PARAM_EXAMPLE - 10) * 2 // TODO
    if (!positions) {
        positions = new Float32Array(count * 3)
        for (let i = 0; i < count * 3; i++)
        {
            positions[i] = (i % 3 == 1)
                ? Math.random() * 10 // on y axis
                : (Math.random() - 0.5) * maxWidth
        }
    }

    if(!colors) {
        colors = new Float32Array(count * 4)
        for (let i = 0; i < count * 4; i++)
        {
           colors[i] = 1.0 // white
        }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 4))

    const particlesMaterial = new THREE.PointsMaterial({
        map,
        transparent,
        alphaMap,
        size,
        sizeAttenuation: true,
        ...extraProps,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    particles.name = name

    const startPositionX = - maxWidth * 0.5
    const endPositionX = maxWidth * 0.5

    const onParticlesChange = (elapsedTime) => {
        const { position: particlePosition } = particlesGeometry.attributes
        if(changeFn) {
            changeFn(particles, elapsedTime)
        } else {
            for (let i = 0; i < count; i++) {
                const i3 = i * 3
                if (particlePosition.array[i3] > endPositionX) {
                    particlePosition.array[i3] = startPositionX
                }
                particlePosition.array[i3] += Math.random() * 0.06 // * 0.01  // position.x
                particlePosition.array[i3 + 1] += (Math.random() - 0.5) * 0.0001 // position.y
                particlePosition.array[i3 + 2] += (Math.random() - 0.5) * 0.0001 // position.z
            }
            particlePosition.needsUpdate = true
        }
        
    }

    return {
        mesh: particles,
        onMeshChange: onParticlesChange
    }
}

export default Particles