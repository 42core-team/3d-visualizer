<script lang="ts">
	import { T } from '@threlte/core';
	import {
		InstancedSprite,
		Instance,
		buildSpritesheet,
		type SpritesheetMetadata
	} from '@threlte/extras';
	import type { Vector2Tuple, Vector3Tuple } from 'three';

	let {
		position = [0, 1.5, 0] as Vector3Tuple,
		scale = [3, 3],
		billboarding = true,
		team_id,
		type_id
	}: {
		position: Vector3Tuple;
		scale: Vector2Tuple;
		billboarding: boolean;
		team_id: number;
		type_id: number;
	} = $props();

	const treeAtlasMeta = [
		{
			url: '/textures/sprites/skeleton/archer/idle_0.png',
			type: 'rowColumn',
			width: 1,
			height: 1,
			animations: []
		}
	] as const satisfies SpritesheetMetadata;

	const treeAtlas = buildSpritesheet.from<typeof treeAtlasMeta>(treeAtlasMeta);
</script>

{#await treeAtlas.spritesheet then spritesheet}
	<InstancedSprite {billboarding} {spritesheet} playmode={'PAUSE'} count={1}>
		{#snippet children({ Instance }: { Instance: any })}
			<Instance {position} {scale} castShadow />
		{/snippet}
	</InstancedSprite>
{/await}
