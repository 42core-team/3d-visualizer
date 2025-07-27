<script lang="ts">
	import { T } from '@threlte/core';
	import { useTexture, InstancedMesh, Instance } from '@threlte/extras';
	import { Color } from 'three';
	import type { Vector2Tuple, Vector3Tuple } from 'three';

	let props = $props();
	let position = $state(props.position ?? ([0, 0, 0] as Vector3Tuple));
	let size = $state(props.size ?? ([25, 25] as Vector2Tuple));

	$effect(() => {
		position = props.position ?? [0, 0, 0];
		size = props.size ?? [25, 25];
	});

	const texture = useTexture('textures/block/grass/top.png');

	const regularColor = new Color(0xffffff);
	const darkerColor = new Color(0xbbbbbb);

	let gridWidth = $derived(size[0]);
	let gridDepth = $derived(size[1]);
</script>

{#await $texture then map}
	<InstancedMesh receiveShadow limit={size[0] * size[1]} range={size[0] * size[1]}>
		<T.BoxGeometry args={[1, 1, 1]} />
		<T.MeshStandardMaterial {map} />

		{#each Array.from({ length: gridWidth }).map((_, i) => i) as x (x)}
			{#each Array.from({ length: gridDepth }).map((_, i) => i) as z (z)}
				{@const isDark = (x + z) % 2 === 0}
				{@const color = isDark ? darkerColor : regularColor}
				<Instance position={[position[0] + x, position[1], position[2] + z]} {color} />
			{/each}
		{/each}
	</InstancedMesh>
{/await}
