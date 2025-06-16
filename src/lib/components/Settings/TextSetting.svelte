<script>
import { showLightbox } from '$lib/utils/shared.svelte.js';

let { values=$bindable(undefined) } = $props();

</script>

<div class="bloc-seg-l">
	<label for={values.name}>Upper text: &nbsp</label>
	<input name={values.name} id={values.name} type="text" bind:value={values.setting}
				 onkeydown={(e) => {e.key === 'Enter' ? showLightbox.val=false : ''}} />
</div>
<div class="bloc-seg-r">
	<button onclick={() => {values.setting = "お帰りなさい"}} class="default-button">Default</button>
</div>