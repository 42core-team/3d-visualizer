<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { OrbitControls } from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import GrassBlock from './blocks/GrassBlock.svelte';
	import { Sky } from '@threlte/extras';

	interactivity();

	const scale = new Spring(1);

	let rotation = 0;
	useTask((delta) => {
		rotation += delta;
	});

	// Generate positions for a 25x25 grid
	const gridSize = 25;
	const gridPositions: [number, number, number][] = [];

	for (let x = 0; x < gridSize; x++) {
		for (let z = 0; z < gridSize; z++) {
			// Center the grid by offsetting by half the grid size
			gridPositions.push([x - Math.floor(gridSize / 2), 0, z - Math.floor(gridSize / 2)]);
		}
	}
</script>

<Sky elevation={0.5} />

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
>
	<OrbitControls
		autoRotate
		enableZoom={false}
		enableDamping
		autoRotateSpeed={0.1}
		enablePan={false}
	/>
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} castShadow />

<T.Mesh>
	{#each gridPositions as position}
		<GrassBlock {position} scale={scale.current} />
	{/each}
</T.Mesh>
