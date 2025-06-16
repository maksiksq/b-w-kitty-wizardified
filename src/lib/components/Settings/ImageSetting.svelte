<script lang="ts">
	let { values } = $props();
</script>

<div class="bloc-seg-l">
	<label for={values.name} class="img-label">{@html values.label}
		<input class="img-input pointer" name={values.name} id={values.name} type='file' alt={values.alt}
					 oninput={values.handler} />
	</label>
</div>
<div class="bloc-seg-r">
	<button onclick={values.reset} class="default-button">Default</button>
</div>

<style>
	.bloc-seg-l {
          & .img-label {
              cursor: pointer;
          }

          & .img-input {
              margin-top: 15px;
          }

          & .img-input::-webkit-file-upload-button {
              display: none;
          }

          & .img-input::file-selector-button {
              display: none;
          }
	}
</style>