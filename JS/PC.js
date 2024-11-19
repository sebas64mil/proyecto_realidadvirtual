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
        this.scene.add(this.cameraContainer);
        this.cameraContainer.position.set(0, 0.3, 0.8) // Añadimos el contenedor a la escena
    }

    move() {
        // Detectar si el gamepad está conectado
        const gamepads = navigator.getGamepads();
        if (gamepads) {
            this.gamepad = gamepads[0]; // Suponiendo que solo se usa un gamepad

            if (this.gamepad) {
                // Aquí accedemos al eje de movimiento (usualmente el eje Z)
                const moveAxis = this.gamepad.axes[0]; // Eje vertical del gamepad (movimiento hacia adelante/atrás)

                // Si estamos moviendo el eje, calculamos la dirección en la que está mirando la cámara
                if (moveAxis !== 0) {
                    // Obtener la dirección de movimiento de la cámara (solo los ejes X y Z)
                    const direction = this.camera.getWorldDirection(new THREE.Vector3()).normalize();

                    // Solo mover en el eje X y Z, sin afectar el Y
                    direction.y = 0; // Fijar el valor de Y en 0 para evitar movimientos en el eje vertical

                    // Normalizar la dirección para asegurarse de que el movimiento sea constante
                    direction.normalize();

                    // Raycast desde la cámara para determinar hacia dónde estamos mirando
                    // Establecer el origen y la dirección del rayo
                    this.raycaster.set(this.camera.position, direction);

                    // Calcular el movimiento del contenedor de la cámara (solo en X y Z)
                    const movement = direction.multiplyScalar(moveAxis * 0.1); // Ajustar velocidad
                    this.cameraContainer.position.add(movement); // Mover el contenedor
                }
            }
        }
    }
}
