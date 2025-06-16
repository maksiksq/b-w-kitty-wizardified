<script lang="ts">
	import Lightbox from '$lib/components/Lightbox.svelte';
	import Dockbar from '$lib/components/Dockbar.svelte';

	import '../global.css';
	import Clock from '$lib/components/Clock.svelte';
	import MainHeader from '$lib/components/MainHeader.svelte';
	import { onMount } from 'svelte';

	import { draggable } from '$lib/utils/actions.svelte';
	import { showEditor } from '$lib/utils/shared.svelte';
	import { picSrc } from '$lib/utils/shared.svelte';

	// saving and updating css variables
	type TColors = {
		[key: string]: string
		'bg-color': string,
		'text-color': string,
		'accent-color': string,
		'accent-color2': string,
	}

	const defaultColors: TColors = {
		'bg-color': 'rgba(46,46,46,1)',
		'text-color': 'rgba(230,230,230,1)',
		'accent-color': 'rgba(50,200,150,0.3)',
		'accent-color2': 'rgba(200, 50, 50, 0.3)',
		'selection': 'rgba(138,2,181,1)',

	};

	let root = document.documentElement;
	Object.keys(defaultColors).forEach(key => {
		let c = localStorage.getItem(key);
		if (c) {
			root.style.setProperty('--' + key, c);
		}
	});

	let bg = localStorage.getItem('bg-img');
	if (bg) {
		root.style.setProperty('--bg-img', `url(${bg})`);
	}
	//

	type TSettings = {
		[key: string]: string

		welcome: string;
		overlay: string;
	}

	let defaultSettings: TSettings = $state({
		'welcome': 'a deep bottomless void (change me)',
		'overlay': 'true'
	});

	let settings: TSettings = $state({
		'welcome': localStorage.getItem('s-welcome') || 'お帰りなさい',
		'overlay': localStorage.getItem('s-overlay') || 'true'
	});

	$inspect('e', settings.overlay);

	const onSettingsChange = (def: boolean, value: string): string => {
		let r;
		if (def) {
			r = defaultSettings[value];
		} else {
			r = settings[value];
		}
		localStorage.setItem(`s-${value}`, r);
		r = localStorage.getItem(`s-${value}`);
		if (!r) {return 'oh no'}
		return r;
	};

	let welcome =
		$derived(settings.welcome === ''
			? onSettingsChange(true, 'welcome')
			: onSettingsChange(false, 'welcome')
		);

	const parseBool = (str: string) => {
		return (str === 'true');
	};

	let overlay =
		$derived(parseBool(settings.overlay === ''
			? onSettingsChange(true, 'overlay')
			: onSettingsChange(false, 'overlay'))
		);

	//

	let isDarkColor = $state((localStorage.getItem('is-dark-color') === 'true') || false);

	//

	picSrc.val = localStorage.getItem('i-pic-src') ?? "/img/head-pic.png"
</script>

<Lightbox {defaultColors} bind:isDarkColor bind:settings />
<main class="main-wrapper">
	<MainHeader {welcome} />
	<div use:draggable={showEditor.val} class="pic-wrap">
		<Dockbar {isDarkColor} />
		<div class="pic-cover {overlay ? 'show-overlay' : ''}">
			<img src={picSrc.val} class="focal-pic" alt="trippy cute cat" />
		</div>
	</div>

	<Clock />
	<!--    <Searchbar/>-->
</main>

<style>
    .main-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;

        height: 100%;
        width: 100%;
        z-index: -1;
    }


    .pic-wrap {
        margin-top: 1.87vw;
        position: relative;

        & .pic-cover {
            & img {
								user-select: none;
								/* overriden on drag */
								pointer-events: none;

                position: relative;
                height: 29.4vw;
                width: 29.4vw;
                z-index: 100;
            }
        }

        & .pic-cover.show-overlay::after {
            content: " ";
            position: absolute;
            top: 0;
            left: 0;
            height: 29.4vw;
            width: 29.4vw;

            background-color: var(--bg-color);
            opacity: 0.3;
            z-index: 101;
        }
    }
</style>