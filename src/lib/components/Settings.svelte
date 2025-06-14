<script lang="ts">
import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';

let hex = "#000000";

let rgb = {
	"r": 0,
	"g": 0,
	"b": 0,
	"a": 0
}

let hsv = {
	"h": 131,
	"s": 33,
	"v": 100,
	"a": 0.75
}

let color = "apchoo"

</script>

<div class="settings-wrap">
	<ColorPicker
		bind:rgb
		bind:hsv
		bind:hex
		bind:color
		components={ColorPicker}
		position="responsive"
		sliderDirection="horizontal"
		isDark={true}
	/>
</div>

<style>
.settings-wrap {
		width: 50vw;
		height: 50vh;
}
</style>