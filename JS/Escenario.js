// Escenario.js
import { Item } from './item.js'; // Importar la clase Item
import * as THREE from 'three';

class Escenario {
    constructor(scene) {
        this.scene = scene; // Recibe una escena de Three.js
        this.item = new Item(); // Composición: Escenario tiene un Item
    }

    // Método para agregar un cubo al escenario
    agregarCubo() {
        const cubo = this.item.crearCubo(); // Crear el cubo usando el método de Item
        this.scene.add(cubo); // Añadir el cubo a la escena de Three.js
    }
}
export { Escenario }; // Exportar la clase Escenario
