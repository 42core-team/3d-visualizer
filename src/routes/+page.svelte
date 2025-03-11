<script>
	import { Canvas } from '@threlte/core';

	import Game from '$lib/components/Game.svelte';

	const replayUrl = '/replays/test2.json';
</script>

<Canvas>
	{#if import.meta.env.MODE === 'development'}
		{#await import('@threlte/studio') then { Studio }}
			<Studio>
				<Game {replayUrl} />
			</Studio>
		{/await}
	{:else}
		<Game {replayUrl} />
	{/if}
</Canvas>
