// PM.js
import { PlayerController } from './PC.js';
import { PlayerView } from './PV.js';
import * as THREE from 'three';

class PlayerModel {
    constructor(camera, scene, renderer) {
        this.velocidad = 0.1; // Atributo de velocidad
        this.gravedad = 9.8; // Atributo de gravedad
        this.playerController = new PlayerController(camera, scene); // Pasar la escena al controlador
        this.playerView = new PlayerView();  // Añadimos la vista

        // Controladores de VR
        this.controller1 = renderer.xr.getController(0);  // Primer controlador de VR
        this.controller2 = renderer.xr.getController(1);  // Segundo controlador de VR
        scene.add(this.controller1);
        scene.add(this.controller2);
    }

    consola() {
        console.log(`Velocidad: ${this.velocidad}, Gravedad: ${this.gravedad}`);
    }

    // Método para mover al jugador en VR
    mover() {
        // Si estamos en VR, usar los controladores de VR
        const gamepad = navigator.getGamepads()[0];  // Obtener el primer gamepad (para los no-VR)
    
        if (this.controller1 && this.controller2) {
            // Si estamos en VR, obtener la posición de los controladores
            const controller1Position = this.controller1.position;
            const controller2Position = this.controller2.position;

            // Usar la posición de los controladores para mover la cámara
            // Aquí podemos hacer el movimiento de la cámara según la posición de los controladores
            const direccion = new THREE.Vector3(controller1Position.x, controller1Position.y, controller1Position.z);
            this.playerController.mover(direccion, this.velocidad);
        } else if (gamepad) {
            // Si no estamos en VR, usar el gamepad tradicional
            const ejeX = gamepad.axes[0];  // Eje X del joystick
            const ejeZ = gamepad.axes[1];  // Eje Y del joystick
    
            // Crear el vector direccion para el movimiento
            const direccion = new THREE.Vector3(ejeX, 0, ejeZ); // Usamos ejeZ como avance
            this.playerController.mover(direccion, this.velocidad);
        }
    }

    // Configurar las luces
    configurarLuces() {
        this.playerView.configurarLuces();  // Configura las luces a través de PlayerView
    }
}

export { PlayerModel };
