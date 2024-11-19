import * as THREE from 'three';

export class PC {
    constructor(camera, scene) {
        this.camera = camera; // Cámara proporcionada por WebXR
        this.scene = scene;
        this.raycaster = new THREE.Raycaster();
        this.gamepad = null; // Inicialización del gamepad
        
        // Crear un contenedor para la cámara, lo que permitirá mover la cámara dentro del contenedor
        this.cameraContainer = new THREE.Object3D();
        this.camera.position.set(0, 0, 0.0)
        this.camera.rotation.y=THREE.MathUtils.degToRad(180)
        this.cameraContainer.add(this.camera); // Añadimos la cámara al contenedor
        this.scene.add(this.cameraContainer);
        this.cameraContainer.position.set(0, 4.6, 0.0) // Añadimos el contenedor a la escena
    }

    move() {
        // Detectar si el gamepad está conectado
        const gamepads = navigator.getGamepads();
        if (gamepads) {
            this.gamepad = gamepads[0]; // Suponiendo que solo se usa un gamepad
    
            if (this.gamepad) {
                // Accedemos a los ejes de movimiento (horizontal y vertical)
                const moveAxisX = this.gamepad.axes[0]; // Eje horizontal del gamepad (izquierda/derecha)
                const moveAxisY = this.gamepad.axes[1]; // Eje vertical del gamepad (adelante/atrás)
    
                // Si cualquiera de los ejes se mueve, calculamos la dirección en la que está mirando la cámara
                if (moveAxisX !== 0 || moveAxisY !== 0) {
                    // Obtener la dirección de movimiento de la cámara (solo los ejes X y Z)
                    const direction = this.camera.getWorldDirection(new THREE.Vector3()).normalize();
    
                    // Solo mover en el eje X y Z, sin afectar el Y
                    direction.y = 0; // Fijar el valor de Y en 0 para evitar movimientos en el eje vertical
    
                    // Normalizar la dirección para asegurarse de que el movimiento sea constante
                    direction.normalize();
    
                    // Calcular el movimiento en los ejes X y Z a partir de los ejes del gamepad
                    const movement = new THREE.Vector3(
                        direction.x * moveAxisY * 0.1, // Ajustar la velocidad en el eje X
                        0, // No se mueve en el eje Y
                        direction.z * moveAxisY * 0.1 // Ajustar la velocidad en el eje Z (mover hacia adelante/atrás)
                    );
    
                    // Agregar el movimiento en el eje X (horizontal) según el eje X del gamepad
                    this.cameraContainer.position.x += movement.x + moveAxisX * 0.1; // Movimiento adicional en el eje X
    
                    // Agregar el movimiento en el eje Z (vertical) según el eje Y del gamepad
                    this.cameraContainer.position.z += movement.z; // Movimiento en el eje Z
                }
            }
        }
    }
    
    
}
