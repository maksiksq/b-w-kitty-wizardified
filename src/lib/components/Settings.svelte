<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import Colorpick from '$lib/components/Settings/ColorpickSetting.svelte';
	import Fa from 'svelte-fa';
	import { fas } from '@fortawesome/free-solid-svg-icons';

	import { picSrc, showEditor } from '$lib/utils/shared.svelte.js';
	import { showLightbox } from '$lib/utils/shared.svelte';
	import Setting from '$lib/components/Settings/ImageSetting.svelte';
	import CheckSetting from '$lib/components/Settings/CheckSetting.svelte';
	import InputSetting from '$lib/components/Settings/TextSetting.svelte';
	import TextSetting from '$lib/components/Settings/TextSetting.svelte';
	import { onMount, tick } from 'svelte';

	let {
		defaultColors,
		isDarkColor = $bindable(false),
		settings = $bindable(undefined)
	} = $props();

	const switchToEditor = (): void => {
		showEditor.val = !showEditor.val;
		showLightbox.val = false;
	};

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

	const resetPic = (e: Event): void => {
		picSrc.val = '/img/head-pic.png';
		localStorage.setItem('i-pic-src', '/img/head-pic.png');
	};

	//

	let root = document.documentElement;

	const changeBgImg = (e: Event): void => {
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

	const resetBgImg = (e: Event): void => {
		root.style.setProperty('--bg-img', '');
		localStorage.setItem('bg-img', '');
	};

	//

	let sData = $state({
		pictures: [
			{
				name: 'pic',
				label: 'Custom focal picture<br> (1:1 ideally, can be animated e.g. gif)',
				alt: 'kitty image',
				handler: updatePic,
				reset: resetPic
			},
			{
				name: 'bg-img',
				label: 'Custom background image<br> (16:19 ideally, can be animated e.g. gif)',
				alt: 'bg image',
				handler: changeBgImg,
				reset: resetBgImg
			}
		],
		checks: [
			{
				name: 'tint',
				label: 'Image tint'
			}
		],
		text: [
			{
				name: 'welcome',
				label: 'Upper text: &nbsp'
			}
		]
	});

	let tempOverlay: boolean = $state(settings.overlay === 'true');
	$effect((): any => settings.overlay = tempOverlay.toString());

	//

	// section sorter (why doesn't css just have this??)

	let left: Element;
	let right: Element;

	const rebalance = (): void => {
		console.log("hi")
		while (left.scrollHeight > left.clientHeight && left.children.length) {
			right.prepend(left.lastElementChild);
		}
	}

	const resize = (): void => {
		while (right.children.length) {
			left.append(right.firstElementChild);
		}
		rebalance();
	}

	onMount(() => {
		left = document.getElementsByClassName('settings-bloc-cont-l')[0];
		right = document.getElementsByClassName('settings-bloc-cont-r')[0];
		
		tick().then(rebalance);
	});


</script>

<svelte:window onresize={resize}></svelte:window>

<div class="settings-wrap">
	<div class="settings-wrap-inner">
		<section class="settings-seg">
			<div role="list" class="settings-bloc-cont settings-bloc-cont-l">
				<!-- Background-->
				<div class="bloc-head">
					<h3>Background</h3>
					<p class="tiny-gray-text">
						Images can be animated (e.g. gifs)
					</p>
				</div>
				{#each Object.keys(defaultColors) as value}
					<div role="listitem" class="colorpick-bloc settings-bloc">
						<Colorpick {defaultColors} {value} bind:isDarkColor />
					</div>
				{/each}

				<!-- Main picture-->
				<h3>Main picture</h3>
				{#each sData.pictures as values}
					<div role="listitem" class="img-bloc settings-bloc">
						<Setting {values} />
					</div>
				{/each}

				<!-- Colors-->
				<h3>Theming</h3>
				{#each sData.checks as values}
					<div role="listitem" class="check-bloc settings-bloc">
						<CheckSetting {values} bind:checked={tempOverlay} />
					</div>
				{/each}

				<!-- Text-->
				<h3>Text</h3>
				{#each sData.text as values}
					<div role="listitem" class="text-bloc settings-bloc">
						<TextSetting {values} bind:setting={settings.welcome} />
					</div>
				{/each}

			</div>
			<ul class="settings-bloc-cont settings-bloc-cont-r"></ul>
		</section>
		<section class="editor-seg">
			<div class="editor-bloc-cont">
				<div>
					<button class="editor-button" onclick={() => {switchToEditor()}}>
						<Fa icon={fas['faPenToSquare']}></Fa>
					</button>
				</div>
			</div>
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
            width: 80vw;
            height: 80vh;

            user-select: none;
            pointer-events: auto;

            background-color: rgba(0, 0, 0, 0.25);
						backdrop-filter: blur(3px);

            padding: 1.25vw;
            border-radius: 5px;
            border: var(--accent-color2) solid 1px;

            display: flex;
            flex-direction: row;

            /* inner color picker bits */
            --cp-bg-color: rgba(46, 46, 46, 1);
            --cp-border-color: var(--accent-color2);
            --cp-text-color: white;
            --cp-input-color: var(--accent-color);
            --cp-button-hover-color: var(--accent-color);

            & .settings-seg {
                width: 70%;
								height: 100%;

                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2vw;
                padding: 1rem;
                box-sizing: border-box;
            }

            & .editor-seg {
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;

                width: 30%;
            }

            & section {
                & ul {
                    all: unset;

                    li {
                        all: unset;
                    }
                }

                & .settings-bloc-cont {
										width: 100%;
										height: 100%;

										display: flex;
										flex-direction: column;
                    gap: 1vw;
										overflow-y: auto;

                    padding-right: 1vw;

                    border-right: var(--accent-color2) solid 1px;

                    & .settings-bloc {
                        color: white;

                        display: flex;
                        flex-direction: row;

                        :global {
                            .bloc-seg-r {
                                margin-left: auto;

                                & .default-button {
                                    border-radius: 1px;
                                    padding: 3px;
                                    background-color: white;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }

                & .editor-bloc-cont {
                    padding-left: 1%;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    & li {
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


        }
    }

		.tiny-gray-text {
				color: rgba(133, 133, 133, 0.8);
				font-weight: bold;
				font-size: 15px;
		}
</style>