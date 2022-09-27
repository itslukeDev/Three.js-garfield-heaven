import * as THREE from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//Init variables
var scene,camera,renderer,model;

var models = [];

const clock = new THREE.Clock();

const startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', init );

function init() {

const overlay = document.getElementById( 'overlay' );
overlay.remove();

//Scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0xFF8604)

//Camera
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0,0,0);

//Renderer 
renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Fly Controls
var controls = new FlyControls( camera, renderer.domElement );

    controls.movementSpeed = 30;
    controls.domElement = document.body;
    controls.rollSpeed = Math.PI / 6;
    controls.autoForward = false;
    controls.dragToLook = false;

//Lighting
var abint = new THREE.AmbientLight(0x555500, 4);
scene.add(abint);


//Gltf model
var loader = new GLTFLoader();
for(var i = 0; i<400;i++) {
    loader.load( "./assets/scene.gltf", function(gltf) {
    
        model = gltf.scene;
        model.scale.set(10,10,10);
        model.position.x = (Math.random() - 0.5) * 300;
        model.position.y = (Math.random() - 0.5) * 100;
        model.position.z = (Math.random() - 0.5) * 200;
	    model.rotation.y = (Math.random() * 10);
        scene.add(model);
        models.push(model);

    }, undefined, function(error) {
        console.error(error);
    });
    
}

//Window auto resize 
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})
//Background Music
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const songElement = document.getElementById( 'song' );
songElement.volume = 0.4; 
songElement.play();



//Animation
function animate() {
    requestAnimationFrame(animate);
    
    for ( let i = 0; i < models.length; i ++ ) {
    const model = models[ i ];
    model.rotation.y += 0.01
    }
    const delta = clock.getDelta();

	controls.update( delta );
    renderer.render(scene,camera);
}
animate();
}
