// Geometria.js
import * as THREE from 'three';

class Geometria {
    constructor(Color1 = 0x00ff00) {
        this.Color1 = Color1; // Color Color1 por defecto
    }

    // Método para crear un material
    crearMaterial() {
        return new THREE.MeshBasicMaterial({ color: this.Color1 });
    }
    crearObjeto(){

        return new THREE.BoxGeometry(1, 1, 1);
    }
}

export { Geometria }; // Exportar la clase para que se pueda usar en otros archivos
