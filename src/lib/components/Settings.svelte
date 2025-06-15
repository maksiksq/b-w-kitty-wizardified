<script lang="ts">
import ColorPicker from 'svelte-awesome-color-picker';
import Colorpick from '$lib/components/Colorpick.svelte';

const { defaultColors } = $props();
</script>

<div class="settings-wrap">
	<div class="settings-wrap-inner">
		<Colorpick {defaultColors} value="bg-color"/>
		<Colorpick {defaultColors} value="text-color"/>
		<Colorpick {defaultColors} value="accent-color"/>
		<Colorpick {defaultColors} value="accent-color2"/>
	</div>
</div>


<style>
		.settings-wrap {
        position: absolute;
				top: 0;
				left: 0;

				pointer-events: none;

				width: 100vw;
				height: 100vh;

				z-index: 10000;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        & .settings-wrap-inner {
            width: 50vw;
            height: 50vh;

						user-select: none;

            pointer-events: auto;

						/* inner color picker bits */
            --cp-bg-color: var(--bg-color);
            --cp-border-color: var(--accent-color2);
            --cp-text-color: white;
            --cp-input-color: var(--accent-color);
            --cp-button-hover-color: var(--accent-color);
        }
		}

</style>