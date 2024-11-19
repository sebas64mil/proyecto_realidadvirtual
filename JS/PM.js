import * as THREE from 'three';

export class PM {
    constructor(scene) {
        this.scene = scene;  // Escena a la que se le añadirá el plano
    }

    createText(Boton) {
        if (Boton === "inicio") {
            // Crear un plano en lugar de texto
            const geometry = new THREE.PlaneGeometry(0.5, 0.5); // Tamaño del plano (ajústalo según lo que necesites)
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }); // Material del plano, en este caso un color sólido

            const plane = new THREE.Mesh(geometry, material);
            plane.name = 'FBXbotonInicio'; // Nombre del objeto para la detección de raycast

            // Posicionar el plano en la escena
            plane.position.set(0, 6.5, 0); // Ajusta la posición como sea necesario
            this.scene.add(plane);
        }
    }
}
