<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import Colorpick from '$lib/components/Colorpick.svelte';
	import Fa from 'svelte-fa';
	import { fas } from '@fortawesome/free-solid-svg-icons';

	let {
		defaultColors,
		showLightbox = $bindable(false),
		isDarkColor = $bindable(false),
		settings = $bindable(undefined)
	} = $props();

	let tempOverlay: boolean = $state(settings.overlay === 'true');
	$effect((): any => settings.overlay = tempOverlay.toString());
</script>

<div class="settings-wrap">
	<div class="settings-wrap-inner">
		<section class="settings-bloc-cont">
			{#each Object.keys(defaultColors) as value}
				<Colorpick {defaultColors} {value} bind:isDarkColor />
			{/each}
			<div class="tint-bloc settings-bloc">
				<input name="tint" type="checkbox" bind:checked={tempOverlay} />
				<label for="tint">Image tint</label>
			</div>
			<div class="welcome-bloc settings-bloc">
				<label for="welcome">Upper text: &nbsp</label>
				<input name="welcome" type="text" bind:value={settings.welcome}
							 onkeydown={(e) => {e.key === 'Enter' ? showLightbox=false : ''}} />
			</div>
		</section>
		<section class="editor-bloc-cont">
			<button class="editor-button">
				<Fa icon={fas['faPenToSquare']}></Fa>
			</button>
		</section>

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

            display: flex;
            flex-direction: row;

            /* inner color picker bits */
            --cp-bg-color: rgba(46, 46, 46, 1);
            --cp-border-color: var(--accent-color2);
            --cp-text-color: white;
            --cp-input-color: var(--accent-color);
            --cp-button-hover-color: var(--accent-color);

						& section {
                width: 50%;
						}
            & .settings-bloc-cont {
                display: flex;
                flex-direction: column;
                gap: 1vw;

								border-right: var(--accent-color2) solid 1px;

								& .settings-bloc {
                    color: white;
                }
            }

						& .editor-bloc-cont {
								padding-left: 1%;

								display: flex;
								align-items: center;
								justify-content: center;

								& .editor-button {
										all: unset;

										cursor: pointer;

										width: 3vw;
										height: 3vw;

										:global {
                        svg {
														width: 100%;
														height: 100%;
                        }
                    }
                }
						}


        }
    }

</style>