<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';
	import Colorpick from '$lib/components/Settings/ColorpickSetting.svelte';
	import Fa from 'svelte-fa';
	import { fas } from '@fortawesome/free-solid-svg-icons';

	import { picSrc, showEditor } from '$lib/utils/shared.svelte.js';
	import { showLightbox } from '$lib/utils/shared.svelte';
	import { onMount, tick } from 'svelte';
	import Resolver from '$lib/components/Settings/Resolver.svelte';

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

	let tempOverlay: string = $state(settings.overlay);
	$effect((): any => settings.overlay = tempOverlay);

	let tempWelcome: string = $state(settings.welcome);
	$effect((): any => settings.welcome = sData.text[0].setting);

	let sData = $state({
		background: [
			{
				type: 'color',
				value: 'bg-color',
				defaultColors: defaultColors,
				isDarkColor: isDarkColor
			},
			{
				type: 'image',
				name: 'bg-img',
				label: 'Custom background image',
				alt: 'bg image',
				handler: changeBgImg,
				reset: resetBgImg
			}
		],
		mainPic: [
			{
				type: 'image',
				name: 'pic',
				label: 'Custom main picture',
				alt: 'kitty image',
				handler: updatePic,
				reset: resetPic
			},
			{
				type: 'check',
				name: 'tint',
				label: 'Image tint'
			}
		],
		theming: [
			{
				type: 'color',
				value: 'text-color',
				defaultColors: defaultColors,
				isDarkColor: isDarkColor
			},
			{
				type: 'color',
				value: 'accent-color',
				defaultColors: defaultColors,
				isDarkColor: isDarkColor
			},
			{
				type: 'color',
				value: 'accent-color2',
				defaultColors: defaultColors,
				isDarkColor: isDarkColor
			},
			{
				type: 'color',
				value: 'selection',
				defaultColors: defaultColors,
				isDarkColor: isDarkColor
			}
		],
		text: [
			{
				type: 'text',
				name: 'welcome',
				label: 'Upper text: &nbsp',
				setting: tempWelcome
			}
		]
	});

	//

	// section sorter (why doesn't css just have this??)

	let left: Element;
	let right: Element;

	const rebalance = (): void => {
		if (!left.lastElementChild) return;

		while (left.scrollHeight > left.clientHeight && left.children.length) {
			right.prepend(left.lastElementChild);
		}
	};

	const resize = (): void => {
		while (right.children.length) {
			left.append(right.firstElementChild);
		}
		rebalance();
	};

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
						Images can be animated (e.g. gifs), ideally 16:9
					</p>
				</div>
				{#each sData.background as values, i}
					<div role="listitem" class="settings-bloc">
						<Resolver bind:values={sData.background[i]} />
					</div>
				{/each}

				<!-- Main picture-->
				<div class="bloc-head">
					<h3>Main picture</h3>
					<p class="tiny-gray-text">
						Images can be animated (e.g. gifs), ideally 1:1
					</p>
				</div>
				{#each sData.mainPic as values, i}
					<div role="listitem" class="img-bloc settings-bloc">
						<Resolver bind:values={sData.mainPic[i]} bind:checked={tempOverlay} />
					</div>
				{/each}

				<!-- Colors-->
				<div class="bloc-head">
					<h3>Theming</h3>
					<p class="tiny-gray-text">
						Have fun
					</p>
				</div>
				{#each sData.theming as values, i}
					<div role="listitem" class="check-bloc settings-bloc">
						<Resolver bind:values={sData.theming[i]} />
					</div>
				{/each}

				<!-- Text-->
				<div class="bloc-head">
					<h3>Text</h3>
					<p class="tiny-gray-text">
						Note that this might be the first thing you read in a day
					</p>
				</div>
				{#each sData.text as values, i}
					<div role="listitem" class="text-bloc settings-bloc">
						<Resolver bind:values={sData.text[i]} />
					</div>
				{/each}

			</div>
			<ul class="settings-bloc-cont settings-bloc-cont-r">
				<li></li>
			</ul>
		</section>
		<section class="editor-seg">
			<div class="editor-bloc-cont">
				<div>
					<button class="editor-button" onclick={() => {switchToEditor()}}>
						<Fa icon={fas['faPenToSquare']} color="white"></Fa>
					</button>
				</div>
			</div>
			<div class="upload-bloc-cont">
				<div>
					<button class="save-button u-button" onclick={() => {switchToEditor()}}>
						<Fa icon={fas['faPenToSquare']} color="white"></Fa>
					</button>
					<button class="upload-button u-button" onclick={() => {switchToEditor()}}>
						<Fa icon={fas['faPenToSquare']} color="white"></Fa>
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

                    & .bloc-head {
                        & h3 {
                            color: white;
                        }
                    }

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

                    & div {
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