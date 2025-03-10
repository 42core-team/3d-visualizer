<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { OrbitControls } from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import GrassBlock from './blocks/GrassBlock.svelte';
	import Tree from './sprites/Tree.svelte';
	import { Sky } from '@threlte/extras';
	import Settings from './Settings.svelte';
	import Unit from './sprites/Unit.svelte';
	import { getStateAt, loadReplay } from '$lib/replayManager';
	import { get } from 'svelte/store';

	interactivity();

	interface TickObject
	{
		id: number,
		type?: number,
		x?: number,
		y?: number,
		hp?: number,
		teamId?: number,
		balance?: number,
	}

	let billboarding = $state(false);
	let fps = $state(30);

	let props = $props();
	let currFrame = $state<TickObject[]>([]);
	let currentTick = $state(0);
	let replayLoaded = false;

	console.log('Replay url:', props.replayUrl);

	function showFrame(frame: number) {

		if (!replayLoaded) {
			console.warn("Replay not loaded yet!");
			return;
		}

		console.log('showFrame', frame);
		const tFrame = getStateAt(frame);
		
		if (tFrame) {
			console.log('tFrame', tFrame);
			currFrame = tFrame.objects;
		}
	}

	loadReplay(props.replayUrl)
		.then(() => {
			console.info("Replay loaded!");
			replayLoaded = true;
			showFrame(0);
		})
		.catch((err) => {
			console.error(err);
		});

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

<Settings bind:billboarding bind:fps bind:currentTick />

<T.DirectionalLight position={[0, 10, 10]} castShadow />

<T.Mesh position={[0, 0, 0]}>
	{#each gridBlocks as block}
		<GrassBlock position={block.position} scale={scale.current} isDark={block.isDark} />
	{/each}
</T.Mesh>


{#each currFrame as object}
	{#if object.type === 0}
		<Unit position={[object.x ? object.x : -1, 2, object.y ? object.y : -1]} type_id={object.type} team_id={object.teamId ? object.teamId : 0} scale={[3, 3]} {billboarding} />
	{:else}
		<Tree position={[object.x ? object.x : -1, 2, object.y ? object.y : -1]} treeType="green" variant={1} scale={[3, 3]} {billboarding} />
	{/if}
{/each}


