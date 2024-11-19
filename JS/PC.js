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

    handleVRMovement(isVRMode) {
        if (isVRMode) {
            // Aquí deberíamos usar el controlador de VR para mover la cámara
            // Esto depende de cómo estás gestionando los controles en VR (a través de WebXR)
            // Asumiendo que ya tienes código para manejar el movimiento del controlador en VR
            // Este bloque solo sería ejecutado si estamos en modo VR
            this.handleVRControllerMovement();
        } else {
            // Detectar inputs del joystick izquierdo cuando no estamos en VR
            this.handleGamepadMovement();
        }

        // Configurar el raycaster
        this.raycaster.set(this.camera.position, this.camera.children[0].getWorldDirection(new THREE.Vector3()));
    }

    handleVRControllerMovement() {
        // Aquí debes poner el código para el movimiento con los controladores de VR
        // Este es un ejemplo general; si usas WebXR o alguna otra librería de VR,
        // tendrás que adaptar este código para seguir su flujo de datos
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

