// PC.js
import * as THREE from 'three';

class PlayerController {
    constructor(camera, scene) {
        this.camera = camera;  // La cámara de la escena
        this.scene = scene;  // La escena donde se encuentran los objetos
        this.raycast = new THREE.Raycaster();  // Raycast para detectar interacciones
    }


}

export { PlayerController };
