<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	let time: Date = new Date();
	let timeDisplay: string = $state('');
	if (browser) {
		timeDisplay = time.toLocaleTimeString('de-De').slice(0, 5);
	}

	onMount(() => {
		// live-ish timer update
		const interval = setInterval(() => {
				time = new Date();
				timeDisplay = time.toLocaleTimeString('de-De').slice(0, 5);
			},
			1000);

		// void
		onDestroy(() => {
			clearInterval(interval);
		});

	});
</script>

<div class="time">
	{#if timeDisplay}
		<h2>{ timeDisplay }</h2>
	{/if}

</div>

<style>
    .time {
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: 40px;
        letter-spacing: 15px;
        margin-top: 1.5vw;

        & h2 {
            padding: 0 20px 0 35px;
            border: 1px solid rgba(200, 50, 50, 0.3);
            border-radius: 5px;

            font-size: 40px;
        }
    }
</style>