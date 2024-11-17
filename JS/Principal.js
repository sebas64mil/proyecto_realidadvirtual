// main.js
import * as THREE from 'three'; // Importar Three.js
import { VRButton } from 'three/addons/webxr/VRButton.js';  // Importar VRButton
import { Escenario } from './Escenario.js'; // Importar la clase Escenario

// Inicialización de la escena de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Configurar el renderer para VR
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Añadir soporte VR a la página
document.body.appendChild(VRButton.createButton(renderer));  // Esto habilita el soporte de VR en el navegador

// Crear una instancia del escenario y agregar un cubo
const escenario = new Escenario(scene, camera);  // Pasar cámara al escenario
escenario.agregarPiso();
escenario.agregarPared();

// Configurar la cámara
camera.position.set(0, 1.6, 3); // Posición adecuada para VR

// Activar VR si se detecta el visor VR
renderer.xr.enabled = true;

// Animación para renderizar la escena
function animate() {
    // Si estamos en VR, el renderer actualizará automáticamente la cámara
    if (renderer.xr.isPresenting) {
        // La cámara es controlada automáticamente por WebXR en VR, no es necesario nada aquí
    } else {
        // Aquí puedes agregar cualquier lógica para mover la cámara fuera de VR, si es necesario
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
