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
        this.enVR = false; // Verificador de si estamos en VR
    }

    consola() {
        console.log(`Velocidad: ${this.velocidad}, Gravedad: ${this.gravedad}, En VR: ${this.enVR}`);
    }

    // Método para mover al jugador
    mover(camera) {
        // Si estamos en VR, actualizamos la posición con el controlador de VR
        if (this.enVR) {
            this.moverConVR(camera);  // Llamamos al método para mover usando VR
        } else {
            this.moverConGamepad();   // De lo contrario, usamos el gamepad
        }
    }

    // Mover utilizando el controlador VR
    moverConVR(camera) {
        const controller = renderer.xr.getController(0); // Suponemos que usamos el primer controlador

        if (controller) {
            const position = controller.position;
            // Aquí puedes modificar la posición del jugador o de la cámara con los valores del controlador
            // Ejemplo de cómo usar el controlador para mover la cámara:
            camera.position.set(position.x, position.y, position.z);
        }
    }

    // Mover utilizando el gamepad
    moverConGamepad() {
        // Obtención de los valores del gamepad
        const gamepad = navigator.getGamepads()[0];  // Obtener el primer gamepad

        if (gamepad) {
            // Crear el vector direccion con los valores de los ejes del gamepad
            const ejeX = gamepad.axes[0];  // Eje X del joystick
            const ejeZ = gamepad.axes[1];  // Eje Y del joystick

            // Crear el vector direccion para el movimiento
            const direccion = new THREE.Vector3(ejeX, 0, ejeZ); // Usamos ejeZ como avance
            this.playerController.mover(direccion, this.velocidad);  // Pasar la dirección al controlador
        }
    }

    // Configurar las luces
    configurarLuces() {
        this.playerView.configurarLuces();  // Configura las luces a través de PlayerView
    }

    // Actualizar el estado de VR
    actualizarEstadoVR(estadoVR) {
        this.enVR = estadoVR; // Actualiza el booleano que verifica si estamos en VR
    }
}

export { PlayerModel };
