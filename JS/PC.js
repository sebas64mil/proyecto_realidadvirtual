import * as THREE from 'three';

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
        
                    // Llamar al método para comprobar la colisión con el botón
                    this.checkButtonCollision();
        
                    // Si no hay colisión, mover la cámara
                    const intersects = this.raycaster.intersectObjects(this.scene.children);
                    if (intersects.length === 0) {
                        this.cameraContainer.position.add(movement);
                    }
                }
            }
        }
    }

    checkButtonCollision() {
        const intersects = this.raycaster.intersectObjects(this.scene.children);
    
        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
    
            if (intersectedObject.name === 'portalButton') { // Verificar si el objeto tocado es el botón
                // Comprobar si el botón 'X' (índice 0) o 'A' está presionado
                if (this.gamepad && this.gamepad.buttons[0].pressed) {
                    console.log("Botón X o A presionado"); // Aquí se puede ejecutar alguna lógica
                    // Si quieres que el dispositivo vibre al presionar el botón
                    if (window.navigator.vibrate) {
                        window.navigator.vibrate(200); // Vibrar por 200ms
                    }
                }
            }
        }
    }
}
