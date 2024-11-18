// Geometria.js
import * as THREE from 'three';

class Geometria {
    constructor(Color1= 0x00ff00,Color2= 0xff0000, Color3=0x0000ff) {
        this.Color1 = Color1;
        this.Color2 = Color2; 
        this.Color3 = Color3; // Color Color1 por defecto
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
    crearMaterialbloque() {
        return new THREE.MeshBasicMaterial({ color: this.Color3 });
    }
    crearObjetobloque(){

        return new THREE.BoxGeometry(2, 2, 2);
    }



}

export { Geometria }; // Exportar la clase para que se pueda usar en otros archivos
