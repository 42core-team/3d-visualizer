<script lang="ts">
	import { InstancedSprite, buildSpritesheet, type SpritesheetMetadata } from '@threlte/extras';
	import type { Component } from 'svelte';
	import type { Vector2Tuple, Vector3Tuple } from 'three';
	// TODO: better import path
	import type { SpriteInstanceProps } from '../../../../node_modules/@threlte/extras/dist/components/InstancedSprite/types.d.ts';

	let {
		position = [0, 1.5, 0] as Vector3Tuple,
		scale = [3, 3],
		billboarding = true,
		team_id
	}: {
		position: Vector3Tuple;
		scale: Vector2Tuple;
		billboarding: boolean;
		team_id: number;
	} = $props();

	const meta = [
		{
			url: '/textures/sprites/core/MainCharacter.png',
			type: 'rowColumn',
			width: 4,
			height: 1,
			animations: [{ name: 'core_idle_blue', frameRange: [0, 3] }]
		},
		{
			url: '/textures/sprites/core/MainCharacter2.png',
			type: 'rowColumn',
			width: 4,
			height: 1,
			animations: [{ name: 'core_idle_red', frameRange: [0, 3] }]
		}
	] as const satisfies SpritesheetMetadata;

	const sheet = buildSpritesheet.from<typeof meta>(meta);
</script>

{#await sheet.spritesheet then spritesheet}
	<InstancedSprite castShadow {billboarding} {spritesheet} playmode="FORWARD" count={1}>
		{#snippet children({ Instance }: { Instance: Component<SpriteInstanceProps> })}
			<Instance
				id={0}
				{position}
				{scale}
				animationName={team_id === 1 ? 'core_idle_blue' : 'core_idle_red'}
			/>
		{/snippet}
	</InstancedSprite>
{/await}
