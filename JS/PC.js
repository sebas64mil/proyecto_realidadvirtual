// PC.js
import * as THREE from 'three';

class PlayerController {
    constructor(camera, scene) {
        this.camera = camera;  // La cámara de la escena
        this.scene = scene;  // La escena donde se encuentran los objetos
        this.raycast = new THREE.Raycaster();  // Raycast para detectar interacciones
    }

    // Método para mover la cámara con el controlador
    mover(direccion) {

        // Mover la cámara con un vector de dirección
        this.camera.position.add(direccion);
    }

    // Método para actualizar el raycast y puntero
    actualizarRaycast() {
        const direccion = new THREE.Vector3();
        this.camera.getWorldDirection(direccion); // Obtener dirección hacia donde apunta la cámara

        // Verificar que la dirección sea válida
        if (!(direccion instanceof THREE.Vector3)) {
            console.error("La dirección obtenida no es un objeto THREE.Vector3 válido.");
            return;
        }

        console.log("Dirección de la cámara:", direccion); // Verificar la dirección obtenida

        this.raycast.set(this.camera.position, direccion);  // Establecer raycast

        // Verificar las intersecciones
        const intersecciones = this.raycast.intersectObjects(this.scene.children); // Ver si intersecta con objetos en la escena
        if (intersecciones.length > 0) {
            // Si hay intersección, hacer algo con las intersecciones
            console.log("Intersección encontrada:", intersecciones[0].point);
        } else {
            // Si no hay intersección, mover el puntero hacia adelante
            console.log("No hay intersección, moviendo 5 unidades hacia adelante.");
        }
    }

    // Método para agarrar objetos (Ejemplo)
    agarrar() {
        // Lógica para agarrar objetos
    }

    // Método para soltar objetos (Ejemplo)
    soltar() {
        // Lógica para soltar objetos
    }
}

export { PlayerController };
