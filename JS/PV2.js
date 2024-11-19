import * as THREE from 'three';

export class Extras {
    constructor(scene) {
        this.scene = scene; // Recibe la escena como argumento
        
    }

    crearSituaciones(){

        const geometry_situaciones = new THREE.PlaneGeometry( 0.5, 0.4 );


        const material_opcion1 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        const opcion1 = new THREE.Mesh( geometry_situaciones, material_opcion1 );
        opcion1.position.set(-0.51,6.2,0)
        opcion1.rotation.y=THREE.MathUtils.degToRad(90);

        this.scene.add( opcion1 );
    }
}