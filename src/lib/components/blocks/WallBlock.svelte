<script>
	import { T } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import { Color } from 'three';

	const texture = useTexture('textures/block/grass/bottom.png');
	texture.then(() => {
		console.log('texture has loaded');
	});
	$inspect($texture);

	let { position, scale, isDark = false } = $props();

	const regularColor = new Color(0xffffff);
	const darkerColor = new Color(0xbbbbbb);

	const color = isDark ? darkerColor : regularColor;
</script>

{#await texture then map}
	<T.Mesh {position} {scale} receiveShadow>
		<T.BoxGeometry args={[1, 0.5, 1]} />
		<T.MeshStandardMaterial {map} {color} />
	</T.Mesh>
{/await}
