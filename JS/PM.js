import { PlayerController } from './PC.js';
import { PlayerView } from './PV.js';

class PlayerModel {
    constructor(camera, scene, character) {
        this.velocidad = 0.1; // Atributo de velocidad
        this.gravedad = 9.8; // Atributo de gravedad
        this.playerController = new PlayerController(camera, scene, character); // Controlador con personaje
        this.playerView = new PlayerView(); // Añadimos la vista
        this.enVR = false; // Verificador de si estamos en VR
    }

    // Método para actualizar el modelo
    actualizar() {
        this.playerController.actualizarMovimiento();
    }
}

export { PlayerModel };
