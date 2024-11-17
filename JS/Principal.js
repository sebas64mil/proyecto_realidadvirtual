// main.js
import * as THREE from 'three'; // Importar Three.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';  // Importar VRButton
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.18.0/dist/cannon-es.js';
import { Escenario } from './Escenario.js'; // Importar la clase Escenario

// Inicialización de la escena de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
//const controls = new OrbitControls(camera, renderer.domElement);

// Configurar el renderer para VR
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Añadir soporte VR a la página
document.body.appendChild(VRButton.createButton(renderer));  // Esto habilita el soporte de VR en el navegador

// Crear una instancia del escenario y agregar un cubo
const escenario = new Escenario(scene);
escenario.agregarPiso();
escenario.agregarPared();

// Configurar la cámara
camera.position.z = 5;

// Activar VR si se detecta el visor VR
renderer.xr.enabled = true;

// Animación para renderizar la escena
function animate() {
    // Si estamos en VR, el renderer actualizará automáticamente la cámara y los controles
    if (renderer.xr.isPresenting) {
        // Si estás usando VR, el movimiento de la cámara se maneja automáticamente
    } else {
        // Si no estamos en VR, seguir moviendo la cámara con OrbitControls
        controls.update(); // Para controles de órbita (no se usa en VR)
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
