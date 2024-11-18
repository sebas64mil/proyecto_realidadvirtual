import * as THREE from 'three';

class PlayerController {
    constructor(camera, scene, character) {
        this.camera = camera; // Cámara para calcular la dirección
        this.character = character; // Personaje a mover
        this.speed = 0.1; // Velocidad de movimiento
        this.moveForward = false; // Indicador de movimiento hacia adelante
        this.moveBackward = false; // Indicador de movimiento hacia atrás
        this.gamepadIndex = null; // Índice del gamepad

        this.detectarGamepad(); // Configura la detección del gamepad
    }

    // Método para detectar y registrar el gamepad
    detectarGamepad() {
        window.addEventListener("gamepadconnected", (event) => {
            this.gamepadIndex = event.gamepad.index;
            console.log("Gamepad conectado:", event.gamepad);
        });

        window.addEventListener("gamepaddisconnected", () => {
            this.gamepadIndex = null;
            console.log("Gamepad desconectado");
        });
    }

    // Método principal para actualizar el movimiento
    actualizarMovimiento() {
        if (this.gamepadIndex === null) return;

        const gamepad = navigator.getGamepads()[this.gamepadIndex];
        if (!gamepad) return;

        const leftStickY = gamepad.axes[1]; // Eje Y del joystick izquierdo

        // Determinar dirección del movimiento
        if (leftStickY > 0.1) {
            this.moveForward = false;
            this.moveBackward = true;
        } else if (leftStickY < -0.1) {
            this.moveBackward = false;
            this.moveForward = true;
        } else {
            this.moveForward = false;
            this.moveBackward = false;
        }

        // Calcular la dirección basada en la cámara
        const direction = new THREE.Vector3();
        this.camera.getWorldDirection(direction); // Obtiene la dirección en la que apunta la cámara

        // Movimiento hacia adelante y hacia atrás en la dirección de la cámara
        if (this.moveForward) {
            this.character.position.addScaledVector(direction, this.speed); // Mover hacia adelante
        }
        if (this.moveBackward) {
            this.character.position.addScaledVector(direction, -this.speed); // Mover hacia atrás
        }
    }
}

export { PlayerController };
