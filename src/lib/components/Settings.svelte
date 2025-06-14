<script lang="ts">
import ColorPicker from 'svelte-awesome-color-picker';

let { changeColor } = $props();

let hex = $state("#000000");

let rgb = $state({
	"r": 46,
	"g": 46,
	"b": 46,
	"a": 1
});

let hsv = $state({
	"h": 0,
	"s": 0,
	"v": 18,
	"a": 1
});

let color = $state("w");

</script>

<div class="settings-wrap">
	<div class="settings-wrap-inner">
		<ColorPicker
			bind:rgb
			bind:hsv
			bind:hex
			bind:color
			sliderDirection="horizontal"
			position="responsive"
		/>
		<ColorPicker
			bind:rgb
			bind:hsv
			bind:hex
			bind:color
			sliderDirection="horizontal"
			position="responsive"
		/>
	</div>
</div>


<style>
		.settings-wrap {
        position: absolute;
				top: 0;
				left: 0;

				pointer-events: none;

				width: 100vw;
				height: 100vh;

				z-index: 10000;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        & .settings-wrap-inner {
            width: 50vw;
            height: 50vh;

						user-select: none;

            pointer-events: auto;

						/* inner color picker bits */
            --cp-bg-color: rgba(46,46,46,0.3);
            --cp-border-color: var(--accent-color2);
            --cp-text-color: white;
            --cp-input-color: var(--accent-color);
            --cp-button-hover-color: var(--accent-color);
        }
		}

</style>