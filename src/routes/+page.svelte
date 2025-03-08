<script>
	import { Canvas } from '@threlte/core';
	import { Studio } from '@threlte/studio';

	import Game from '$lib/components/Game.svelte';
</script>

<Canvas>
	{#if import.meta.env.MODE === 'development'}
		{#await import('@threlte/studio') then { Studio }}
			<Studio>
				<Game />
			</Studio>
		{/await}
	{:else}
		<Game />
	{/if}
</Canvas>
