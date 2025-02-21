<script lang="ts">
    import Game from "$lib/game.svelte";
</script>

<main>
    <Game />
</main>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overflow: hidden;
    }
    main {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>
