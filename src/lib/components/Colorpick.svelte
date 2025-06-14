<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import { browser } from '$app/environment';

	type TColors = {
		[key: string]: string
		'bg-color': string,
		'default-color': string,
		'accent-color': string,
		'accent-color2': string,
	}

	type Trgba = {
		r: number,
		g: number,
		b: number,
		a: number
	}

	const defaultColors: TColors = {
		'bg-color': "rgba(46,46,46,255)",
		'default-color': "rgba(230,230,230,255)",
		'accent-color': "rgba(50,200,150,.3)",
		'accent-color2': "rgba(200, 50, 50, 0.3)",
	}

	// converters
	const rgbaToHex = (rgba: string) => '#' + rgba.match(/\d+(\.\d+)?/g)?.map((x, i) => i < 3 ? (+x).toString(16).padStart(2, '0') : Math.round(+x * 255).toString(16).padStart(2, '0')).join('');
	const rgbaArrToRgbaString = ({r, g, b, a}: Trgba) => `rgba(${r}, ${g}, ${b}, ${Math.round(a * 255)})`;


	let { value } = $props();

	let hex = $state(
		localStorage.getItem(value) || rgbaToHex(defaultColors[value])
	);

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

	//

	let changeColor = $state((key: string, color: string) => {
		// initializer for ssr
	});

	if (browser) {
		// saving and updating css variables
		let root = document.documentElement;
		Object.keys(defaultColors).forEach(key => {
			let c = localStorage.getItem(key)
			if (c) {
				root.style.setProperty("--" + key, c)
			}
		});

		changeColor = (key: string, color: string) => {
			root.style.setProperty("--" + key, color)
			localStorage.setItem(key, color)

			console.log(color)
		}
	}
</script>

<ColorPicker
	bind:rgb
	bind:hsv
	bind:hex
	bind:color
	sliderDirection="horizontal"
	position="responsive"

	onInput={changeColor(value, rgbaArrToRgbaString(rgb))}
/>