// PC.js
import * as THREE from 'three';

class PlayerController {
    constructor(camera, scene) {
        this.camera = camera;  // La cámara de la escena
        this.scene = scene;  // La escena donde se encuentran los objetos
        this.raycast = new THREE.Raycaster();  // Raycast para detectar interacciones
    }

    // Método para mover la cámara con el controlador
    mover(direccion, velocidad) {
        // Obtener la rotación de la cámara en el eje X (inclinación hacia arriba y hacia abajo)
        const rotacionX = this.camera.rotation.x;

        // Definir el intervalo en el que se permite el movimiento (por ejemplo, entre -45° y 45°)
        const intervaloMaximo = Math.PI / 8;  // 45 grados en radianes

        // Si la rotación en el eje X está dentro del intervalo permitido, mover
        if (rotacionX >= -intervaloMaximo && rotacionX <= intervaloMaximo) {
            // Limitar el movimiento en Y a 0, solo mover en los ejes X y Z
            direccion.y = 0;

            // Multiplicar la dirección por la velocidad
            direccion.multiplyScalar(velocidad);

            // Mover la cámara con un vector de dirección escalado
            this.camera.position.add(direccion);
            
        } else {
            console.log("No se puede mover cuando la cámara está mirando el suelo o el techo.");
        }
    }

    // Método para actualizar el raycast y puntero


    // Método para agarrar objetos (Ejemplo)
    agarrar() {
        // Lógica para agarrar objetos
    }

    // Método para soltar objetos (Ejemplo)
    soltar() {
        // Lógica para soltar objetos
    }
}

export { PlayerController };
