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
		unit_type
	}: {
		position: Vector3Tuple;
		scale: Vector2Tuple;
		billboarding: boolean;
		team_id: number;
		unit_type: number;
	} = $props();

	const meta = [
		{
			url: '/textures/sprites/goblin/goblin_archer_sheet.png',
			type: 'rowColumn',
			width: 10,
			height: 1,
			animations: [
				{ name: 'idle', frameRange: [0, 3] },
				{ name: 'walk', frameRange: [4, 9] }
			]
		}
	] as const satisfies SpritesheetMetadata;

	const sheet = buildSpritesheet.from<typeof meta>(meta);
</script>

{#await sheet.spritesheet then spritesheet}
	<InstancedSprite {billboarding} {spritesheet} playmode={'FORWARD'} count={1}>
		{#snippet children({ Instance }: { Instance: any })}
			<Instance {position} {scale} castShadow animationName="walk" />
		{/snippet}
	</InstancedSprite>
{/await}
