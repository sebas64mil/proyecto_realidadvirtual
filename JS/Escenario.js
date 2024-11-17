// Escenario.js
import { Item } from './item.js'; // Importar la clase Item
import * as THREE from 'three';

class Escenario {
    constructor(scene) {
        this.scene = scene; // Recibe una escena de Three.js
        this.item = new Item(); // Composición: Escenario tiene un Item
    }

    // Método para agregar un cubo al escenario
    agregarPiso() {
        const piso = this.item.crearPiso(); // Crear el cubo usando el método de Item
        piso.position.y=-1
        this.scene.add(piso); // Añadir el cubo a la escena de Three.js
    }
    agregarPared() {
        const pared = this.item.crearPared();
        const pared1 = this.item.crearPared();  // Crear el cubo usando el método de Item
        pared.position.x=10
        pared1.position.x=-10
        this.scene.add(pared);
        this.scene.add(pared1);  // Añadir el cubo a la escena de Three.js
    }
}
export { Escenario }; // Exportar la clase Escenario
