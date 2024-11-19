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
        // Detectar si el gamepad está conectado
        const gamepads = navigator.getGamepads();
        if (gamepads) {
            this.gamepad = gamepads[0]; // Suponiendo que solo se usa un gamepad
    
            if (this.gamepad) {
                // Accedemos a los ejes de movimiento (horizontal y vertical)
                const moveAxisX = this.gamepad.axes[0]; // Eje horizontal del gamepad (izquierda/derecha)
                const moveAxisY = this.gamepad.axes[1]; // Eje vertical del gamepad (adelante/atrás)
    
                // Si cualquiera de los ejes se mueve
                if (moveAxisX !== 0 || moveAxisY !== 0) {
                    // Lanza un raycast para detectar colisiones
                    const rayOrigin = new THREE.Vector3().setFromMatrixPosition(this.camera.matrixWorld);
                    const direction = this.camera.getWorldDirection(new THREE.Vector3()).normalize();
    
                    this.raycaster.set(rayOrigin, direction);
    
                    // Detectar intersecciones
                    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    
                    if (intersects.length > 0) {
                        const firstHit = intersects[0]; // Primera intersección
                        const distance = firstHit.distance;
    
                        // Si la distancia al objeto es menor a 2, detener el movimiento
                        if (distance < 0.25) {
                            return; // No permitas movimiento adicional
                        }
                    }
    
                    // Si no hay colisión o la distancia es mayor a 2, permitir el movimiento
                    const forwardMovement = new THREE.Vector3(
                        direction.x * moveAxisY * -0.01, // Movimiento adelante/atrás
                        0,
                        direction.z * moveAxisY * -0.01
                    );
                    this.cameraContainer.position.add(forwardMovement);
                }
            }
        }
    }

    

    Comprobar() {
        // Realizamos el raycast para detectar las colisiones
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    
        if (intersects.length > 0) {
            // Accedemos al objeto intersectado
            let intersectedObject = intersects[0].object;
    
            // Recorremos la jerarquía hacia arriba buscando el objeto principal
            while (intersectedObject.parent) {
                if (intersectedObject.name === "portalButton") {
                    console.log("El objeto colisionado es el portalButton");
    
                    // Vibración en el dispositivo móvil
                    if (navigator.vibrate) {
                        navigator.vibrate(200);
                    }
                    return;
                }
                intersectedObject = intersectedObject.parent;
            }
    
            console.log("El objeto colisionado no es el portalButton");
        }
    }
    
    
    

}
