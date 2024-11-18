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
            // Mover la cámara con el controlador de VR
            camera.position.set(position.x, position.y, position.z);

            // También puedes añadir rotación o inclinación aquí si lo deseas
            const rotation = controller.rotation;
            camera.rotation.set(rotation.x, rotation.y, rotation.z);
        }
    }

    // Mover utilizando el gamepad
    moverConGamepad() {
        // Obtención de los valores del gamepad
        const gamepad = navigator.getGamepads()[0];  // Obtener el primer gamepad

        if (gamepad) {
            // Crear el vector dirección con los valores de los ejes del gamepad
            const ejeX = gamepad.axes[0];  // Eje X del joystick
            const ejeZ = gamepad.axes[1];  // Eje Y del joystick

            // Crear el vector dirección para el movimiento
            const direccion = new THREE.Vector3(ejeX, 0, ejeZ); // Usamos ejeZ como avance
            this.playerController.mover(direccion, this.velocidad);  // Pasar la dirección al controlador

            // Agregar rotación o inclinación de la cámara basada en el gamepad si es necesario
            if (gamepad.axes[2] || gamepad.axes[3]) {
                const rotX = gamepad.axes[2];
                const rotY = gamepad.axes[3];
                this.playerController.rotar(rotX, rotY);  // Método adicional para rotación
            }
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
