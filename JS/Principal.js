import { VRButton } from 'three/addons/webxr/VRButton.js';  // Importar VRButton
import { Escenario } from './Escenario.js'; // Importar la clase Escenario
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

// Añadir luz a la escena
const luzAmbiente = new THREE.AmbientLight(0x404040); // Luz suave
scene.add(luzAmbiente);

const luzDireccional = new THREE.DirectionalLight(0xffffff, 1);
luzDireccional.position.set(0, 1, 1).normalize();
scene.add(luzDireccional);

// Crear un escenario
const escenario = new Escenario(scene, camera);
escenario.agregarPiso();
escenario.agregarPared();

// Animación de la escena
function animate() {
    // Actualizar el movimiento con el gamepad
    escenario.mover();  // Este método ya llama a actualizar() en PlayerModel

    // Renderizar la escena
    renderer.render(scene, camera);
    requestAnimationFrame(animate);  // Continuar la animación
}

animate();

