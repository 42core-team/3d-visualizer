// Get the canvas
const canvas = document.getElementById("babylonRenderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    // Create a camera and set its position
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Add a global hemispheric light
    const light = new BABYLON.HemisphericLight("globalLight", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1; // Adjust the intensity as needed

    const playFieldHeight = 1;
    const playingField = BABYLON.MeshBuilder.CreateBox("playingField", { width: 100, height: playFieldHeight, depth: 100 }, scene);
    const playingFieldMaterial = new BABYLON.StandardMaterial("playingFieldMaterial", scene);
    playingFieldMaterial.diffuseTexture = new BABYLON.Texture("assets/images/ground.png", scene);
    playingFieldMaterial.diffuseTexture.uScale = 100;
    playingFieldMaterial.diffuseTexture.vScale = 100;
    playingFieldMaterial.alpha = 1;
    playingField.material = playingFieldMaterial;
    playingField.position = new BABYLON.Vector3(0, -playFieldHeight / 2, 0);

    BABYLON.SceneLoader.ImportMesh("", "assets/models/Castle/", "castle.obj", scene, function (meshes) {
        // Do something with the imported meshes
        meshes.forEach(mesh => {
            mesh.position = new BABYLON.Vector3(0, 2, 0);
        });
    });

    // Create particle system
    const particleSystem = new BABYLON.ParticleSystem("particles", 100, scene);
    particleSystem.particleTexture = new BABYLON.Texture("assets/images/core-logo.png", scene);
    particleSystem.emitter = new BABYLON.Vector3(0, 3, 0);

    // Add bloom effect
    const defaultPipeline = new BABYLON.DefaultRenderingPipeline(
        "defaultPipeline", // The name of the pipeline
        true, // Do you want the pipeline to use HDR texture?
        scene, // The scene instance
        [camera] // The list of cameras to be attached to
    );

    defaultPipeline.bloomEnabled = true; // Enable bloom
    defaultPipeline.bloomThreshold = 0.8; // Adjust bloom threshold
    defaultPipeline.bloomWeight = 0.3; // Adjust bloom weight
    defaultPipeline.bloomKernel = 64; // Adjust bloom kernel
    defaultPipeline.bloomScale = 0.5; // Adjust bloom scale

    // Add other effects as needed
    defaultPipeline.fxaaEnabled = true; // Enable FXAA
    defaultPipeline.imageProcessingEnabled = true; // Enable image processing
    defaultPipeline.imageProcessing.contrast = 1.6; // Adjust contrast
    defaultPipeline.imageProcessing.exposure = 1.2; // Adjust exposure

    return scene;
};

const scene = createScene();
engine.runRenderLoop(() => {
    scene.render();
});