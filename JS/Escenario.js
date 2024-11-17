import { Item } from './item.js';
import * as THREE from 'three';

// Configuración de Three.js
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Crear una instancia de Item
const item = new Item();

// Animación
function animate() {
    requestAnimationFrame(animate);
    item.render(renderer, camera);
}
animate();
