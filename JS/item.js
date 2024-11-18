// Item.js
import * as THREE from 'three';

import { Geometria } from './geometria.js'; // Importar la clase Geometria

class Item extends Geometria {
    constructor(Color1) {
        super(Color1); // Llama al constructor de la clase base (Geometria)
    }

    // Método para crear un cubo
    crearPiso() {
        const geometry = this.crearObjetoPiso();// Crear la geometría del cubo
        const material = this.crearMaterialPiso(); // Crear el material usando el color
        const cubo = new THREE.Mesh(geometry, material); // Crear el mesh del cubo
        return cubo;
    }
    crearPared() {
        const geometry = this.crearObjetopared();// Crear la geometría del cubo
        const material = this.crearMaterialpared(); // Crear el material usando el color
        const cubo = new THREE.Mesh(geometry, material); // Crear el mesh del cubo
        return cubo;
    }
    crearBloque(){
        const geometry = this.crearObjetobloque();// Crear la geometría del cubo
        const material = this.crearMaterialbloque(); // Crear el material usando el color
        const cubo = new THREE.Mesh(geometry, material); // Crear el mesh del cubo
        return cubo;
    }
}

export { Item }; // Exportar la clase Item
