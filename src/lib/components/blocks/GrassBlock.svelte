<script>
	import { T } from '@threlte/core';
	import { useTexture } from '@threlte/extras';
	import { Color } from 'three';

	const texture = useTexture('textures/block/grass/top.png');
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
		<T.BoxGeometry width={1} height={1} depth={1} />
		<T.MeshBasicMaterial {map} {color} />
	</T.Mesh>
{/await}
