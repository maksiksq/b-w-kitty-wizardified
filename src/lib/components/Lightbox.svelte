<script lang="ts">
	import Fa from 'svelte-fa';

	import { faPaintRoller, faTimes } from '@fortawesome/free-solid-svg-icons';
	import Settings from '$lib/components/Settings.svelte';

	let { defaultColors, showLightbox=$bindable(false), isDarkColor=$bindable(false), settings=$bindable(undefined) } = $props();

</script>

{#if showLightbox}

	<div class="lightbox" role="presentation" onclick={() => {showLightbox = false}}></div>
	<button class="cross-wrap" onclick={() => {showLightbox=false}}>
		<Fa icon={faTimes} class="cross"></Fa>
	</button>b
	<Settings {defaultColors} bind:showLightbox bind:isDarkColor bind:settings />

{/if}
<!-- -->
<button type="button" class="settings-button" onclick={() => {showLightbox = true}}>
	<Fa icon={faPaintRoller} color={isDarkColor ? '#dfdfdf' : '#2e2e2e'}></Fa>
</button>

<style>
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;

        opacity: 0.95;

        width: 100vw;
        height: 100vh;

        background-color: rgba(46, 46, 46, 1);

        transition: all 0.5s ease-in-out;
        border-radius: 0;
        z-index: 9999;
    }

    .cross-wrap {
        all: unset;

        top: 1vw;
        right: 1vw;

        position: absolute;
        z-index: 10001;


        cursor: pointer;

        :global(.cross) {
            opacity: 0.3;
            transition: opacity 0.3s;
            width: 2vw;
            height: 2vw;

            &:hover {
                opacity: 1;
            }
        }
    }


    .settings-button {
        all: unset;

        position: absolute;
        top: 1.3vw;
        transform: translateX(calc(100vw - 1.3vw));

        padding: 10px 15px 6px 30px;

        background-color: var(--accent-color);

        transition: all 0.3s;
        border-radius: 5px;

        opacity: 0.3;

        font-size: 20px;

        &:hover {
            padding: 10px 30px 6px 15px;
            transform: translateX(calc(100vw - 3.3vw));
            cursor: pointer;
            opacity: 1;
        }
    }


</style>