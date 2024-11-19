import * as THREE from 'three';
import { PV } from './PV.js';
import { PM } from './PM.js'; 

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
        this.cameraContainer.position.set(0, 4.6, -0.5); // Añadimos el contenedor a la escena

        this.PV= new PV(scene);

        this.PM = new PM(scene);
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
    
                        // Verificar si el objeto intersectado tiene "cuarto" o "pasillo" en su nombre

    
                        // Si la distancia al objeto es menor a 0.25, detener el movimiento
                        if (distance < 0.25) {
                            if (firstHit.object.name && 
                                (firstHit.object.name.includes("cuarto") || firstHit.object.name.includes("pasillo"))) {
                                console.log("Colisión con objeto que contiene 'cuarto' o 'pasillo', movimiento detenido");
                                return; // Detener movimiento si se colide con uno de esos objetos
                            }
                        }
                    }
    
                    // Si no hay colisión o la distancia es mayor a 0.25, permitir el movimiento
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
        // Variable para rastrear si el botón ya fue presionado
        if (this.buttonPressed === undefined) {
            this.buttonPressed = false; // Inicialización la primera vez que se llama al método
        }
    
        // Realizamos el raycast para detectar las colisiones
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    
        if (intersects.length > 0) {
            // Accedemos al objeto intersectado
            let intersectedObject = intersects[0].object;
    
            // Recorremos la jerarquía hacia arriba buscando el objeto principal
            while (intersectedObject.parent) {
                if (intersectedObject.name === "FBXbotonInicio") {
                    // Verificar si un gamepad está conectado
                    const gamepads = navigator.getGamepads();
                    if (gamepads && gamepads[0]) {
                        const gamepad = gamepads[0];
    
                        // Verificar si el botón fue presionado y no ha sido registrado antes
                        if (gamepad.buttons[0].pressed && !this.buttonPressed) {
                            console.log("El objeto colisionado es el portalButton y se presionó el botón del gamepad");
    
                            // Marcamos el botón como presionado
                            this.buttonPressed = true;
    
                            // Vibración en el dispositivo móvil
                            if (navigator.vibrate) {
                                navigator.vibrate(200);
                            }
    
                            // Establecer el valor de Boton
                            let Boton = "inicio";
    
                            // Llamar al método para crear el plano directamente

                                this.PM.createText(Boton); // Crear el plano en lugar de solo cambiar el valor de Boton
 
    
                            return;
                        }
                    }
    
                    console.log("El objeto colisionado es el portalButton, pero no se presionó el botón del gamepad");
                    return;
                }
                intersectedObject = intersectedObject.parent;
            }
    
            console.log("El objeto colisionado no es el portalButton");
        }
    }
    
    
    

    checkVisibilityBasedOnDistance() {
        const thresholdDistance = 2.5; // Ajusta la distancia según sea necesario
        const thresholdDistance1 = 7;
        this.scene.traverse((child) => {
            // Asegúrate de que el objeto tiene un nombre y verifica si es relevante
            if (child.name && child.name.startsWith('FBX')) {
                const objectWorldPosition = new THREE.Vector3();
                child.getWorldPosition(objectWorldPosition);
    
                const distance = this.cameraContainer.position.distanceTo(objectWorldPosition);
    
                // Mostrar/ocultar el objeto basado en la distancia
                child.visible = distance <= thresholdDistance;
            }

            if (child.name && child.name.startsWith('FBXA')) {
                const objectWorldPosition = new THREE.Vector3();
                child.getWorldPosition(objectWorldPosition);
    
                const distance = this.cameraContainer.position.distanceTo(objectWorldPosition);
    
                // Mostrar/ocultar el objeto basado en la distancia
                child.visible = distance <= thresholdDistance1;
            }
        });
    }
    
    
    
    
    

}
