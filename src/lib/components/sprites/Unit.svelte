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
		type_id,
		type,
		dir
	}: {
		position: Vector3Tuple;
		scale: Vector2Tuple;
		billboarding: boolean;
		team_id: number;
		type_id: number;
		type: String;
		dir: String;
	} = $props();

	const meta = [
		{
			url: '/textures/sprites/goblin/goblin_carry.png',
			type: 'rowColumn',
			width: 6,
			height: 1,
			animations: [
				{ name: 'carry_walk', frameRange: [0, 5] }
			]
		},
		{
			url: '/textures/sprites/goblin/goblin_archer.png',
			type: 'rowColumn',
			width: 6,
			height: 1,
			animations: [
				{ name: 'arch_walk', frameRange: [0, 5] }
			]
		},
		{
			url: '/textures/sprites/goblin/goblin_warrior.png',
			type: 'rowColumn',
			width: 6,
			height: 1,
			animations: [
				{ name: 'warrior_walk', frameRange: [0, 5] }
			]
		}
	] as const satisfies SpritesheetMetadata;

	const sheet = buildSpritesheet.from<typeof meta>(meta);
</script>

{#await sheet.spritesheet then spritesheet}
	<InstancedSprite {billboarding} {spritesheet} playmode={'FORWARD'} count={1}>
		{#snippet children({ Instance }: { Instance: any })}
			<Instance 
				{position}
				{scale} 
				castShadow 
				animationName={	type_id === 0 ? 'carry_walk' : 
								type_id === 1 ? 'arch_walk' :
												'warrior_walk'}
			/>
		{/snippet}
	</InstancedSprite>
{/await}
