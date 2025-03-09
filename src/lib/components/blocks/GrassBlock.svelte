<script>
	import { T } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	const texture = useTexture('textures/block/grass/top.png');
	texture.then(() => {
		console.log('texture has loaded');
	});
	$inspect($texture); // eventually a Three.Texture

	let { position, scale } = $props();
</script>

{#await texture then map}
	<T.Mesh {position} {scale}>
		<T.BoxGeometry width={1} height={1} depth={1} />
		<T.MeshBasicMaterial {map} />
	</T.Mesh>
{/await}
