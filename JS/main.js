import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Importar OrbitControls
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { PV } from './PV.js';
import { PC } from './PC.js';
import { PM } from './PM.js';

class Main {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null; // Controles de órbita
        this.pv = null;
        this.pc = null; // Instancia de la clase PC para controlar la cámara
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
    
        // Agregar solo el botón VR (sin manejo adicional)
        document.body.appendChild(VRButton.createButton(this.renderer));
    
        // Configurar cámara y su contenedor
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);// Posicionar la cámara inicialmente
    
        // Configurar OrbitControls
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.controls.enableDamping = true; // Activar amortiguación para movimientos suaves
        // this.controls.dampingFactor = 0.05; // Factor de amortiguación
        // this.controls.enableZoom = true; // Permitir zoom con la rueda del ratón
        // this.controls.target.set(0, 0, 0); // Apuntar al centro de la escena

        // Inicializar PC (control de gamepad)
        this.pc = new PC(this.camera, this.scene);
    
        // Inicializar PV (geometrías)
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

        // Render loop
        this.renderer.setAnimationLoop((time, frame) => {
            // Actualizar los controles de órbita
            //this.controls.update();

            // Aquí gestionamos la lógica según si estamos en VR o no
            this.pc.move();
            //this.pc.Comprobar();// Mover el objeto 3D según el gamepad

            // Renderizar la escena con la cámara
            this.renderer.render(this.scene, this.camera);
        });
    }
}

// Crear instancia de Main y ejecutar
const app = new Main();
app.start();
