// main.js
import * as THREE from 'three';
import { PV } from './PV.js';
import { PC } from './PC.js';
import { PM } from './PM.js';

class Main {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.pv = new PV();
        this.pc = new PC();
        this.pm = new PM();
    }

    init() {
        // Configurar escena, cámara y renderer
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Iniciar el listener para el gamepad
        this.pc.initializeGamepad();
    }

    start() {
        this.init();

        // Crear un cubo verde y añadirlo a la escena
        const greenCube = this.pv.createGreenCube();
        this.scene.add(greenCube);

        // Render loop
        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
}

// Crear una instancia de Main y ejecutar el método start
const app = new Main();
app.start();
