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
document.body.appendChild(VRButton.createButton(renderer));  // Esto agrega el botón de VR en la página

// Crear un escenario
const escenario = new Escenario(scene, camera);
escenario.agregarPiso();
escenario.agregarPared();
escenario.agregarBloque();

// Controladores de VR
const controller1 = renderer.xr.getController(0);  // Primer controlador
const controller2 = renderer.xr.getController(1);  // Segundo controlador
scene.add(controller1);
scene.add(controller2);

// Detectar el estado del VR y actualizar el modelo del jugador
renderer.xr.addEventListener('sessionstart', () => {
    // Cuando comience la sesión de VR, actualizamos el estado
    escenario.pm.actualizarEstadoVR(true);
});

renderer.xr.addEventListener('sessionend', () => {
    // Cuando termine la sesión de VR, actualizamos el estado
    escenario.pm.actualizarEstadoVR(false);
});

// Animación de la escena
function animate() {
    // Obtener la cámara de VR si estamos en modo XR
    const vrCamera = renderer.xr.getCamera(camera);  // Cámara de VR cuando está en VR

    // Actualizar el movimiento del jugador con la cámara adecuada
    escenario.mover(renderer.xr.isPresenting ? vrCamera : camera);  // Usar la cámara correcta (VR o estándar)

    // Renderizar la escena con la cámara correcta
    renderer.render(scene, renderer.xr.isPresenting ? vrCamera : camera);  // Usa la cámara de VR si estamos en VR
}

// Usar setAnimationLoop para VR
renderer.setAnimationLoop(animate);
