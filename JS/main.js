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
        this.isVRMode = false; // Nueva variable para detectar si estamos en VR
    }

    init() {
        // Configurar escena
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
    
        // Configurar renderer con soporte VR
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.xr.enabled = true; // Habilitar WebXR para VR
        document.body.appendChild(this.renderer.domElement);
    
        // Agregar botón VR
        document.body.appendChild(VRButton.createButton(this.renderer, () => {
            // Aquí manejamos la activación/desactivación del VR
            this.isVRMode = !this.isVRMode; // Cambiar entre modo VR y normal
        }));
    
        // Configurar cámara y su contenedor
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.cameraContainer = new THREE.Group();
        this.cameraContainer.add(this.camera); // Añadir la cámara al contenedor
        this.scene.add(this.cameraContainer); // Añadir el contenedor a la escena
    
        // Inicializar PV (geometrías) y PC (control de VR)
        this.pv = new PV(this.scene);
        this.pc = new PC(this.cameraContainer, this.scene);     
        // Añadir geometrías
        this.pv.addGreenCube();
        this.pv.Paredroja();
    }

    start() {
        this.init();

        // Render loop
        this.renderer.setAnimationLoop((time, frame) => {
            // Si estamos en VR, manejar la lógica de VR
            if (this.isVRMode) {
                // Aquí puedes manejar cosas específicas del VR, como los controladores.
                // El renderizado y la actualización de la cámara en VR se maneja automáticamente.
            } else {
                // Si no estamos en VR, manejar el movimiento usando gamepad o teclado
                this.pc.handleVRMovement(this.isVRMode);
            }

            // Renderizar la escena con la cámara
            this.renderer.render(this.scene, this.camera);
        });
    }
}

// Crear instancia de Main y ejecutar
const app = new Main();
app.start();
