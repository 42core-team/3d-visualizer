<script lang="ts">
	import Game from '$lib/game.svelte';
    import type { PageProps } from './$types';

	let { data }: PageProps = $props();

    export const id: string = data.id;

    // export const replayUrl: string = data.id;
    export const replayUrl: string = "/replays/test.json";
</script>

<h1>Replay id: {id} (WIP)</h1>
<Game {replayUrl}/>
