import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.18.0/dist/cannon-es.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true; // Habilita WebXR para VR
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer)); // Añade el botón de VR

// Configuración inicial de la cámara (personaje POV)
camera.position.set(0, 2, 8); // Altura inicial y posición de la cámara

/////////////////////////////
// Geometrías THREE        //
/////////////////////////////

const boxSize = 20; // Nuevo tamaño para la plataforma cuadrada
const boxGeo = new THREE.BoxGeometry(boxSize, 1, boxSize); // Plataforma cuadrada
const boxMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(boxGeo, boxMat);
scene.add(cube);

const geometry1 = new THREE.SphereGeometry(2, 8, 8);
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const bola = new THREE.Mesh(geometry1, material2);
scene.add(bola);
bola.position.y = 2.5;
bola.position.z = 0; // La esfera permanece estática

/////////////////////////////
// Constructor CANNON      //
/////////////////////////////

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.81, 0)
});

const timeStep = 1 / 60;

////////////////////////////////
// Plataforma CANNON          //
////////////////////////////////

const boxShape = new CANNON.Box(new CANNON.Vec3(boxSize / 2, 0.5, boxSize / 2));
const boxBody = new CANNON.Body({
    mass: 0,
    shape: boxShape
});
boxBody.position.set(0, 0, 0);
world.addBody(boxBody);

/////////////////////////////
// Movimiento del personaje //
/////////////////////////////

let moveSpeed = 0.2; // Velocidad de movimiento
let moveDirection = { forward: 0, right: 0 }; // Direcciones de movimiento

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW': // Adelante
            moveDirection.forward = -1;
            break;
        case 'KeyS': // Atrás
            moveDirection.forward = 1;
            break;
        case 'KeyA': // Izquierda
            moveDirection.right = -1;
            break;
        case 'KeyD': // Derecha
            moveDirection.right = 1;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
        case 'KeyS':
            moveDirection.forward = 0;
            break;
        case 'KeyA':
        case 'KeyD':
            moveDirection.right = 0;
            break;
    }
});

/////////////////////////////
// Función de animación    //
/////////////////////////////

function animate() {
    world.step(timeStep);

    // Sincronizar plataforma
    cube.position.copy(boxBody.position);
    cube.quaternion.copy(boxBody.quaternion);

    // Movimiento de la cámara (personaje)
    camera.position.x += moveSpeed * moveDirection.right;
    camera.position.z += moveSpeed * moveDirection.forward;

    // Renderizar escena
    renderer.render(scene, camera);
}

// Usar setAnimationLoop para VR
renderer.setAnimationLoop(animate);
