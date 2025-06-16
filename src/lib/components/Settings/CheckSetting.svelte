<script>
	let { values, checked=$bindable(true) } = $props();
</script>

<div class="bloc-seg-l">
	<input class="check-input" name={values.name} id={values.name} type="checkbox" bind:checked={checked} />
	<label class="check-label" for={values.name}>{values.label}</label>
</div>
<div class="bloc-seg-r">
	<button onclick={() => {values.checked = true}} class="default-button">Default</button>
</div>

<style>
		.bloc-seg-l {
        & .check-label {
            cursor: pointer;
        }

        & .check-input {
            cursor: pointer;
        }
		}
</style>