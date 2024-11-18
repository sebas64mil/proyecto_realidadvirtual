// pc.js
import * as THREE from 'three';

export class PC {
    constructor(camera, scene) {
        this.camera = camera; // Recibe la cámara VR
        this.scene = scene; // Recibe la escena para realizar interacciones con raycasting
        this.raycaster = new THREE.Raycaster();
        this.gamepad = null; // Referencia al gamepad
        this.moveSpeed = 0.1; // Velocidad de movimiento
    }

    initializeGamepad() {
        window.addEventListener("gamepadconnected", (event) => {
            console.log("Gamepad connected:", event.gamepad);
            this.gamepad = event.gamepad;
        });

        window.addEventListener("gamepaddisconnected", (event) => {
            console.log("Gamepad disconnected:", event.gamepad);
            this.gamepad = null;
        });
    }

    handleVRMovement() {
        if (!this.gamepad) return;

        // Actualizar el estado del gamepad
        const gamepad = navigator.getGamepads()[this.gamepad.index];
        const [leftStickX, leftStickY] = gamepad.axes; // Ejes del joystick izquierdo

        // Raycaster desde la cámara hacia adelante
        const direction = new THREE.Vector3();
        this.camera.getWorldDirection(direction);

        // Normalizar para solo moverse en X y Z
        direction.y = 0;
        direction.normalize();

        // Actualizar posición de la cámara
        const moveX = direction.x * leftStickY * this.moveSpeed;
        const moveZ = direction.z * leftStickY * this.moveSpeed;
        this.camera.position.x += moveX;
        this.camera.position.z += moveZ;
    }
}
