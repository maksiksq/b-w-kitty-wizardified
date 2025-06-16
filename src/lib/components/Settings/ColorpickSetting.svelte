<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';

	let { value, defaultColors, isDarkColor = $bindable() } = $props();

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

	const cssRgbaToHex = (str: string) => '#' + str.match(/\d+\.?\d*/g).map((v, i) => ('0' + (i < 3 ? +v : Math.round(v * 255)).toString(16)).slice(-2).toUpperCase()).join('');
	const cssRgbaToRgbaObj = (str: string) => Object.fromEntries(str.match(/\d+\.?\d*/g).map((v, i) => [['r','g','b','a'][i], +v]));
	const rgbaObjToCssRgbaString = ({ r, g, b, a }: Trgba): string => `rgba(${r}, ${g}, ${b}, ${a})`;

	// const cssRgbaToRgbaToObj = (str: string) => ({r, g, b, a} = str.match(/\d+(\.\d+)?/g).reduce((o, v, i) => (['r','g','b','a'].forEach((k,j)=>i==j&&(o[k]=+v)), o), {}));

	let hex = $state(cssRgbaToHex(localStorage.getItem(value) || defaultColors[value]));

	let rgb = $state(cssRgbaToRgbaObj(localStorage.getItem(value) || defaultColors[value]));

	let hsv = $state(cssRgbaToHsv(localStorage.getItem(value) || defaultColors[value]));

	let color = $state('w');

	//

	let root = document.documentElement;

	let changeColor = (key: string, color: string) => {
		root.style.setProperty('--' + key, color);
		localStorage.setItem(key, color);
	};

	//

	const label =
		value === 'bg-color' ? 'Background color' :
			value === 'text-color' ? 'Text color' :
				value === 'accent-color' ? 'Main accent color' :
					value === 'accent-color2' ? 'Secondary accent color' :
						value === 'selection' ? 'Text selection color (why?)' :
							'why';

	//

	$effect((): any => {
		localStorage.setItem('is-dark-color', isDarkColor);
	});
</script>

<div class="bloc-seg-l">
	<ColorPicker
		bind:rgb
		bind:hex
		bind:hsv
		bind:color
		bind:isDark={
	() => isDarkColor,
	(d) => isDarkColor = value==='accent-color' ? d : isDarkColor
	}
		label={label}
		sliderDirection="horizontal"
		position="responsive"
		onInput={() => { changeColor(value, rgbaObjToCssRgbaString(rgb)); }}
	/>
</div>
<div class="bloc-seg-r">
	<button onclick={() => {hsv=cssRgbaToHsv(defaultColors[value])}} class="default-button">Default</button>
</div>

<style>
	.bloc-seg-l {
			/* hacky fix */
			position: absolute;
	}
</style>