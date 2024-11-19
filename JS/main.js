import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { PV } from './PV.js';
import { PC } from './PC.js';
import { PM } from './PM.js';

import * as CANNON from 'cannon-es'; // Esto debería funcionar si la importación del CDN es correcta

class Main {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.pv = null;
        this.pc = null;
        this.pm = new PM();
        
        this.world = null; // Mundo de física
        this.raycaster = new THREE.Raycaster();
    }

    init() {
        // Configurar escena
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        // Configurar renderer con soporte VR
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.xr.enabled = true;
        document.body.appendChild(this.renderer.domElement);

        // Agregar el botón VR
        document.body.appendChild(VRButton.createButton(this.renderer));

        // Configurar cámara
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Inicializar mundo de física
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0); // Configurar gravedad

        // Configurar OrbitControls (si es necesario)
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // Inicializar clases adicionales
        this.pc = new PC(this.camera, this.scene);
        this.pv = new PV(this.scene);

        // Añadir geometrías
        this.pv.addGreenCube();
        this.pv.Paredroja();
        this.pv.FBXcuarto1();
        this.pv.FBXpasillo1();
        this.pv.FBXcuarto2();
        this.pv.FBXpasillo2();
        this.pv.FBXcuarto3();
        this.pv.FBXpasillo3();
        this.pv.FBXcuarto4();
        this.pv.FBXpasillo4();
        this.pv.FBXcuarto5();
        this.pv.FBXbutton();
    }

    start() {
        this.init();

        // Loop de renderizado
        this.renderer.setAnimationLoop((time, frame) => {
            // Actualizar la física
            this.world.step(1 / 60); // Avanzar la simulación de la física

            // Llamar a la lógica de movimiento del gamepad
            this.pc.move();

            // Renderizar la escena con la cámara
            this.renderer.render(this.scene, this.camera);
        });
    }

    // Función para añadir un objeto 3D a la física
    addPhysicsObject(mesh, mass) {
        const shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1)); // Suponiendo que es una caja, ajusta el tamaño si es necesario
        const body = new CANNON.Body({
            mass: mass,
            position: new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z)
        });

        body.addShape(shape);
        this.world.addBody(body);
    }
}

// Crear instancia de Main y ejecutar
const app = new Main();
app.start();
