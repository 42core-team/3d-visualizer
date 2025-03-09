<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { OrbitControls } from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import GrassBlock from './blocks/GrassBlock.svelte';
	import Tree from './sprites/Tree.svelte';
	import { Sky } from '@threlte/extras';
	import Settings from './Settings.svelte';

	interactivity();

	let billboarding = $state(false);
	let fps = $state(30);

	let { replayUrl: string } = $props();

	const scale = new Spring(1);

	let rotation = 0;
	useTask((delta) => {
		rotation += delta;
	});

	// Generate positions for a 25x25 grid
	const gridSize = 25;
	type BlockData = {
		position: [number, number, number];
		isDark: boolean;
	};
	const gridBlocks: BlockData[] = [];

	for (let x = 0; x < gridSize; x++) {
		for (let z = 0; z < gridSize; z++) {
			// Center the grid by offsetting by half the grid size
			const xPos = x - Math.floor(gridSize / 2);
			const zPos = z - Math.floor(gridSize / 2);

			// Calculate checkerboard pattern
			const isDark = (x + z) % 2 === 0;

			gridBlocks.push({
				position: [xPos, 0, zPos],
				isDark
			});
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

<Settings bind:billboarding bind:fps />

<T.DirectionalLight position={[0, 10, 10]} castShadow />

<T.Mesh>
	{#each gridBlocks as block}
		<GrassBlock position={block.position} scale={scale.current} isDark={block.isDark} />
	{/each}
</T.Mesh>

<Tree position={[0, 2, 0]} treeType="green" variant={0} scale={[3, 3]} {billboarding} />
