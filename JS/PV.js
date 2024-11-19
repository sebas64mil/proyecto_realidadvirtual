// Importar los módulos necesarios
import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export class PV {
    constructor(scene) {
        this.scene = scene; // Recibe la escena como argumento
        this.addAmbientLight(); // Llama al método para añadir luz ambiental
    }

    addAmbientLight() {
        // Crear una luz ambiental
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Luz blanca con intensidad 0.5
        this.scene.add(ambientLight); // Añadir la luz a la escena
        console.log('Luz ambiental añadida a la escena.');
    }

    FBXcuarto1() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();

        // Cargar la textura
        const texturePath = 'Textures/Cuarto1_Cuarto1_Material_BaseColor.png';
        const texture = textureLoader.load(texturePath);

        // Cargar el modelo FBX
        loader.load(
            'modelos3d/CuartoNormal.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    child.name = 'FBXcuarto1';
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });

                // Escalar y posicionar el modelo
                fbx.scale.set(-0.1, 0.1, 0.1);
                fbx.position.set(0, 6, 0);
                fbx.name = "Cuarto";

                // Añadir el modelo a la escena
                this.scene.add(fbx);

                
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }

    FBXpasillo1() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();

        // Cargar la textura
        const texturePath = 'Textures/Pasillo1_blinn2SG_BaseColor.png';
        const texture = textureLoader.load(texturePath);

        // Cargar el modelo FBX
        loader.load(
            'modelos3d/Pasillo.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    child.name = 'FBXpasillo1';
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });

                // Escalar y posicionar el modelo
                fbx.scale.set(-0.1, 0.1, 0.1);
                fbx.position.set(0, 6, 0);
                fbx.name = "Pasillo";

                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    FBXcuarto2() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();

        // Cargar la textura
        const texturePath = 'Textures/Cuarto1_Cuarto1_Material_BaseColor.png';
        const texture = textureLoader.load(texturePath);

        // Cargar el modelo FBX
        loader.load(
            'modelos3d/CuartoNormal.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    child.name = 'FBXcuarto2';
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });

                // Escalar y posicionar el modelo
                fbx.scale.set(-0.1, 0.1, 0.1);
                fbx.position.set(0, 6, 2.4);
                fbx.name = "Cuarto";

                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    FBXpasillo2() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();

        // Cargar la textura
        const texturePath = 'Textures/Pasillo1_blinn2SG_BaseColor.png';
        const texture = textureLoader.load(texturePath);

        // Cargar el modelo FBX
        loader.load(
            'modelos3d/Pasillo.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    if (child.isMesh) {
                        child.name = 'FBXpasillo2';
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });

                // Escalar y posicionar el modelo
                fbx.scale.set(-0.1, 0.1, 0.1);
                fbx.position.set(0, 6, 2.4);
                fbx.name = "Pasillo";


                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    FBXcuarto3() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();

        // Cargar la textura
        const texturePath = 'Textures/Cuarto1_Cuarto1_Material_BaseColor.png';
        const texture = textureLoader.load(texturePath);

        // Cargar el modelo FBX
        loader.load(
            'modelos3d/CuartoNormal.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    child.name = 'FBXcuarto3';
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });

                // Escalar y posicionar el modelo
                fbx.scale.set(-0.1, 0.1, 0.1);
                fbx.position.set(0, 6, 4.8);
                fbx.name = "Cuarto";


                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    FBXpasillo3() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();

        // Cargar la textura
        const texturePath = 'Textures/Pasillo1_blinn2SG_BaseColor.png';
        const texture = textureLoader.load(texturePath);

        // Cargar el modelo FBX
        loader.load(
            'modelos3d/Pasillo.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    child.name = 'FBXpasillo3';
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });

                // Escalar y posicionar el modelo
                fbx.scale.set(-0.1, 0.1, 0.1);
                fbx.position.set(0, 6, 4.8);
                fbx.name = "Pasillo";


                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    FBXcuarto4() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();

        // Cargar la textura
        const texturePath = 'Textures/Cuarto1_Cuarto1_Material_BaseColor.png';
        const texture = textureLoader.load(texturePath);

        // Cargar el modelo FBX
        loader.load(
            'modelos3d/CuartoNormal.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    child.name = 'FBXcuarto4';
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });

                // Escalar y posicionar el modelo
                fbx.scale.set(-0.1, 0.1, 0.1);
                fbx.position.set(0, 6, 7.2);
                fbx.name = "Cuarto";


                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    FBXpasillo4() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();

        // Cargar la textura
        const texturePath = 'Textures/Pasillo1_blinn2SG_BaseColor.png';
        const texture = textureLoader.load(texturePath);

        // Cargar el modelo FBX
        loader.load(
            'modelos3d/Pasillo.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    child.name = 'FBXpasillo4';
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });

                // Escalar y posicionar el modelo
                fbx.scale.set(-0.1, 0.1, 0.1);
                fbx.position.set(0, 6, 7.2);
                fbx.name = "Pasillo";


                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
  
    FBXcuarto5() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();

        // Cargar la textura
        const texturePath = 'Textures/Cuartogrande_Cuarto1_Material_BaseColor.png';
        const texture = textureLoader.load(texturePath);

        // Cargar el modelo FBX
        loader.load(
            'modelos3d/CuartoGrande.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    child.name = 'FBXAcuarto5';
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });

                // Escalar y posicionar el modelo
                fbx.scale.set(-0.1, 0.1, 0.1);
                fbx.position.set(0, 6, 7.6);
                


                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    FBXbutton() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();
    
        // Cargar la textura
        const texturePath = 'Textures/portal_button_blue.jpeg';
        const texture = textureLoader.load(texturePath);
    
        // Cargar el modelo FBX
        loader.load(
            'modelos3d/portal 2 button.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Asignar nombre al modelo para identificación
    
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    if (child.isMesh) {
                        child.name = "FBXbotonInicio"; 
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });
    
                // Escalar y posicionar el modelo
                fbx.scale.set(0.003, 0.003, 0.003);
                fbx.position.set(0, 6, 0);
    
                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log("portalButton cargado correctamente");
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    
    FBXbuttonSalaE2() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();
    
        // Cargar la textura
        const texturePath = 'Textures/portal_button_blue.jpeg';
        const texture = textureLoader.load(texturePath);
    
        // Cargar el modelo FBX
        loader.load(
            'modelos3d/portal 2 button.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Asignar nombre al modelo para identificación
    
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    if (child.isMesh) {
                        child.name = "FBXbotonEstrovertido"; 
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });
    
                // Escalar y posicionar el modelo
                fbx.scale.set(0.003, 0.003, 0.003);
                fbx.position.set(0.4, 6, 2);
    
                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log("portalButton cargado correctamente");
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    
    FBXbuttonSalaI2() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();
    
        // Cargar la textura
        const texturePath = 'Textures/portal_button_blue.jpeg';
        const texture = textureLoader.load(texturePath);
    
        // Cargar el modelo FBX
        loader.load(
            'modelos3d/portal 2 button.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Asignar nombre al modelo para identificación
    
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    if (child.isMesh) {
                        child.name = "FBXbotonIntrovertido"; 
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });
    
                // Escalar y posicionar el modelo
                fbx.scale.set(0.003, 0.003, 0.003);
                fbx.position.set(0.4, 6, 2.8);
    
                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log("portalButton cargado correctamente");
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    FBXbuttonSalaSen3() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();
    
        // Cargar la textura
        const texturePath = 'Textures/portal_button_blue.jpeg';
        const texture = textureLoader.load(texturePath);
    
        // Cargar el modelo FBX
        loader.load(
            'modelos3d/portal 2 button.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Asignar nombre al modelo para identificación
    
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    if (child.isMesh) {
                        child.name = "FBXbotonSensitivo"; 
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });
    
                // Escalar y posicionar el modelo
                fbx.scale.set(0.003, 0.003, 0.003);
                fbx.position.set(-0.4, 6, 4.4);
    
                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log("portalButton cargado correctamente");
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    FBXbuttonSalaIn3() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();
    
        // Cargar la textura
        const texturePath = 'Textures/portal_button_blue.jpeg';
        const texture = textureLoader.load(texturePath);
    
        // Cargar el modelo FBX
        loader.load(
            'modelos3d/portal 2 button.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Asignar nombre al modelo para identificación
    
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    if (child.isMesh) {
                        child.name = "FBXbotonIntucicion"; 
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });
    
                // Escalar y posicionar el modelo
                fbx.scale.set(0.003, 0.003, 0.003);
                fbx.position.set(-0.4, 6, 5.2);
    
                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log("portalButton cargado correctamente");
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }

    FBXbuttonSalaS4() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();
    
        // Cargar la textura
        const texturePath = 'Textures/portal_button_blue.jpeg';
        const texture = textureLoader.load(texturePath);
    
        // Cargar el modelo FBX
        loader.load(
            'modelos3d/portal 2 button.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Asignar nombre al modelo para identificación
    
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    if (child.isMesh) {
                        child.name = "FBXbotonSentido"; 
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });
    
                // Escalar y posicionar el modelo
                fbx.scale.set(0.003, 0.003, 0.003);
                fbx.position.set(0.4, 6, 6.8);
    
                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log("portalButton cargado correctamente");
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    FBXbuttonSalaL4() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();
    
        // Cargar la textura
        const texturePath = 'Textures/portal_button_blue.jpeg';
        const texture = textureLoader.load(texturePath);
    
        // Cargar el modelo FBX
        loader.load(
            'modelos3d/portal 2 button.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Asignar nombre al modelo para identificación
    
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    if (child.isMesh) {
                        child.name = "FBXbotonLogica"; 
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });
    
                // Escalar y posicionar el modelo
                fbx.scale.set(0.003, 0.003, 0.003);
                fbx.position.set(0.4, 6, 7.6);
    
                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log("portalButton cargado correctamente");
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }

    FBXbuttonsala5orden1() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();
    
        // Cargar la textura
        const texturePath = 'Textures/portal_button_blue.jpeg';
        const texture = textureLoader.load(texturePath);
    
        // Cargar el modelo FBX
        loader.load(
            'modelos3d/portal 2 button.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Asignar nombre al modelo para identificación
    
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    if (child.isMesh) {
                        child.name = "FBXAbotonOrden1"; 
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });
    
                // Escalar y posicionar el modelo
                fbx.scale.set(0.003, 0.003, 0.003);
                fbx.position.set(0.4, 6, 10.8);
    
                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log("portalButton cargado correctamente");
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    FBXbuttonsala5orden2() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();
    
        // Cargar la textura
        const texturePath = 'Textures/portal_button_blue.jpeg';
        const texture = textureLoader.load(texturePath);
    
        // Cargar el modelo FBX
        loader.load(
            'modelos3d/portal 2 button.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Asignar nombre al modelo para identificación
    
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    if (child.isMesh) {
                        child.name = "FBXAbotonOrden2"; 
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });
    
                // Escalar y posicionar el modelo
                fbx.scale.set(0.003, 0.003, 0.003);
                fbx.position.set(-0.4, 6, 10.8);
    
                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log("portalButton cargado correctamente");
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    FBXbuttonsala5orden3() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();
    
        // Cargar la textura
        const texturePath = 'Textures/portal_button_blue.jpeg';
        const texture = textureLoader.load(texturePath);
    
        // Cargar el modelo FBX
        loader.load(
            'modelos3d/portal 2 button.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Asignar nombre al modelo para identificación
    
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    if (child.isMesh) {
                        child.name = "FBXAbotonOrden3"; 
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });
    
                // Escalar y posicionar el modelo
                fbx.scale.set(0.003, 0.003, 0.003);
                fbx.position.set(0.4, 6, 10.4);
    
                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log("portalButton cargado correctamente");
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    FBXbuttonsala5orden4() {
        const loader = new FBXLoader();
        const textureLoader = new THREE.TextureLoader();
    
        // Cargar la textura
        const texturePath = 'Textures/portal_button_blue.jpeg';
        const texture = textureLoader.load(texturePath);
    
        // Cargar el modelo FBX
        loader.load(
            'modelos3d/portal 2 button.fbx', // Ruta al archivo FBX
            (fbx) => {
                // Asignar nombre al modelo para identificación
    
                // Aplicar la textura a los materiales del modelo
                fbx.traverse((child) => {
                    if (child.isMesh) {
                        child.name = "FBXAbotonOrden4"; 
                        child.material = new THREE.MeshStandardMaterial({
                            map: texture,
                            side: THREE.DoubleSide
                        });
                    }
                });
    
                // Escalar y posicionar el modelo
                fbx.scale.set(0.003, 0.003, 0.003);
                fbx.position.set(-0.4, 6, 10.4);
    
                // Añadir el modelo a la escena
                this.scene.add(fbx);
            },
            (xhr) => {
                console.log("portalButton cargado correctamente");
            },
            (error) => {
                console.error('Error al cargar el modelo FBX:', error);
            }
        );
    }
    
}
