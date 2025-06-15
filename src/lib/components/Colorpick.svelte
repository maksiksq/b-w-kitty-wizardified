<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import { browser } from '$app/environment';

	type Trgba = {
		r: number,
		g: number,
		b: number,
		a: number
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
	const rgbaArrToRgbaString = ({ r, g, b, a }: Trgba) => `rgba(${r}, ${g}, ${b}, ${Math.round(a * 255)})`;


	let { value, defaultColors } = $props();

	// the library only actually cares for the hsv value luckily for me

	let hex = $state(
		'#000000'
	);

	let rgb = $state({
		'r': 0,
		'g': 0,
		'b': 0,
		'a': 1
	});

	let hsv = $state(cssRgbaToHsv(localStorage.getItem(value) || defaultColors[value]));

	let color = $state('w');

	//

	let root = document.documentElement;

	let changeColor = (key: string, color: string) => {
		root.style.setProperty('--' + key, color);
		localStorage.setItem(key, color);
	};

	const label =
		value === 'bg-color' ? 'Background color' :
		value === 'text-color' ? 'Text color' :
		value === 'accent-color' ?	'Main accent color' :
		value === 'accent-color2' ?	'Secondary accent color' :
	'why';
</script>

<ColorPicker
	bind:rgb
	bind:hsv
	bind:hex
	bind:color
	label={label}
	sliderDirection="horizontal"
	position="responsive"
	onInput={changeColor(value, rgbaArrToRgbaString(rgb))}
/>