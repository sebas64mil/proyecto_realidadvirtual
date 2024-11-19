import * as THREE from 'three';

export class PC {
    constructor(camera, scene) {
        this.camera = camera; // Cámara proporcionada por WebXR
        this.scene = scene;
        this.raycaster = new THREE.Raycaster();
        this.gamepad = null; // Inicialización del gamepad
    }

    initializeGamepad() {
        // Configurar detección de gamepads
        window.addEventListener('gamepadconnected', (event) => {
            if (event.gamepad.mapping === 'standard') {
                this.gamepad = event.gamepad;
                console.log('Gamepad conectado:', this.gamepad);
            }
        });
    }

    handleVRMovement() {
        if (!this.gamepad) return;
    
        // Detectar los botones B12 (adelante) y B13 (atrás)
        const gamepads = navigator.getGamepads();
        if (gamepads && gamepads[0]) {
            const { buttons } = gamepads[0];
    
            // Comprobar si los botones B12 y B13 están presionados
            const moveForward = buttons[12].pressed; // B12
            const moveBackward = buttons[13].pressed; // B13
    
            // Definir la dirección de movimiento
            const direction = new THREE.Vector3();
            this.camera.children[0].getWorldDirection(direction); // Usar la cámara VR contenida en el contenedor
            direction.y = 0; // Restringir movimiento al plano XZ
            direction.normalize();
    
            // Movimiento adelante y atrás en el plano XZ
            if (moveForward) {
                this.camera.position.x += direction.x * 0.1;
                this.camera.position.z += direction.z * 0.1;
            }
    
            if (moveBackward) {
                this.camera.position.x -= direction.x * 0.1;
                this.camera.position.z -= direction.z * 0.1;
            }
        }
    
        // Configurar el raycaster
        this.raycaster.set(this.camera.position, this.camera.children[0].getWorldDirection(new THREE.Vector3()));
    }
    
    
    
}
