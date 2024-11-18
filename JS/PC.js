// PC.js
import * as THREE from 'three';

class PlayerController {
    constructor(camera, scene) {
        this.camera = camera;  // La cámara de la escena
        this.scene = scene;  // La escena donde se encuentran los objetos
        this.raycast = new THREE.Raycaster();  // Raycast para detectar interacciones
        this.speed = 0.1;  // Velocidad de movimiento
        this.gravity = 0.01;  // Gravedad
        this.verticalSpeed = 0;  // Velocidad vertical
        this.character = new THREE.Object3D(); // Representación del personaje
    }

    // Método para mover la cámara o el personaje con el controlador
    mover(direccion, velocidad) {
        const rotacionX = this.camera.rotation.x;

        // Intervalo de rotación para limitar el movimiento (máximo 45°)
        const intervaloMaximo = Math.PI / 8;

        // Si la rotación está dentro del intervalo permitido, mover
        if (rotacionX >= -intervaloMaximo && rotacionX <= intervaloMaximo) {
            direccion.y = 0;  // No mover en el eje Y (solo X y Z)
            direccion.multiplyScalar(velocidad);  // Escalar la dirección con la velocidad

            // Mover el personaje según la dirección
            this.character.position.add(direccion);
        } else {
            console.log("No se puede mover cuando la cámara está mirando el suelo o el techo.");
        }
    }

    // Método para actualizar la posición según los controles del gamepad
    actualizarConGamepad() {
        const gamepad = navigator.getGamepads()[0];  // Obtener el primer gamepad

        if (gamepad) {
            const leftStickY = gamepad.axes[1];  // Obtener el valor del eje Y del joystick izquierdo
            const moveForward = leftStickY < -0.1;  // Mover hacia adelante
            const moveBackward = leftStickY > 0.1; // Mover hacia atrás

            // Dirección de movimiento (dependiendo de la cámara)
            const direction = new THREE.Vector3();
            this.camera.getWorldDirection(direction);  // Obtener la dirección de la cámara

            // Mover hacia adelante o hacia atrás
            if (moveForward) {
                this.mover(direction, this.speed);  // Avanzar
            } else if (moveBackward) {
                this.mover(direction, -this.speed);  // Retroceder
            }

            // Gravedad
            if (this.character.position.y > -1) {  // Verificar si está sobre el suelo
                this.verticalSpeed -= this.gravity;  // Aplicar gravedad
            } else {
                this.verticalSpeed = 0;  // Detener la caída
                this.character.position.y = -1;  // Asegurar que está en el suelo
            }

            // Actualizar la posición vertical
            this.character.position.y += this.verticalSpeed;
        }
    }

    // Método para actualizar el raycast y puntero
    // (Puedes agregar aquí lógica para interacciones si lo necesitas)
}

export { PlayerController };
