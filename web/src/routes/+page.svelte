<script lang="ts">
    import Game from "$lib/game.svelte";

    export let replayUrl: string;

    replayUrl = "/replays/test.json";
</script>

<Game {replayUrl}/>