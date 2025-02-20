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

    onMount(() => {
        const engine = new Engine(canvas, true);
        const scene = new Scene(engine);

        const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
        camera.setTarget(Vector3.Zero());
        camera.attachControl(canvas, true);

        new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

        MeshBuilder.CreateBox("box", { size: 2 }, scene);

        engine.runRenderLoop(() => {
            scene.render();
        });

        return () => {
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
