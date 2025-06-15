<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import Colorpick from '$lib/components/Colorpick.svelte';

	const { defaultColors } = $props();
</script>

<div class="settings-wrap">
	<div class="settings-wrap-inner">
		{#each Object.keys(defaultColors) as value}
			<Colorpick {defaultColors} {value} />
		{/each}
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
            --cp-bg-color: rgba(46,46,46,1);
            --cp-border-color: var(--accent-color2);
            --cp-text-color: white;
            --cp-input-color: rgba(50,200,150,0.3);
            --cp-button-hover-color: rgba(50,200,150,0.3);
        }
    }

</style>