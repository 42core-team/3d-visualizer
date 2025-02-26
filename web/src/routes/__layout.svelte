<script>
    export let segment;
</script>

<main>
    <header>
        <h1>CORE: 3D Visualizer</h1>
    </header>
    <slot></slot>
    <footer>
        <p>© 2025 CORE Game</p>
    </footer>
</main>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    main {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    header, footer {
        width: 100%;
        text-align: center;
        background-color: #f8f8f8;
        padding: 1rem;
    }
    slot {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>