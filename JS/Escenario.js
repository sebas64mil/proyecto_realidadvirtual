import { Item } from './item.js';
import { PlayerModel } from './PM.js';
import * as THREE from 'three';

class Escenario {
    constructor(scene, camera) {
        this.scene = scene; // Recibe una escena de Three.js
        this.camera = camera; // La cámara que se pasa al PlayerModel
        this.item = new Item(); // Composición: Escenario tiene un Item

        // Crear personaje y añadirlo a la escena
        this.character = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        );
        this.character.position.y = -1; // Asegurar que el personaje esté en el suelo
        this.scene.add(this.character);

        this.pm = new PlayerModel(camera, scene, this.character); // Pasamos el personaje al PlayerModel
    }

    // Método para actualizar el escenario
    actualizar() {
        this.pm.actualizar(); // Llamar a la actualización del PlayerModel
    }

    agregarPiso() {
        const piso = this.item.crearPiso(); // Crear el cubo usando el método de Item
        piso.position.y = -1;
        this.scene.add(piso); // Añadir el cubo a la escena de Three.js
    }

    agregarPared() {
        const pared = this.item.crearPared();
        const pared1 = this.item.crearPared(); // Crear el cubo usando el método de Item
        pared.position.x = 10;
        pared1.position.x = -10;
        this.scene.add(pared);
        this.scene.add(pared1); // Añadir las paredes a la escena de Three.js
    }

    agregarBloque() {
        const bloque = this.item.crearBloque();
        this.scene.add(bloque);
    }
}

export { Escenario };
