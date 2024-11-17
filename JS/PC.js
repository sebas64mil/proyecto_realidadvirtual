import * as THREE from 'three';

class PlayerController {
    constructor(camera) {
        this.raycast = new THREE.Raycaster();  // Raycast para detectar interacciones
        this.camera = camera; // Cámara del jugador en primera persona
    }

    // Métodos vacíos por ahora
    agarrar() {
        // Lógica para agarrar objetos
    }

    soltar() {
        // Lógica para soltar objetos
    }

    mover() {
        // No es necesario mover la cámara con el ratón, ya que ahora usamos VR
    }
}

export { PlayerController };
