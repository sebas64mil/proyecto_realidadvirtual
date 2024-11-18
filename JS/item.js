// Item.js
import * as THREE from 'three';
import { Geometria } from './geometria.js';

class Item extends Geometria {
    constructor(Color1, Color2, Color3) {
        super(Color1, Color2, Color3);
        this.textureLoader = new THREE.TextureLoader(); // Instanciar el cargador de texturas
    }

    crearPiso() {
        const geometry = this.crearObjetoPiso();
        const material = this.crearMaterialPiso();
        return new THREE.Mesh(geometry, material);
    }

    crearPared() {
        const geometry = this.crearObjetopared();
        const material = this.crearMaterialpared();
        return new THREE.Mesh(geometry, material);
    }

    crearBloque(callback) {
        this.crearObjetobloque((object) => {
            // Asignar materiales personalizados con texturas
            const albedoTransparencyTexture = this.textureLoader.load('Textures/CCP2_AlbedoTransparency.png');
            const alphaTexture = this.textureLoader.load('Textures/CCP2_Alpha.png');
            const metallicSmoothnessTexture = this.textureLoader.load('Textures/CCP2_MetallicSmoothness.png');
            const normalTexture = this.textureLoader.load('Textures/CCP2_Normal.png');
            const roughnessTexture = this.textureLoader.load('Textures/CCP2_Roughness.png');

            const material = new THREE.MeshStandardMaterial({
                map: albedoTransparencyTexture,
                alphaMap: alphaTexture,
                metalnessMap: metallicSmoothnessTexture,
                normalMap: normalTexture,
                roughnessMap: roughnessTexture,
                transparent: true,
            });

            object.traverse((child) => {
                if (child.isMesh) {
                    child.material = material; 
                }
            });

            callback(object); 
        });
    }
}

export { Item };
