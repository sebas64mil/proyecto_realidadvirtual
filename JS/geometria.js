// Geometria.js
import * as THREE from 'three';

class Geometria {
    constructor(Color1= 0x00ff00,Color2= 0xff0000) {
        this.Color1 = Color1;
        this.Color2 = Color2;  // Color Color1 por defecto
    }

    // Método para crear un material
    crearMaterialPiso() {
        return new THREE.MeshBasicMaterial({ color: this.Color1 });
    }
    crearObjetoPiso(){

        return new THREE.BoxGeometry(20, 1, 30);
    }

    crearMaterialpared() {
        return new THREE.MeshBasicMaterial({ color: this.Color2 });
    }
    crearObjetopared(){

        return new THREE.BoxGeometry(1, 20, 30);
    }

}

export { Geometria }; // Exportar la clase para que se pueda usar en otros archivos
