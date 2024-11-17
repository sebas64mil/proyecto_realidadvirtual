// PlayerController.js
import * as THREE from 'three';

class PlayerController {
    constructor(camera) {
        this.raycast = new THREE.Raycaster();  // Raycast para detectar interacciones
        this.camera = camera; // Cámara del jugador en primera persona
        this.mouse = new THREE.Vector2();  // Coordenadas del ratón

        // Evento de movimiento del ratón para actualizar la posición
        window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    }

    // Método para actualizar las coordenadas del ratón
    onMouseMove(event) {
        // Calcular las posiciones normalizadas del ratón (-1 a 1)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Aquí no necesitamos llamar a `update()` en el raycaster
        // solo necesitamos las coordenadas del ratón
    }

    // Métodos vacíos por ahora
    agarrar() {
        // Lógica para agarrar objetos
    }

    soltar() {
        // Lógica para soltar objetos
    }

    mover() {
        // Rotación de la cámara con el ratón
        const rotX = this.mouse.y * 0.1;  // Rotación en el eje Y
        const rotY = this.mouse.x * 0.1;  // Rotación en el eje X

        this.camera.rotation.x += rotX;
        this.camera.rotation.y += rotY;
    }
}

export { PlayerController };
