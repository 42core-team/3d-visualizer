<script lang="ts">
	import { Button, Checkbox, Pane, Slider, ThemeUtils } from 'svelte-tweakpane-ui';
	export let billboarding: boolean;
	export let fps: number;
	export let currentTick: number = 0;

	const incrementContinuous = async () => {
		while (true && currentTick < 1000) {
			await new Promise((resolve) => setTimeout(resolve, 1000 / fps));
			currentTick++;
		}
	};
</script>

<Pane theme={ThemeUtils.presets.light} position="fixed" title="InstancedSprite">
	<Checkbox bind:value={billboarding} label="billboarding" />
	<Slider label="fps" min={1} max={30} step={1} bind:value={fps} />
	<Button on:click={() => incrementContinuous()} label="Count" title="Play" />
	<pre>Count: {currentTick}</pre>
</Pane>
