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

// Variables para el control DualShock 4
let gamepadIndex = null;
const raycaster = new THREE.Raycaster();

// Crear una línea para visualizar el raycast
const raycastLineGeometry = new THREE.BufferGeometry();
const raycastLineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Color rojo
const raycastLine = new THREE.Line(raycastLineGeometry, raycastLineMaterial);
scene.add(raycastLine);

// Detectar el gamepad conectado
window.addEventListener("gamepadconnected", (event) => {
    console.log("Gamepad conectado:", event.gamepad);
    gamepadIndex = event.gamepad.index;
});

// Detectar cuando se desconecta
window.addEventListener("gamepaddisconnected", (event) => {
    console.log("Gamepad desconectado:", event.gamepad);
    gamepadIndex = null;
});

// Función para manejar las entradas del control
function handleGamepadInput() {
    if (gamepadIndex !== null) {
        const gamepad = navigator.getGamepads()[gamepadIndex];
        if (gamepad) {
            // Leer sticks analógicos para mover la cámara
            const leftX = gamepad.axes[0]; // Eje X del stick izquierdo
            const leftY = gamepad.axes[1]; // Eje Y del stick izquierdo

            // Mover la cámara según el stick izquierdo
            camera.position.x += leftX * 0.1; // Ajusta la velocidad según sea necesario
            camera.position.z += leftY * 0.1;

            // Lanzar el raycast desde la cámara
            const direction = new THREE.Vector3();
            camera.getWorldDirection(direction); // Obtener la dirección en la que apunta la cámara
            raycaster.set(camera.position, direction);

            // Actualizar visualización del raycast
            updateRaycastVisualization(raycaster);

            // Detectar intersecciones con objetos en la escena
            const intersects = raycaster.intersectObjects(scene.children);
            if (intersects.length > 0) {
                console.log("Intersección:", intersects[0].object.name); // Objeto apuntado por la cámara
            }

            // Avanzar hacia donde apunta la cámara al presionar el botón X (botón 0)
            if (gamepad.buttons[0].pressed) { 
                moveForward(0.8); // Avanzar 0.1 unidades
            }
        }
    }
}

// Función para avanzar la cámara hacia adelante
function moveForward(distance) {
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.multiplyScalar(distance); // Ajustar la distancia
    camera.position.add(forward);
}

// Función para actualizar la línea del raycast
function updateRaycastVisualization(raycaster) {
    const origin = raycaster.ray.origin;
    const direction = raycaster.ray.direction.clone().multiplyScalar(5); // Longitud de la línea

    const positions = new Float32Array([
        origin.x, origin.y, origin.z,
        origin.x + direction.x, origin.y + direction.y, origin.z + direction.z
    ]);

    raycastLineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
}

// Usar setAnimationLoop para VR en lugar de requestAnimationFrame
function animate() {
    // Si estamos en VR, el renderer actualizará automáticamente la cámara
    if (renderer.xr.isPresenting) {
        // La cámara es controlada automáticamente por WebXR en VR, no es necesario nada aquí
    } else {
        // Aquí puedes agregar cualquier lógica para mover la cámara fuera de VR, si es necesario
    }

    // Manejar la entrada del control
    handleGamepadInput();

    // Renderizar la escena
    renderer.render(scene, camera);
}

// Usar setAnimationLoop para WebXR
renderer.setAnimationLoop(animate);
