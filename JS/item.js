import { Geometria } from './geometria.js';
import * as THREE from 'three';

export class Item extends Geometria {
    constructor() {
        // Llama al constructor de Geometria con valores predeterminados
        const defaultGeometry = new THREE.BoxGeometry(1, 1, 1);
        const defaultMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        super(defaultGeometry, defaultMaterial);

        this.scene = new THREE.Scene(); // Crea la escena
        this.scene.add(this.object3D); // Añade el objeto 3D a la escena
    }

    // Método para personalizar la geometría y el material si se necesita
    setGeometryAndMaterial(geometry, material) {
        this.geometry = geometry;
        this.material = material;
        this.object3D = new THREE.Mesh(this.geometry, this.material);

        // Reemplaza el objeto en la escena
        this.scene.clear(); // Limpia la escena
        this.scene.add(this.object3D);
    }

    render(renderer, camera) {
        renderer.render(this.scene, camera);
    }
}
