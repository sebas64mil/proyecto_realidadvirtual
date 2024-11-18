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

// Controladores de VR
const controller1 = renderer.xr.getController(0);
const controller2 = renderer.xr.getController(1);
scene.add(controller1);
scene.add(controller2);

// Animación de la escena
function animate() {
    // Actualizar el movimiento con el gamepad
    escenario.pm.actualizarConGamepad();  // Llamar al método que actualiza el movimiento

    // Renderizar la escena con la cámara adecuada
    renderer.render(scene, camera);
}

// Usar setAnimationLoop para VR
renderer.setAnimationLoop(animate);
