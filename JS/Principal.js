// Tu archivo principal
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { Escenario } from './Escenario.js';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Configuración del renderer con WebXR
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Habilitar WebXR para el modo VR
renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));

// Crear un escenario
const escenario = new Escenario(scene, camera);
escenario.agregarPiso();
escenario.agregarPared();
escenario.agregarBloque();

// Animación de la escena
const escena = new Escenario(scene, camera);

// En el bucle de animación
function animate() {
    // Actualizar el movimiento basado en el gamepad

    // Renderizar la escena
    renderer.render(scene, camera);
}

// Configurar la animación
renderer.setAnimationLoop(animate);