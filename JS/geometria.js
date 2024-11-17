import * as THREE from 'three';

export class Geometria {
    constructor() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1); // Geometría del cubo
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Material del cubo
        this.cubo = new THREE.Mesh(this.geometry, this.material); // Mesh del cubo
    }

    getCubo() {
        return this.cubo; // Retorna el cubo
    }
}