// Get the canvas
const canvas = document.getElementById("babylonRenderCanvas");
const engine = new BABYLON.Engine(canvas, true);

// Create scene
const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    // Create a camera and set its position
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Create a light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    // Create logo plane
    const logoPlane = BABYLON.MeshBuilder.CreatePlane("logoPlane", { width: 10, height: 5 }, scene);
    const logoMaterial = new BABYLON.StandardMaterial("logoMaterial", scene);
    logoMaterial.diffuseTexture = new BABYLON.Texture("assets/images/core-logo.png", scene);
    logoPlane.material = logoMaterial;

    // Create particle system
    const particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    particleSystem.particleTexture = new BABYLON.Texture("assets/images/core-logo.png", scene);
    particleSystem.emitter = logoPlane;
    particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;

    // Emission rate
    particleSystem.emitRate = 150;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(-1, 1, 1);
    particleSystem.direction2 = new BABYLON.Vector3(1, 1, -1);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.005;

    // Start the particle system
    particleSystem.start();

    // Create stars
    for (let i = 0; i < 100; i++) {
        const star = BABYLON.MeshBuilder.CreateSphere("star", { diameter: 0.1 }, scene);
        star.position = new BABYLON.Vector3(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
        );
        const starMaterial = new BABYLON.StandardMaterial("starMaterial", scene);
        starMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
        star.material = starMaterial;
    }

    return scene;
};

const scene = createScene();
engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});