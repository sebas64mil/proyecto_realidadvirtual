// pv.js
import * as THREE from 'three';

export class PV {
    constructor(scene) {
        this.scene = scene; // Recibe la escena como argumento
    }

    addGreenCube() {
        const geometry = new THREE.BoxGeometry(20, 1, 30);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const piso = new THREE.Mesh(geometry, material);

        piso.position.set(0,-3,0)

        // Añadir el cubo directamente a la escena
        this.scene.add(piso);
    }
    Paredroja(){
        const geometry = new THREE.BoxGeometry(1, 20, 30);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const pared = new THREE.Mesh(geometry, material);
        const pared1 = new THREE.Mesh(geometry, material);


        pared.position.set(10,0,0)
        pared1.position.set(-10,0,0)

        // Añadir el cubo directamente a la escena
        this.scene.add(pared);
        this.scene.add(pared1);

    }
}
