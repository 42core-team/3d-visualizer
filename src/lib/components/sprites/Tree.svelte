<script lang="ts">
	import { InstancedSprite, buildSpritesheet, type SpritesheetMetadata } from '@threlte/extras';
	import type { Vector3Tuple } from 'three';
	import type { Component } from 'svelte';
	// TODO: better import path
	import type { SpriteInstanceProps } from '../../../../node_modules/@threlte/extras/dist/components/InstancedSprite/types.d.ts';

	const treeAtlasMeta = [
		{
			url: '/textures/sprites/trees.png',
			type: 'rowColumn',
			width: 8,
			height: 3,
			animations: [
				{ name: 'green_0', frameRange: [0, 0] },
				{ name: 'green_1', frameRange: [1, 1] },
				{ name: 'green_2', frameRange: [2, 2] },
				{ name: 'green_3', frameRange: [3, 3] },
				{ name: 'green_4', frameRange: [4, 4] },
				{ name: 'green_5', frameRange: [5, 5] },
				{ name: 'green_6', frameRange: [6, 6] },
				{ name: 'green_7', frameRange: [7, 7] },
				{ name: 'green_8', frameRange: [12, 12] },
				{ name: 'green_9', frameRange: [13, 13] },
				{ name: 'green_10', frameRange: [14, 14] },
				{ name: 'green_11', frameRange: [15, 15] },
				{ name: 'red_0', frameRange: [8, 8] },
				{ name: 'red_1', frameRange: [9, 9] },
				{ name: 'red_2', frameRange: [10, 10] },
				{ name: 'red_3', frameRange: [11, 11] },
				{ name: 'red_4', frameRange: [20, 20] },
				{ name: 'red_5', frameRange: [21, 21] },
				{ name: 'red_6', frameRange: [22, 22] },
				{ name: 'red_7', frameRange: [23, 23] },
				{ name: 'dead_0', frameRange: [16, 16] },
				{ name: 'dead_1', frameRange: [17, 17] },
				{ name: 'dead_2', frameRange: [18, 18] },
				{ name: 'dead_3', frameRange: [19, 19] }
			]
		},
		{
			url: '/textures/sprites/ressource.png',
			type: 'rowColumn',
			width: 1,
			height: 1,
			animations: [{ name: 'gold_0', frameRange: [0, 0] }]
		},
		{
			url: '/textures/sprites/pile.png',
			type: 'rowColumn',
			width: 1,
			height: 1,
			animations: [{ name: 'gold_1', frameRange: [0, 0] }]
		}
	] as const satisfies SpritesheetMetadata;

	const treeAtlas = buildSpritesheet.from<typeof treeAtlasMeta>(treeAtlasMeta);

	// New Svelte props syntax
	let {
		position = [0, 1.5, 0] as Vector3Tuple,
		treeType = 'green', // 'green', 'red', or 'dead'
		variant = 0, // Variant number depends on type
		scale = [3, 3] as [number, number],
		billboarding = true
	} = $props();

	// Calculate animation name based on type and variant
	const animationName = `${treeType}_${variant}`;
</script>

{#await treeAtlas.spritesheet then spritesheet}
	<InstancedSprite {billboarding} {spritesheet} playmode="PAUSE" castShadow count={1}>
		{#snippet children({ Instance }: { Instance: Component<SpriteInstanceProps> })}
			<Instance id={0} {position} {scale} {animationName} />
		{/snippet}
	</InstancedSprite>
{/await}
