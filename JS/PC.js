import * as THREE from 'three';

class PlayerController {
    constructor(camera, scene) {
        this.camera = camera; // La cámara de la escena
        this.scene = scene; // La escena donde se encuentran los objetos
        this.raycast = new THREE.Raycaster(); // Raycast para detectar interacciones
        this.gamepadIndex = null; // Índice del gamepad conectado
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

    // Método para mover la cámara basado en el joystick
    moverCamaraPorJoystick(velocidad) {
        if (this.gamepadIndex === null) return;

        const gamepad = navigator.getGamepads()[this.gamepadIndex];
        if (!gamepad) return;

        const joystickX = gamepad.axes[0]; // Eje horizontal del joystick
        const joystickY = gamepad.axes[1]; // Eje vertical del joystick

        // Velocidad de movimiento

        // Movimiento de la cámara
        this.camera.position.x += joystickX * velocidad;
        this.camera.position.z += joystickY * velocidad;
    }
}

export { PlayerController };
