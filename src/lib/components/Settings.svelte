<script lang="ts">
	import { Button, Checkbox, Pane, Slider, ThemeUtils } from 'svelte-tweakpane-ui';
	import { totalReplayTicks } from '$lib/replayManager';
	let {
		billboarding = $bindable(),
		fps = $bindable(),
		currentTick = $bindable()
	} = $props<{ billboarding: boolean; fps: number; currentTick: number }>();

	let paused = $state(true);

	function incrementContinuous() {
		const interval = setInterval(() => {
			if (paused) return;
			currentTick += 1;
			if (currentTick >= totalReplayTicks) {
				clearInterval(interval);
			}
		}, 1000 / fps);
	}

	incrementContinuous();
</script>

<Pane theme={ThemeUtils.presets.light} position="fixed" title="Replay Settings" y={100}>
	<Checkbox bind:value={billboarding} label="billboarding" />
	<Slider label="Speed" min={1} max={30} step={1} bind:value={fps} />
	<Slider label="Timeline" min={0} max={totalReplayTicks} step={1} bind:value={currentTick} />
	<Button
		on:click={() => {
			paused = !paused;
			console.log('Paused: ' + paused);
		}}
		title={paused ? 'Play' : 'Pause'}
	/>
	<Button
		on:click={() => {
			currentTick = 0;
		}}
		title="Reset"
	/>
	<Button
		on:click={() => {
			if (currentTick - 1 >= 0) currentTick--;
		}}
		title="Previous"
	/>
	<Button
		on:click={() => {
			if (currentTick + 1 < totalReplayTicks) currentTick++;
		}}
		title="Next"
	/>
	<Button
		on:click={() => {
			currentTick = totalReplayTicks - 1;
		}}
		title="End"
	/>
</Pane>

<Pane theme={ThemeUtils.presets.light} position="fixed" title="Teams"></Pane>
