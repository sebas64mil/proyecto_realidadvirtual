import { Geometria } from './geometria.js';
import * as THREE from 'three';

export class Item extends Geometria {
    constructor() {
        super(); // Llama al constructor de Geometria
        this.scene = new THREE.Scene(); // Escena
        this.scene.add(this.getCubo()); // Añade el cubo a la escena
    }

    render(renderer, camera) {
        renderer.render(this.scene, camera); // Renderiza la escena
    }
}
