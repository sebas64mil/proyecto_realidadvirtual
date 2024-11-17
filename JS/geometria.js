// Geometria.js
import * as THREE from 'three';

class Geometria {
    constructor(color = 0x00ff00) {
        this.color = color; // Color verde por defecto
    }

    // Método para crear un material
    crearMaterial() {
        return new THREE.MeshBasicMaterial({ color: this.color });
    }
}

export { Geometria }; // Exportar la clase para que se pueda usar en otros archivos
