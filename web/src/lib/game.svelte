<script lang="ts">
    import { onMount } from "svelte";
    import {
        Engine,
        Scene,
        FreeCamera,
        Vector3,
        HemisphericLight,
        MeshBuilder,
        StandardMaterial,
        Texture,
        ParticleSystem,
    } from "@babylonjs/core";

    let canvas: HTMLCanvasElement;
    let engine: Engine;
    let scene: Scene;

    onMount(() => {
        engine = new Engine(canvas, true);
        scene = new Scene(engine);

        const resizeObserver = new ResizeObserver(() => {
            engine.resize();
        });

        resizeObserver.observe(canvas);

        const camera = new FreeCamera(
            "freeCamera",
            new Vector3(0, 5, -10),
            scene,
        );
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);

        // Add a hemispheric light to the scene
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        const playFieldHeight = 1;
        const playingField = MeshBuilder.CreateBox("playingField", { width: 100, height: playFieldHeight, depth: 100 }, scene);
        const playingFieldMaterial = new StandardMaterial("playingFieldMaterial", scene);
        const groundTexture = new Texture("/images/ground.png", scene);
        groundTexture.uScale = 100;
        groundTexture.vScale = 100;
        playingFieldMaterial.diffuseTexture = groundTexture;
        playingFieldMaterial.alpha = 1;
        playingField.material = playingFieldMaterial;
        playingField.position = new Vector3(0, -playFieldHeight / 2, 0);

        const particleSystem = new ParticleSystem("particles", 100, scene);
        particleSystem.particleTexture = new Texture("/images/core-logo.png", scene);
        particleSystem.emitter = new Vector3(0, 3, 0);


        engine.runRenderLoop(() => {
            scene.render();
        });

        return () => {
            resizeObserver.disconnect();
            engine.dispose();
        };
    });
</script>

<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        width: 95vw;
        height: 90vh;
        border: 1px solid black;
    }
</style>