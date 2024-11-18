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

            // Calcular dirección de movimiento en VR
            if (renderer.xr.isPresenting) {
                const direction = new THREE.Vector3();
                camera.getWorldDirection(direction); // Dirección actual de la cámara
                direction.y = 0; // Ignorar cambios en altura

                // Mover en base a la dirección
                camera.position.addScaledVector(direction, -leftY * 0.1); // Adelante/atrás
                const strafe = new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0, 1, 0));
                camera.position.addScaledVector(strafe, leftX * 0.1); // Izquierda/derecha
            } else {
                // Movimiento normal fuera de VR
                camera.position.x += leftX * 0.1;
                camera.position.z += leftY * 0.1;
            }

            // Leer botones
            gamepad.buttons.forEach((button, index) => {
                if (button.pressed) {
                    console.log(`Botón ${index} presionado`);
                }
            });

            // Avanzar hacia donde apunta la cámara al presionar el botón X (botón 0)
            if (gamepad.buttons[0].pressed) {
                moveForward(0.8);
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

// Usar setAnimationLoop para VR en lugar de requestAnimationFrame
function animate() {
    // Manejar la entrada del control en VR o no VR
    handleGamepadInput();

    // Renderizar la escena
    renderer.render(scene, camera);
}

// Usar setAnimationLoop para WebXR
renderer.setAnimationLoop(animate);
