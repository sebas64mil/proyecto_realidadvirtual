// Item.js
import * as THREE from 'three';

import { Geometria } from './geometria.js'; // Importar la clase Geometria

class Item extends Geometria {
    constructor(Color1) {
        super(Color1); // Llama al constructor de la clase base (Geometria)
    }

    // Método para crear un cubo
    crearCubo() {
        const geometry = this.crearObjeto();// Crear la geometría del cubo
        const material = this.crearMaterial(); // Crear el material usando el color
        const cubo = new THREE.Mesh(geometry, material); // Crear el mesh del cubo
        return cubo;
    }
}

export { Item }; // Exportar la clase Item
