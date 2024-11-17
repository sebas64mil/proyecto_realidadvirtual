// PlayerModel.js
import { PlayerController } from './PC.js';
import { PlayerView } from './PV.js';

class PlayerModel {
    constructor(camera) {
        this.velocidad = 10; // Atributo de velocidad
        this.gravedad = 9.8; // Atributo de gravedad
        this.playerController = new PlayerController(camera); // Añadimos el controlador
        this.playerView = new PlayerView();  // Añadimos la vista
    }

    consola() {
        console.log(`Velocidad: ${this.velocidad}, Gravedad: ${this.gravedad}`);
    }

    // Método para mover al jugador
    mover() {
        this.playerController.mover();  // Mueve la cámara a través del controlador
    }

    // Configurar las luces
    configurarLuces() {
        this.playerView.configurarLuces();  // Configura las luces a través de PlayerView
    }
}

export { PlayerModel };
