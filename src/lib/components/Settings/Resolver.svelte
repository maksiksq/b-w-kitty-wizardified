<script>
	import ImageSetting from '$lib/components/Settings/ImageSetting.svelte';
	import Colorpick from '$lib/components/Settings/ColorpickSetting.svelte';
	import CheckSetting from '$lib/components/Settings/CheckSetting.svelte';
	import TextSetting from '$lib/components/Settings/TextSetting.svelte';

	let {
		values = undefined,
	} = $props();

	$inspect(values);
</script>
{#if (values.type === "color") }
	<Colorpick defaultColors={values.defaultColors} value={values.value} bind:isDarkColor={values.isDarkColor} />
{/if}
{#if (values.type === "image") }
	<ImageSetting {values} />
{/if}
{#if (values.type === "check") }
	<CheckSetting {values} bind:checked={values.checked} />
{/if}
{#if (values.type === "text") }
	<TextSetting {values} bind:setting={values.setting} />
{/if}