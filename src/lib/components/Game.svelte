<script lang="ts">
	import { onMount } from 'svelte';
	import { T, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { OrbitControls } from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import GrassBlock from './blocks/GrassBlock.svelte';
	import WallBlock from './blocks/WallBlock.svelte';
	import Tree from './sprites/Tree.svelte';
	import { Sky, CSM } from '@threlte/extras';
	import Settings from './Settings.svelte';
	import Unit from './sprites/Unit.svelte';
	import { getStateAt, loadReplay, type TickObject } from '$lib/replayManager';

	interactivity();

	let billboarding = $state(false);
	let fps = $state(30);

	let props = $props();
	let currFrame = $state<TickObject[]>([]);
	let currentTick = $state(0);
	let replayLoaded = $state(false);

	console.log('Replay url:', props.replayUrl);

	function showFrame(frame: number) {
		if (!replayLoaded) {
			console.warn('Replay not loaded yet!');
			return;
		}

		console.log('showFrame', frame);
		const tFrame = getStateAt(frame);

		if (tFrame) {
			console.log('tFrame', tFrame);
			currFrame = tFrame.objects;
		}
	}

	onMount(() => {
		loadReplay(props.replayUrl)
			.then(() => {
				console.info('Replay loaded!');
				replayLoaded = true;
				showFrame(0);
			})
			.catch((err) => {
				console.error(err);
			});
	});

	const scale = new Spring(1);

	// let rotation = 0;
	// useTask((delta) => {
	// 	rotation += delta;
	// });

	// Generate positions for a 25x25 grid
	const gridSize = 25;
	type BlockData = {
		position: [number, number, number];
		isDark: boolean;
	};
	const gridBlocks: BlockData[] = [];

	for (let x = 0; x < gridSize; x++) {
		for (let z = 0; z < gridSize; z++) {
			const isDark = (x + z) % 2 === 0;

			gridBlocks.push({
				position: [x, 0, z],
				isDark
			});
		}
	}
	$effect(() => {
		showFrame(currentTick);
	});
</script>

<Sky elevation={1} />

<T.PerspectiveCamera makeDefault position={[gridSize + 10, 10, gridSize + 10]} fov={60}>
	<OrbitControls
		target={[gridSize / 2, 0, gridSize / 2]}
		autoRotate={false}
		enableZoom={true}
		enableDamping={true}
		autoRotateSpeed={0.3}
		enablePan={false}
		enableRotate={true}
	/>
</T.PerspectiveCamera>

{#if replayLoaded}
	<Settings bind:billboarding bind:fps bind:currentTick />
{/if}

<CSM
	args={{
		mode: 'logarithmic'
	}}
	lightDirection={[-1, -1, -1]}
	lightIntensity={5}
>
	<T.Mesh position={[0, 0, 0]} recieveShadows>
		{#each gridBlocks as block}
			<GrassBlock position={block.position} scale={scale.current} isDark={block.isDark} />
		{/each}
	</T.Mesh>

	{#each currFrame as object}
		{#if object.x != undefined && object.y != undefined}
			{#if object.type === 0}
				<Tree
					position={[object.x, 1, object.y]}
					treeType={object.teamId === 1 ? 'dead' : 'red'}
					variant={1}
					scale={[1, 1]}
					{billboarding}
				/>
			{:else if object.type === 1}
				<Unit
					position={[object.x, 1, object.y]}
					type_id={0}
					team_id={object.teamId ? object.teamId : 0}
					scale={[1, 1]}
					{billboarding}
				/>
			{:else if object.type === 2}
				<Tree
					position={[object.x, 1, object.y]}
					treeType="green"
					variant={0}
					scale={[1, 1]}
					{billboarding}
				/>
			{:else}
				<WallBlock position={[object.x, 0.75, object.y]} scale={scale.current} isDark={true} />
			{/if}
		{/if}
	{/each}
</CSM>
