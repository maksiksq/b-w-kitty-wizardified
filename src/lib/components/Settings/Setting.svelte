<script lang="ts">
	let { values } = $props();

	$inspect(values);
</script>

<div class="bloc-seg-l">
	<label for={values.name} class="img-label">{values.label}
		<input class="img-input pointer" name={values.name} id={values.name} type="file" alt={values.alt}
					 oninput={values.handler} />
	</label>
</div>
<div class="bloc-seg-r">
	<button onclick={values.reset} class="default-button">Default</button>
</div>