// PM.js
import { PlayerController } from './PC.js';
import { PlayerView } from './PV.js';
import * as THREE from 'three';

class PlayerModel {
    constructor(camera, scene) {
        this.velocidad = 0.1; // Atributo de velocidad
        this.gravedad = 9.8; // Atributo de gravedad
        this.playerController = new PlayerController(camera, scene); // Pasar la escena al controlador
        this.playerView = new PlayerView();  // Añadimos la vista
    }

    consola() {
        console.log(`Velocidad: ${this.velocidad}, Gravedad: ${this.gravedad}`);
    }

    // Método para mover al jugador
    mover(camera) {
        // Obtención de los valores del gamepad
        const gamepad = navigator.getGamepads()[0];  // Obtener el primer gamepad

        if (gamepad) {
            // Crear el vector direccion con los valores de los ejes del gamepad
            const ejeX = gamepad.axes[0];  // Eje X del joystick
            const ejeZ = gamepad.axes[1];  // Eje Y del joystick

            // Crear el vector direccion para el movimiento
            const direccion = new THREE.Vector3(ejeX, 0, ejeZ); // Usamos ejeZ como avance
            this.playerController.mover(direccion, this.velocidad, camera);  // Pasar la cámara actual
        }
    }

    // Configurar las luces
    configurarLuces() {
        this.playerView.configurarLuces();  // Configura las luces a través de PlayerView
    }
}

export { PlayerModel };
