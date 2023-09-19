// import * as THREE from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene()

// Instantiate a loader
const loader = new GLTFLoader();

let earthMesh; // Store the reference to the loaded object

loader.load( 'Earth.glb', function ( glb ) {

    const root = glb.scene;
    root.scale.set(0.03,0.03,0.03)

    // Store the reference to the loaded object for rotation
    earthMesh = glb.scene;

	scene.add( glb.scene );
    console.log(glb.scene)

}, undefined, function ( error ) {

	console.error( error );

} );

// Lighting
const ambientlight = new THREE.AmbientLight(0x6633ff, 1)
scene.add(ambientlight)

const light = new THREE.DirectionalLight(0xffffff, 2)
light.position.set(-20, 5, 30)
scene.add(light)


const light2 = new THREE.DirectionalLight(0xffffff, 2)
light.position.set(20, -5, 30)
scene.add(light2)
// const dlHelper = new THREE.DirectionalLightHelper(light, 25);
// scene.add(dlHelper)

const pointLight = new THREE.PointLight(0xffffff, 2, 30)
pointLight.position.set(-20, 5, 30)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, 2, 30)
pointLight.position.set(20, -5, 30)
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xffffff, 2, 30)
pointLight.position.set(-20, -5, 30)
scene.add(pointLight3)
// const plHelper = new THREE.PointLightHelper(pointLight, 25)
// scene.add(plHelper)






const sizes = {
    width: window.innerWidth / 2,
    height: window.innerHeight / 1.25
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 25
scene.add(camera)

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true // Make the canvas background transparent
})

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 40;
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingfactor = 0.4;
controls.enableZoom = false;


renderer.setSize(sizes.width, sizes.height) // Update canvas size on window resize


let angle = 2.5; // Initial rotation angle
let angle2 = -5.9;

function animate() {
    requestAnimationFrame(animate)

    // Update rotation angle
    angle += 0.0009; // You can adjust the speed of rotation here
    // Apply rotation to the object
    if (earthMesh) {
        earthMesh.rotation.y = angle;
        earthMesh.rotation.x = angle2;

    }

    controls.update();

    renderer.render(scene, camera)
}

animate()