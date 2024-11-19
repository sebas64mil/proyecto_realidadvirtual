import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { PV } from './PV.js';
import { PC } from './PC.js';
import { PM } from './PM.js';

class Main {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.pv = null;
        this.pc = null;
        this.pm = new PM();
    }

    init() {
        // Configurar escena
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        // Configurar renderer con soporte VR
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.xr.enabled = true; // Habilitar VR
        document.body.appendChild(this.renderer.domElement);

        // Agregar botón VR
        document.body.appendChild(VRButton.createButton(this.renderer));

        // Configurar cámara para uso inicial (se ajustará dinámicamente en VR)
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        // Inicializar PV (geometrías) y PC (control de VR)
        this.pv = new PV(this.scene);
        this.pc = new PC(this.renderer.xr.getCamera(this.camera)
        , this.scene);

        // Añadir geometrías
        this.pv.addGreenCube();
        this.pv.Paredroja();
    }

    start() {
        this.init();

        // Render loop
        this.renderer.setAnimationLoop(() => {
            // Manejo del control de VR
            this.pc.handleVRMovement();

            // Renderizar escena
            this.renderer.render(this.scene, this.camera);
        });
    }
}

// Crear instancia de Main y ejecutar
const app = new Main();
app.start();

