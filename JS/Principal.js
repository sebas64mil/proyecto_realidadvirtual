// main.js
import * as THREE from 'three'; // Importar Three.js
import { Escenario } from './Escenario.js'; // Importar la clase Escenario

// Inicialización de la escena de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear una instancia del escenario y agregar un cubo
const escenario = new Escenario(scene);
escenario.agregarCubo();

// Configurar la cámara
camera.position.z = 5;

// Animación para renderizar la escena
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
