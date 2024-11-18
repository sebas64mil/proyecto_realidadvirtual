// main.js
import { Escenario } from './Escenario.js'; // Importar la clase Escenario
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Configuración de VR (si es necesario)
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear un escenario
const escenario = new Escenario(scene, camera);
escenario.agregarPiso();
escenario.agregarPared();

// Configuración inicial de la cámara
camera.position.set(0, 1.6, 3);

// Animación de la escena
function animate() {
    // Actualizar el movimiento con el gamepad
    escenario.mover();  // Este método ya llama a actualizar() en PlayerModel

    // Renderizar la escena
    renderer.render(scene, camera);
    requestAnimationFrame(animate);  // Continuar la animación
}

animate();
