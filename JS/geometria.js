// Geometria.js
import * as THREE from 'three';
import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@v0.149.0/examples/jsm/loaders/FBXLoader.js";
class Geometria {
    constructor(Color1 = 0x00ff00, Color2 = 0xff0000, Color3 = 0x0000ff) {
        this.Color1 = Color1;
        this.Color2 = Color2;
        this.Color3 = Color3;
        this.loader = new FBXLoader(); // Instanciar el FBXLoader
    }

    // Métodos existentes para Piso y Pared
    crearMaterialPiso() {
        return new THREE.MeshBasicMaterial({ color: this.Color1 });
    }
    crearObjetoPiso() {
        return new THREE.BoxGeometry(20, 1, 30);
    }

    crearMaterialpared() {
        return new THREE.MeshBasicMaterial({ color: this.Color2 });
    }
    crearObjetopared() {
        return new THREE.BoxGeometry(1, 20, 30);
    }

    crearObjetobloque(callback) {
        this.loader.load('./modelos3d/CCP2.fbx', (object) => {
            object.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true; 
                    child.receiveShadow = true;
                }
            });
            callback(object); 
        });
    }
}

export { Geometria };
