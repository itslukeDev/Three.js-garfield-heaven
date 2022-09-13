//Init variables
var scene,camera,renderer,model;

//Scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0xFF8604)

//Camera
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0,30,60);

//Renderer 
renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Orbit Controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

//Lighting
var abint = new THREE.AmbientLight(0x555500, 4);
scene.add(abint);


//Gltf model
let loader = new THREE.GLTFLoader();
loader.load( 'Models/scene.gltf', function ( gltf ) {
    model = gltf.scene;
    
    model.scale.set(50,50,50);
    model.position.y = -40;
    scene.add(model);
    animate();
})

//Window auto resize 
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

//Animation
function animate() {
    requestAnimationFrame(animate);

    model.rotation.y += 0.01;
    //model.rotation.x += 0.01;
    //model.rotation.z += 0.01;

    renderer.render(scene,camera);
}

