import * as THREE from 'three';

class PlayerController {
    constructor(camera, scene, character) {
        this.camera = camera; // La cámara de la escena
        this.scene = scene; // La escena donde se encuentran los objetos
        this.character = character; // El personaje que se moverá
        this.raycast = new THREE.Raycaster(); // Raycast para detectar interacciones
        this.gamepadIndex = null; // Índice del gamepad conectado

        // Variables de movimiento
        this.speed = 0.1;
        this.gravity = 0.02;
        this.verticalSpeed = 0;
        this.moveForward = false;
        this.moveBackward = false;

        this.detectarGamepad();
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

    // Método para manejar el movimiento del personaje
    actualizarMovimiento() {
        if (this.gamepadIndex === null) return;

        const gamepad = navigator.getGamepads()[this.gamepadIndex];
        if (!gamepad) return;

        const leftStickY = gamepad.axes[1]; // Accede al eje Y del joystick izquierdo

        // Determinar la dirección del movimiento
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
        this.camera.getWorldDirection(direction);

        // Aplicar movimiento al personaje
        if (this.moveForward) {
            this.character.position.addScaledVector(direction, this.speed); // Avanzar
        }
        if (this.moveBackward) {
            this.character.position.addScaledVector(direction, -this.speed); // Retroceder
        }

        // Manejar gravedad y altura
        if (this.character.position.y > -1) {
            this.verticalSpeed -= this.gravity; // Aplicar gravedad
        } else {
            this.verticalSpeed = 0; // Detener la caída
            this.character.position.y = -1; // Asegurar que no atraviese el suelo
        }

        this.character.position.y += this.verticalSpeed; // Actualizar posición vertical
    }
}

export { PlayerController };
