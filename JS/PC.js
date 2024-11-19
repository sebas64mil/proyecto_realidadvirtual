import * as THREE from 'three';

export class PC {
    constructor(camera, scene) {
        this.camera = camera; // Cámara proporcionada por WebXR
        this.scene = scene;
        this.raycaster = new THREE.Raycaster();
        this.gamepad = null; // Inicialización del gamepad
        this.controllers = {}; // Para almacenar los controladores de VR
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

    handleVRMovement(isVRMode) {
        if (isVRMode) {
            this.handleVRControllerMovement();
        } else {
            // Detectar inputs del joystick izquierdo cuando no estamos en VR
            this.handleGamepadMovement();
        }

        // Configurar el raycaster
        this.raycaster.set(this.camera.position, this.camera.children[0].getWorldDirection(new THREE.Vector3()));
    }

    handleVRControllerMovement() {
        // Obtener los controladores de VR
        const controllers = this.controllers;
        for (let controllerId in controllers) {
            const controller = controllers[controllerId];

            if (controller && controller.gamepad) {
                const gamepad = controller.gamepad;

                // Supongamos que el joystick está en el primer eje (índice 0) para X y en el segundo eje (índice 1) para Y
                const axes = gamepad.axes;
                const moveX = axes[0] * 0.1; // Movimiento en el eje X
                const moveZ = axes[1] * 0.1; // Movimiento en el eje Z

                // Calcular dirección usando el raycaster
                const direction = new THREE.Vector3();
                this.camera.children[0].getWorldDirection(direction); // Usar la cámara VR contenida en el contenedor
                direction.y = 0; // Restringir movimiento al plano XZ
                direction.normalize();

                // Mover la cámara en el plano XZ usando los inputs de los controladores
                this.camera.position.x += direction.x * moveZ - direction.z * moveX;
                this.camera.position.z += direction.z * moveZ + direction.x * moveX;
            }
        }
    }

    handleGamepadMovement() {
        if (!this.gamepad) return;
    
        // Detectar inputs del joystick izquierdo
        const gamepads = navigator.getGamepads();
        if (gamepads && gamepads[0]) {
            const { axes } = gamepads[0];
            const moveX = axes[0] * 0.1; // Movimiento en el eje X
            const moveZ = axes[1] * 0.1; // Movimiento en el eje Z
    
            // Calcular dirección en el plano XZ
            const direction = new THREE.Vector3();
            this.camera.children[0].getWorldDirection(direction); // Usar la cámara VR contenida en el contenedor
            direction.y = 0; // Restringir movimiento al plano XZ
            direction.normalize();
    
            // Mover el contenedor de la cámara
            this.camera.position.x += direction.x * moveZ - direction.z * moveX;
            this.camera.position.z += direction.z * moveZ + direction.x * moveX;
        }
    }
}
