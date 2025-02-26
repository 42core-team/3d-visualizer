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
        Color4,
    } from "@babylonjs/core";

    let canvas: HTMLCanvasElement;
    let engine: Engine;
    let scene: Scene;
    let replay: JSON;
    let currentFrame: number = 0;
    let fps: number = 60;

    async function loadReplay() {
        console.log("Loading replay...");
        try {
            const response = await fetch("/replays/test.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            replay = await response.json();
            console.log(replay);
        } catch (error) {
            console.error("Failed to load replay:", error);
        }
    }

    function loadObjects(objects: any)
    {
        if (!replay) return;
    }

    onMount(() => {
        engine = new Engine(canvas, true);
        scene = new Scene(engine);
        
        loadReplay();

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

        const particleSystem = new ParticleSystem("particles", 10000, scene);
        particleSystem.particleTexture = new Texture("/images/core-logo.png", scene);
        particleSystem.emitter = new Vector3(0, 15, 0); // Position the emitter above the playing field
        particleSystem.minEmitBox = new Vector3(-50, 0, -50); // Emit particles from a box covering the playing field
        particleSystem.maxEmitBox = new Vector3(50, 0, 50);

        particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.colorDead = new Color4(0.7, 0.8, 1.0, 0.0);

        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.2;

        particleSystem.minLifeTime = 1;
        particleSystem.maxLifeTime = 1.5;

        particleSystem.emitRate = 1000;

        particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;

        particleSystem.gravity = new Vector3(0, -9.81, 0);

        particleSystem.direction1 = new Vector3(0, -1, 0);
        particleSystem.direction2 = new Vector3(0, -1, 0);

        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;
        particleSystem.updateSpeed = 0.005;

        particleSystem.start();


        let lastFrameTime = 0;
        const frameDuration = 1000 / fps;
        function renderLoop(timestamp: number) {
            if (timestamp - lastFrameTime >= frameDuration) {
                scene.render();
                lastFrameTime = timestamp;

                loadObjects(replay["ticks"][currentFrame as  string]);
                currentFrame++;
            }
            requestAnimationFrame(renderLoop);
        }

        requestAnimationFrame(renderLoop);

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