<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import Colorpick from '$lib/components/Colorpick.svelte';
	import Fa from 'svelte-fa';
	import { fas } from '@fortawesome/free-solid-svg-icons';

	import { picSrc, showEditor } from '$lib/utils/shared.svelte.js';
	import { showLightbox } from '$lib/utils/shared.svelte';

	let {
		defaultColors,
		isDarkColor = $bindable(false),
		settings = $bindable(undefined)
	} = $props();

	let tempOverlay: boolean = $state(settings.overlay === 'true');
	$effect((): any => settings.overlay = tempOverlay.toString());

	const switchToEditor = (): void => {
		showEditor.val = !showEditor.val;
		showLightbox.val = false;
	}

	let pic = $state(new Image());

	const updatePic = (e: Event): void => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			pic.src = reader.result as string;
			picSrc.val = pic.src;
			localStorage.setItem('i-pic-src', pic.src);
		};
		reader.readAsDataURL(file);
	};

	//

	let root = document.documentElement;

	let changeBgImg = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			pic.src = reader.result as string;
			const url = pic.src;

			root.style.setProperty('--bg-img', `url(${url})`);
			localStorage.setItem('bg-img', url);
		};
		reader.readAsDataURL(file);
	};
</script>

<div class="settings-wrap">
	<div class="settings-wrap-inner">
		<section class="settings-bloc-cont">
			{#each Object.keys(defaultColors) as value}
				<Colorpick {defaultColors} {value} bind:isDarkColor />
			{/each}
			<div class="pic-bloc settings-bloc">
				<label for="pic">Custom focal picture (1:1 ideally)</label>
				<input name="pic" type="file" alt="kitty image" oninput={updatePic} />
			</div>
			<div class="bg-img-bloc settings-bloc">
				<label for="bg-img">Custom background image (16:19 ideally)</label>
				<input name="bg-img" type="file" alt="bg image" oninput={changeBgImg} />
			</div>
			<div class="tint-bloc settings-bloc">
				<input name="tint" type="checkbox" bind:checked={tempOverlay} />
				<label for="tint">Image tint</label>
			</div>
			<div class="welcome-bloc settings-bloc">
				<label for="welcome">Upper text: &nbsp</label>
				<input name="welcome" type="text" bind:value={settings.welcome}
							 onkeydown={(e) => {e.key === 'Enter' ? showLightbox.val=false : ''}} />
			</div>
		</section>
		<section class="editor-bloc-cont">
			<button class="editor-button" onclick={() => {switchToEditor()}}>
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

										width: 2.5vw;
										height: 2.5vw;

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