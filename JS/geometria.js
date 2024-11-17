import * as THREE from 'three';

export class Geometria {
    constructor(geometry, material) {
        this.geometry = geometry; // Geometría pasada como parámetro
        this.material = material; // Material pasado como parámetro
        this.object3D = new THREE.Mesh(this.geometry, this.material); // Creación del objeto 3D
    }

    getObject3D() {
        return this.object3D; // Retorna el objeto 3D
    }
}
