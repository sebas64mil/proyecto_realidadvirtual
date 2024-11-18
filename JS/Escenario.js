import { Item } from './item.js'; // Importar la clase Item
import { PlayerModel } from './PM.js'; // Importar la clase PlayerModel
import * as THREE from 'three';

class Escenario {
    constructor(scene, camera) {
        this.scene = scene; // Recibe una escena de Three.js
        this.camera = camera; // La cámara que se pasa al PlayerModel
        this.item = new Item(); // Composición: Escenario tiene un Item
        this.pm = new PlayerModel(camera, scene); // Pasamos la escena al PlayerModel
    }

    // Método para agregar un piso al escenario
    agregarPiso() {
        const piso = this.item.crearPiso(); // Crear el cubo usando el método de Item
        piso.position.y = -1;
        this.scene.add(piso); // Añadir el cubo a la escena de Three.js
    }

    // Método para agregar paredes al escenario
    agregarPared() {
        const pared = this.item.crearPared();
        const pared1 = this.item.crearPared();  // Crear el cubo usando el método de Item
        pared.position.x = 10;
        pared1.position.x = -10;
        this.scene.add(pared);
        this.scene.add(pared1);  // Añadir las paredes a la escena de Three.js
    }

    // Método para agregar un bloque al escenario
    agregarBloque() {
        const bloque = this.item.crearBloque();  
        this.scene.add(bloque);
    }


}

export { Escenario }; // Exportar la clase Escenario
