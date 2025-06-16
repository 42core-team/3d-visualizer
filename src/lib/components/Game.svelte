<script lang="ts">
	import { onMount } from 'svelte';
	import { T } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { OrbitControls } from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import WallBlock from './blocks/WallBlock.svelte';
	import Tree from './sprites/Tree.svelte';
	import { Sky, CSM } from '@threlte/extras';
	import Settings from './Settings.svelte';
	import Unit from './sprites/Unit.svelte';
	import {
		getStateAt,
		loadReplay,
		getGameConfig,
		type TickObject,
		type GameConfig
	} from '$lib/replayManager';
	import Grid from './environment/Grid.svelte';
	import type { Vector2Tuple } from 'three';

	interactivity();

	let props = $props();

	let fps = $state(30);
	let billboarding = $state(false);
	let currFrame = $state<TickObject[]>([]);
	let currentTick = $state(0);
	let replayLoaded = $state(false);
	let gameConfig = $state<GameConfig | undefined>(undefined);
	let gridSize: Vector2Tuple = $derived.by(() => {
		if (gameConfig) {
			return [gameConfig.width, gameConfig.height];
		}
		return [0, 0];
	});

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
				gameConfig = getGameConfig();
				showFrame(0);
			})
			.catch((err) => {
				console.error(err);
			});
	});

	const scale = new Spring(1);

	$effect(() => {
		showFrame(currentTick);
	});
</script>

<Sky elevation={1} />

<T.PerspectiveCamera makeDefault position={[gridSize[0] + 10, 10, gridSize[1] + 10]} fov={60}>
	<OrbitControls
		target={[gridSize[0] / 2, 0, gridSize[1] / 2]}
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

	<CSM
		args={{
			mode: 'logarithmic'
		}}
		lightDirection={[-1, -1, -1]}
		lightIntensity={5}
	>
		<!-- Use the new Grid component for the grass blocks -->
		<Grid position={[0, 0, 0]} size={gridSize} />

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
						unit_type={0}
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
{/if}
