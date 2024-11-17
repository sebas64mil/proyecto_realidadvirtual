import { Item } from './item.js';
import * as THREE from 'three';

// Configuración básica de Three.js
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Crear instancia de Item
const item = new Item();

// Si deseas personalizar la geometría y el material, usa este método:
// const customGeometry = new THREE.SphereGeometry(1, 32, 32);
// const customMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// item.setGeometryAndMaterial(customGeometry, customMaterial);

// Animación
function animate() {
    requestAnimationFrame(animate);
    item.render(renderer, camera);
}
animate();
