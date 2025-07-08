<script lang="ts">
	import { T } from '@threlte/core';
	import {
		InstancedSprite,
		Instance,
		buildSpritesheet,
		type SpritesheetMetadata
	} from '@threlte/extras';
	import type { Vector2Tuple, Vector3Tuple } from 'three';
	import { Text } from '@threlte/extras';
	import { useCursor } from '@threlte/extras';
	const { hovering, onPointerEnter, onPointerLeave } = useCursor();

	let {
		position = [0, 1.5, 0] as Vector3Tuple,
		scale = [3, 3],
		billboarding = true,
		team_id,
		type_id,
		dir,
		debug_info = false
	}: {
		position: Vector3Tuple;
		scale: Vector2Tuple;
		billboarding: boolean;
		team_id: number;
		type_id: number;
		dir: String;
		debug_info: Boolean;
	} = $props();

	const meta = [
		{
			url: '/textures/sprites/goblin/goblin_warrior.png',
			type: 'rowColumn',
			width: 6,
			height: 1,
			animations: [{ name: 'team_2_type_0_walk', frameRange: [0, 5] }]
		},
		{
			url: '/textures/sprites/goblin/goblin_carry.png',
			type: 'rowColumn',
			width: 6,
			height: 1,
			animations: [{ name: 'team_2_type_2_walk', frameRange: [0, 5] }]
		},
		{
			url: '/textures/sprites/goblin/goblin_base.png',
			type: 'rowColumn',
			width: 6,
			height: 1,
			animations: [
				{ name: 'team_2_type_1_walk', frameRange: [0, 5] },
				{ name: 'team_2_type_3_walk', frameRange: [0, 5] },
				{ name: 'team_2_type_4_walk', frameRange: [0, 5] }
			]
		},
		{
			url: '/textures/sprites/skeleton/skeleton_warrior.png',
			type: 'rowColumn',
			width: 6,
			height: 1,
			animations: [{ name: 'team_1_type_0_walk', frameRange: [0, 5] }]
		},
		{
			url: '/textures/sprites/skeleton/skeleton_carry.png',
			type: 'rowColumn',
			width: 6,
			height: 1,
			animations: [{ name: 'team_1_type_2_walk', frameRange: [0, 5] }]
		},
		{
			url: '/textures/sprites/skeleton/skeleton_base.png',
			type: 'rowColumn',
			width: 6,
			height: 1,
			animations: [
				{ name: 'team_1_type_1_walk', frameRange: [0, 5] },
				{ name: 'team_1_type_3_walk', frameRange: [0, 5] },
				{ name: 'team_1_type_4_walk', frameRange: [0, 5] }
			]
		},
		{
			// catching textures for team 0 or unitType 5
			url: '/textures/sprites/missing_texture.png',
			type: 'rowColumn',
			width: 1,
			height: 1,
			animations: [
				{ name: 'team_0_type_0_walk', frameRange: [0, 0] },
				{ name: 'team_0_type_1_walk', frameRange: [0, 0] },
				{ name: 'team_0_type_2_walk', frameRange: [0, 0] },
				{ name: 'team_0_type_3_walk', frameRange: [0, 0] },
				{ name: 'team_0_type_4_walk', frameRange: [0, 0] },
				{ name: 'team_0_type_5_walk', frameRange: [0, 0] },
				{ name: 'team_1_type_5_walk', frameRange: [0, 0] },
				{ name: 'team_2_type_5_walk', frameRange: [0, 0] }
			]
		}
	] as const satisfies SpritesheetMetadata;

	const sheet = buildSpritesheet.from<typeof meta>(meta);
</script>

{#await sheet.spritesheet then spritesheet}
	<InstancedSprite
		interactive
		{billboarding}
		{spritesheet}
		playmode={'FORWARD'}
		count={1}
		onpointerenter={() => {
			debug_info = true;
		}}
		onpointerleave={() => {
			debug_info = false;
		}}
	>
		{#snippet children({ Instance }: { Instance: any })}
			<Instance
				{position}
				{scale}
				castShadow
				animationName={`team_${team_id}_type_${type_id}_walk`}
			/>
		{/snippet}
	</InstancedSprite>
	{#if debug_info === true}
		<Text
			position={[position[0], 3, position[2]]}
			anchorX={'center'}
			color={'red'}
			scale={2}
			{billboarding}
			text={'hovering test'}
		/>
	{/if}
{/await}
