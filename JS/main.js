// main.js
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

        // Configurar cámara
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 1.6, 3); // Altura inicial de la cámara (1.6m típica para VR)

        // Configurar renderer con soporte para WebXR
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.xr.enabled = true; // Habilitar WebXR
        document.body.appendChild(this.renderer.domElement);

        // Agregar botón de VR
        document.body.appendChild(VRButton.createButton(this.renderer));

        // Inicializar PV y PC
        this.pv = new PV(this.scene);
        this.pc = new PC(this.camera, this.scene);

        // Configurar Gamepad y Raycasting
        this.pc.initializeGamepad();

        // Agregar geometrías iniciales
        this.pv.addGreenCube();
        this.pv.Paredroja();
    }

    start() {
        this.init();

        // Render loop
        const animate = () => {
            this.renderer.setAnimationLoop(() => {
                // Manejar el movimiento del usuario en VR
                this.pc.handleVRMovement();

                // Renderizar la escena
                this.renderer.render(this.scene, this.camera);
            });
        };
        animate();
    }
}

// Crear instancia de Main y ejecutar
const app = new Main();
app.start();
