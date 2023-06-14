import * as THREE from 'three'
import basicSetting from '../../basicScene'
import getCamera from '../../cameras/cameraHandler'
import { textureLoader } from '../../textures/textureHandler'


const containerBox = () => {
    const mesh = new THREE.Group()
    mesh.name = 'containerBox'

    const sideGeometry = new THREE.PlaneGeometry(10, 10)

    const sideMtl1 = new THREE.MeshBasicMaterial({ // perfume1 pink case
        color: '#fdd',
        map: textureLoader.load('/images/pinkBg.jpg'),
        // transparent: true,
        // opacity: 0.4,
        stencilWrite: true,
        stencilRef: 3,
        stencilFunc: THREE.AlwaysStencilFunc,
        // stencilFail: THREE.ReplaceStencilOp,
        stencilZFail: THREE.ReplaceStencilOp,
        stencilZPass: THREE.ReplaceStencilOp,

    })

    const sideMtl2 = new THREE.MeshBasicMaterial({ // perfume2 blue case
        // color: '#7d7',
        map: textureLoader.load('/images/caustics.jpeg'),
        // transparent: true,
        // opacity: 0.4,
        stencilWrite: true,
        stencilRef: 4,
        stencilFunc: THREE.AlwaysStencilFunc,
        // stencilFail: THREE.ReplaceStencilOp,
        stencilZFail: THREE.ReplaceStencilOp,
        stencilZPass: THREE.ReplaceStencilOp,

    })
    const uniformParams = {
        uTime: { value: 0.0 },
    }

    const commonText = `
    #include <common>

    uniform float uTime;
    `

    const causticsMapText = `
    #include <map_fragment>
    #define TAU 6.28318530718
    #define MAX_ITER 5
    // #define SHOW_TILING 1



    float time = uTime * .5+23.0;
    
    #ifdef SHOW_TILING
        vec2 p = mod(vUv*TAU*2.0, TAU)-250.0;
    #else
        vec2 p = mod(vUv*TAU, TAU)-250.0;
    #endif
        vec2 i = vec2(p);
        float c = 1.0;
        float inten = .005;

        for (int n = 0; n < MAX_ITER; n++) 
        {
            float t = time * (1.0 - (3.5 / float(n+1)));
            i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
            c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));
        }
        c /= float(MAX_ITER);
        c = 1.17-pow(c, 1.4);
        vec3 color = vec3(pow(abs(c), 8.0));
        color = clamp(color + vec3(0.0, 0.35, 0.5), 0.0, 1.0);

        #ifdef SHOW_TILING
            // Flash tile borders...
            vec2 pixel = 2.0 / vec2(10.0, 10.0);
            vec2 tempUv = vUv * 2.0;
            // vUv *= 2.0;
            float f = floor(mod(uTime*.5, 2.0)); 	// Flash value.
            vec2 first = step(pixel, tempUv) * f;		   	// Rule out first screen pixels and flash.
            tempUv  = step(fract(tempUv), pixel);				// Add one line of pixels per tile.
            color = mix(color, vec3(1.0, 1.0, 0.0), (tempUv.x + tempUv.y) * first.x * first.y); // Yellow line
        #endif
        
        diffuseColor = vec4(color, 1.0);

        
    
    `

    sideMtl2.onBeforeCompile = (shader) => {
        // shader.uniforms.uyMultiplier = uniformParams.uyMultiplier
        // shader.uniforms.uyOffset = uniformParams.uyOffset
        shader.uniforms.uTime = uniformParams.uTime

        console.log('sideMtl2 shader: ', shader)
        shader.fragmentShader = shader.fragmentShader.replace('#include <common>', commonText)
        shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', causticsMapText)
    }

    const sideMtl3 = new THREE.MeshBasicMaterial({ // perfume3 amber case
        // color: '#77d',
        map: textureLoader.load('/images/glitterBg2.jpeg'),
        // transparent: true,
        // opacity: 0.4,
        stencilWrite: true,
        stencilRef: 5,
        stencilFunc: THREE.AlwaysStencilFunc,
        // stencilFail: THREE.ReplaceStencilOp,
        stencilZFail: THREE.ReplaceStencilOp,
        stencilZPass: THREE.ReplaceStencilOp,

    })


    sideMtl1.onBeforeCompile = (shader) => {
        console.log('face shader:  ', shader)
    }


    const frontSide = new THREE.Mesh(sideGeometry, sideMtl1)
    const topSide = new THREE.Mesh(sideGeometry, sideMtl1)
    const rightSide = new THREE.Mesh(sideGeometry, sideMtl2)
    const backSide = new THREE.Mesh(sideGeometry, sideMtl2)
    const bottomSide = new THREE.Mesh(sideGeometry, sideMtl3)
    const leftSide = new THREE.Mesh(sideGeometry, sideMtl3)

    // combine them to a cube
    // make the backside out, to seems transparent
    frontSide.rotateY(Math.PI)
    frontSide.position.set(0, 0, 5)

    backSide.rotateY(Math.PI) 
    backSide.rotateX(Math.PI)
    backSide.position.set(0, 0, -5)

    topSide.rotateX(Math.PI * 0.5)
    topSide.rotateZ(Math.PI)
    topSide.position.set(0, 5, 0)

    bottomSide.rotateX(-Math.PI * 0.5)
    bottomSide.rotateZ(Math.PI * 0.5)
    bottomSide.position.set(0, -5, 0)

    rightSide.rotateY(-Math.PI * 0.5)
    rightSide.position.set(5, 0, 0)
    leftSide.rotateY(Math.PI * 0.5)
    leftSide.position.set(-5, 0, 0)

    mesh.add(frontSide)
    mesh.add(backSide)
    mesh.add(topSide)
    mesh.add(bottomSide)
    mesh.add(rightSide)
    mesh.add(leftSide)

    // frontSide.renderOrder = 30
    // mesh.renderOrder = 40

    const onMeshChange = (elapsedTime, deltaTime) => {
        // const elapsedTime = clock.getElapsedTime()
        uniformParams.uTime.value = elapsedTime * 0.8
        sideMtl2.needsUpdate = true
    }

    return {
        mesh,
        onMeshChange: onMeshChange,
    }
}

export default containerBox()