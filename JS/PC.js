import * as THREE from 'three';

export class PC {
    constructor(camera, scene) {
        this.camera = camera; // Cámara proporcionada por WebXR
        this.scene = scene;
        this.raycaster = new THREE.Raycaster();
        this.gamepad = null; // Inicialización del gamepad
        
        // Crear un contenedor para la cámara, lo que permitirá mover la cámara dentro del contenedor
        this.cameraContainer = new THREE.Object3D();
        this.cameraContainer.add(this.camera); // Añadimos la cámara al contenedor
        this.scene.add(this.cameraContainer); // Añadimos el contenedor a la escena
    }

    move() {
        // Detectar si el gamepad está conectado
        const gamepads = navigator.getGamepads();
        if (gamepads) {
            this.gamepad = gamepads[0]; // Suponiendo que solo se usa un gamepad

            if (this.gamepad) {
                // Aquí accedemos al eje de movimiento (usualmente el eje Z)
                const moveAxis = this.gamepad.axes[1]; // Eje vertical del gamepad (movimiento hacia adelante/atrás)

                // Si estamos moviendo el eje, calculamos la dirección en la que está mirando la cámara
                if (moveAxis !== 0) {
                    // Raycast desde la cámara para determinar hacia dónde estamos mirando
                    this.raycaster.update(this.camera.position, this.camera.getWorldDirection(new THREE.Vector3()));

                    // Obtener la dirección de movimiento
                    const direction = this.camera.getWorldDirection(new THREE.Vector3()).normalize();

                    // Mover el contenedor en la dirección de la cámara (eje Z)
                    const movement = direction.multiplyScalar(moveAxis * 0.1); // Ajustar velocidad
                    this.cameraContainer.position.add(movement);
                }
            }
        }
    }
}
