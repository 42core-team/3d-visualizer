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
        Color3, Color4,
        Mesh,
    } from "@babylonjs/core";

    export let replayUrl: string;

    let canvas: HTMLCanvasElement;
    let engine: Engine;
    let scene: Scene;

    interface GameObject {
        balance: number;
        hp: number;
        id: number;
        teamId: number;
        type: number;
        x: number;
        y: number;
        mesh: Mesh;
    }

    interface ReplayTick {
        objects: GameObject[];
        actions: any[];
    }

    interface ReplayData {
        full_tick_amount: number;
        ticks: ReplayTick[];
    }

    let replay: ReplayData;
    let fps: number = 30;
    let totalFrames: number = 0;
    let currentFrame: number = 0;
    let gameObjects: GameObject[] = [];
    let paused: boolean = true;

    async function loadReplay() {
        console.log("Loading replay...");
        try {
            const response = await fetch(replayUrl);
            if (!response.ok) {
                console.log("Failed to fetch replay: " + replayUrl);
                throw new Error("Failed to fetch replay: " + replayUrl);
            }
            const data = await response.json();
            replay = data as ReplayData;
            console.log(replay);
            totalFrames = replay.full_tick_amount;
        } catch (error) {
            console.error(error);
        }
    }

    function initialTick() {
        if (!replay) return;

        const tick: ReplayTick = replay.ticks[0];
        if (!tick) return;

        gameObjects.forEach((obj) => {
            obj.mesh.dispose();
        });
        gameObjects = [];

        tick.objects.forEach((obj) => {
            spawnObject(obj);
        });
    }

    function displayFrame(frame: number = 0) {
        console.log("Displaying frame: " + frame);

        if (!replay) return;

        if (frame < 0) frame = 0;
        else if (frame >= totalFrames) frame = totalFrames - 1;

        if (frame === currentFrame) return;

        if (frame < currentFrame) { // rewind
            console.log("Rewinding to frame: " + frame);
            initialTick();
            for (let i = 1; i <= frame; i++) {
                const tick: ReplayTick = replay.ticks[i];
                if (!tick) break;

                tick.objects.forEach((obj) => {
                    const existingObj = gameObjects.find((o) => o.id === obj.id);
                    if (existingObj) {
                        existingObj.mesh.position = new Vector3(obj.x, 1, obj.y);
                    } else {
                        spawnObject(obj);
                    }
                });

                tick.actions.forEach((action) => {
                    if (action.type === "move")
                        moveObject(action.dir, action.id, true);
                });
            }
        } else { // advance
            console.log("Advancing to frame: " + frame);
            for (let i = currentFrame + 1; i <= frame; i++) {
                const tick: ReplayTick = replay.ticks[i];
                if (!tick) break;

                tick.objects.forEach((obj) => {
                    const existingObj = gameObjects.find((o) => o.id === obj.id);
                    if (existingObj) {
                        existingObj.mesh.position = new Vector3(obj.x, 1, obj.y);
                    } else {
                        spawnObject(obj);
                    }
                });

                tick.actions.forEach((action) => {
                    if (action.type === "move")
                        moveObject(action.dir, action.id);
                });
            }
        }

        currentFrame = frame;
        if (currentFrame >= totalFrames) paused = true;
        console.log("Displaying frame: " + currentFrame);
        scene.render();
    }

    function spawnObject(obj: GameObject) {
        const mesh = MeshBuilder.CreateBox("box", { size: 1 }, scene);
        const material = new StandardMaterial("material", scene);
        material.diffuseColor = new Color3(0.7, 0.8, 1.0); // Set the color of the material
        mesh.material = material;
        mesh.position = new Vector3(obj.x, 1, obj.y);
        gameObjects.push({ ...obj, mesh });
    }

    function despawnObject(obj: GameObject) {
        const mesh = gameObjects.find((o) => o.id === obj.id)?.mesh;
        if (!mesh) return;

        mesh.dispose();
        gameObjects = gameObjects.filter((o) => o.id !== obj.id);
    }

    function moveObject(dir: string, id: number, reverse: boolean = false) {
        const mesh = gameObjects.find((o) => o.id === id)?.mesh;
        if (!mesh) return;

        let x = mesh.position.x;
        let y = mesh.position.z;

        switch (dir) {
            case "u":
                y += reverse ? -5 : 5;
                break;
            case "d":
                y += reverse ? 5 : -5;
                break;
            case "l":
                x += reverse ? 5 : -5;
                break;
            case "r":
                x += reverse ? -5 : 5;
                break;
        }

        mesh.position = new Vector3(x, 1, y);
    }

    onMount(() => {
        engine = new Engine(canvas, true);
        scene = new Scene(engine);

        loadReplay().then(() => {
            displayFrame(0);
        });

        const resizeObserver = new ResizeObserver(() => {
            engine.resize();
        });

        resizeObserver.observe(canvas);

        const camera = new FreeCamera(
            "freeCamera",
            new Vector3(50, 10, 40),
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
        playingField.position = new Vector3(50, -playFieldHeight / 2, 50);

        const particleSystem = new ParticleSystem("particles", 10000, scene);
        particleSystem.particleTexture = new Texture("/images/core-logo.png", scene);
        particleSystem.emitter = new Vector3(0, 15, 0); // Position the emitter above the playing field
        particleSystem.minEmitBox = new Vector3(0, 0, 0); // Emit particles from a box covering the playing field
        particleSystem.maxEmitBox = new Vector3(1000, 0, 100);

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
        
        engine.runRenderLoop(() => {
            scene.render();

            if (!paused) {
                let frameDuration = 1000 / fps;
                const now = Date.now();
                if (now - lastFrameTime >= frameDuration) {
                    lastFrameTime = now;
                    displayFrame(currentFrame + 1);
                }
            }
        });

        return () => {
            resizeObserver.disconnect();
            engine.dispose();
        };
    });
</script>

<canvas bind:this={canvas}></canvas>
<p>Current frame is: {currentFrame}</p>
<div class="speed-controls">
    <p>Speed: {fps}</p>
    <input type="range" min="1" max="500" bind:value={fps}/>
</div>
<div class="time-controls">
    <button on:click={() => { if (!paused) paused = true; displayFrame(0); }}>⏮️</button>
    <button on:click={() => { if (!paused) paused = true; displayFrame(currentFrame - 1 < 0 ? 0 : currentFrame - 1); }}>⏪</button>
    <button on:click={() => { paused = !paused } }>{ paused ? "▶️" : "⏸️" }</button>
    <button on:click={() => { if (!paused) paused = true; displayFrame(currentFrame + 1 >= totalFrames ? totalFrames : currentFrame + 1); }}>⏩</button>
    <button on:click={() => { if (!paused) paused = true; displayFrame(totalFrames); }}>⏭️</button>
</div>
<input type="range" min="0" max={totalFrames} bind:value={currentFrame} on:input={() => { paused = true; displayFrame(currentFrame); }} />

<style>
    canvas {
        width: 95vw;
        height: 95vh;
        border: 1px solid black;
    }
    input {
        width: 95vw;
    }
    p {
        width: 95vw;
        text-align: center;
    }

    .time-controls {
        display: flex;
        justify-content: center;
    }

    .time-controls button{
        size: 3em;
    }

    .speed-controls {
        display: flex;
        justify-content: left;
    }
</style>