// pm.js

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import * as THREE from 'three';

export class PM {
    constructor(scene) {
        this.scene = scene;  // Escena a la que se le añadirá el texto
    }

    createText(Boton) {
        if (Boton === "inicio") {
            // Usamos el FontLoader para cargar la fuente y crear el texto
            const loader = new THREE.FontLoader();
            loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
                const geometry = new THREE.TextGeometry('Continuar', {
                    font: font,
                    size: 1.5,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 10,
                    bevelSize: 8,
                    bevelOffset: 0,
                    bevelSegments: 5
                });

                // Material del texto
                const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
                const text = new THREE.Mesh(geometry, material);
                text.name = 'FBXbotonInicio';

                // Posicionar el texto en la escena
                text.position.set(0, 6, 0);
                this.scene.add(text);
            });
        }
    }
}