import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene objects

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);
scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

//nst camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


// Renderer 

const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setPixelRatio ( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 0);
document.body.appendChild( renderer.domElement );

// Camera

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 3, 3, 0.2 );

const controls = new OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window );
//controls.addEventListener( 'change', render );
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 5;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 1;
//controls.maxPolarAngle = Math.PI / 2;

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );



const loader = new GLTFLoader();


loader.load(
	// resource URL
//	'Objects/protein.glb',
	'Objects/proteinMedium.gltf',
//	'Objects/proteinSmall.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

//		gltf.animations; // Array<THREE.AnimationClip>
//		gltf.scene; // THREE.Group
//		gltf.scenes; // Array<THREE.Group>
//		gltf.cameras; // Array<THREE.Camera>
//		gltf.asset; // Object

	},
	// called while loading is progressing
	// called when loading has errors
//	function ( error ) {
//
//		console.log( 'An error happened' );
//
//	}
);

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );

}

const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
scene.add( directionalLight );

const light = new THREE.AmbientLight( 0xffffff, 0.6 ); // soft white light
scene.add( light );


animate();

