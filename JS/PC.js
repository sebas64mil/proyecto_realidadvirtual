import * as THREE from 'three';
import { PV } from './PV.js';

export class PC {
    constructor(camera, scene) {
        this.camera = camera; // Cámara proporcionada por WebXR
        this.scene = scene;
        this.raycaster = new THREE.Raycaster();
        this.gamepad = null; // Inicialización del gamepad
        
        // Crear un contenedor para la cámara, lo que permitirá mover la cámara dentro del contenedor
        this.cameraContainer = new THREE.Object3D();
        this.camera.position.set(0, 0, 0.0)
        this.camera.rotation.y = THREE.MathUtils.degToRad(180)
        this.cameraContainer.add(this.camera); // Añadimos la cámara al contenedor
        this.scene.add(this.cameraContainer);
        this.cameraContainer.position.set(0, 4.6, 0.0); // Añadimos el contenedor a la escena

        this.PV= new PV(scene);
    }

    move() {
        const gamepads = navigator.getGamepads();
        if (gamepads) {
            this.gamepad = gamepads[0];  // Asumimos que el primer gamepad es el que se usa
        
            if (this.gamepad) {
                const moveAxisX = this.gamepad.axes[0];
                const moveAxisY = this.gamepad.axes[1];
        
                if (moveAxisX !== 0 || moveAxisY !== 0) {
                    const direction = this.camera.getWorldDirection(new THREE.Vector3()).normalize();
                    direction.y = 0;
        
                    const movement = new THREE.Vector3(
                        direction.x * moveAxisY * -0.01,
                        0,
                        direction.z * moveAxisY * -0.01
                    );
        
                    // Crear un rayo para detectar colisiones
                    this.raycaster.ray.origin.copy(this.cameraContainer.position);
                    this.raycaster.ray.direction.copy(movement);

                    
                }
            }
        }

        
    }

    Comprobar() {
        // Realizamos el raycast para detectar las colisiones
        const intersects = this.raycaster.intersectObjects(this.scene.children, true); // Asegúrate de recorrer todos los objetos hijos
        
        if (intersects.length > 0) {
            // Accedemos al último objeto con el que ha colisionado
            const intersectedObject = intersects[intersects.length - 1].object;
        
            // Verificamos si el objeto colisionado tiene el nombre "portalButton"
            if (intersectedObject.name === "portalButton") {
                console.log("El objeto colisionado es el portalButton");
    
                // Vibración en el dispositivo móvil
                if (navigator.vibrate) {
                    navigator.vibrate(200);
                }
            } else {
                console.log("El objeto colisionado no es el portalButton");
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
        } 
    }
    
    

}
