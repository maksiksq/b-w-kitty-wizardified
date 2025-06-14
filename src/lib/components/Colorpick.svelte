<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import { browser } from '$app/environment';

	type TColors = {
		[key: string]: string
		'bg-color': string,
		'text-color': string,
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
		'text-color': "rgba(230,230,230,255)",
		'accent-color': "rgba(50,200,150,.3)",
		'accent-color2': "rgba(200, 50, 50, 0.3)",
	}

	// converters
	const cssRgbaToHsv = (rgba: string) => {
		const [r, g, b, a = 1] = rgba.match(/\d+(\.\d+)?/g)?.map(Number).map((v, i) => i < 3 ? v / 255 : v);
		const max = Math.max(r, g, b), min = Math.min(r, g, b);
		const d = max - min;
		const h = d === 0 ? 0 :
			max === r ? 60 * (((g - b) / d) % 6) :
				max === g ? 60 * (((b - r) / d) + 2) :
					60 * (((r - g) / d) + 4);
		const s = max === 0 ? 0 : d / max;
		const v = max;
		return {
			h: Math.round((h + 360) % 360),
			s: Math.round(s * 100),
			v: Math.round(v * 100),
			a: a
		};
	};
	const rgbaArrToRgbaString = ({r, g, b, a}: Trgba) => `rgba(${r}, ${g}, ${b}, ${Math.round(a * 255)})`;


	let { value } = $props();

	// the library only actually cares for the hsv value luckily for me

	let hex = $state(
		'#000000'
	);

	let rgb = $state({
		"r": 0,
		"g": 0,
		"b": 0,
		"a": 1
	});

	let hsv = $state(cssRgbaToHsv(localStorage.getItem(value) || defaultColors[value]));

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