<script lang="ts">
    import { onMount } from "svelte";
    import {
        Engine,
        Scene,
        FreeCamera,
        Vector3,
        HemisphericLight,
        MeshBuilder,
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

        const hemisphericLight: HemisphericLight = new HemisphericLight(
            "hemisphericLight",
            new Vector3(0, 1, 0),
            scene,
        );
        hemisphericLight.intensity = 0.5;

        MeshBuilder.CreateBox("box", { size: 2 }, scene);

        return () => {
            resizeObserver.disconnect();
            engine.dispose();
        };
    });
</script>

<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        width: 100%;
        height: 100%;
    }
</style>
