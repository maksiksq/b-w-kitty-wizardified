<script lang="ts">
	import Lightbox from '$lib/components/Lightbox.svelte';
	import Dockbar from '$lib/components/Dockbar.svelte';

	import '../global.css';
	import Clock from '$lib/components/Clock.svelte';
	import MainHeader from '$lib/components/MainHeader.svelte';
	import { onMount } from 'svelte';

	import { draggable } from '$lib/utils/actions.svelte';
	import { showEditor } from '$lib/utils/shared.svelte';

	// saving and updating css variables
	type TColors = {
		[key: string]: string
		'bg-color': string,
		'text-color': string,
		'accent-color': string,
		'accent-color2': string,
	}

	const defaultColors: TColors = {
		'bg-color': 'rgba(46,46,46,255)',
		'text-color': 'rgba(230,230,230,255)',
		'accent-color': 'rgba(50,200,150,.3)',
		'accent-color2': 'rgba(200, 50, 50, 0.3)'
	};

	let root = document.documentElement;
	Object.keys(defaultColors).forEach(key => {
		let c = localStorage.getItem(key);
		if (c) {
			root.style.setProperty('--' + key, c);
		}
	});

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

	const onSettingsChange = (def: boolean, value: string): string => {
		let r;
		if (def) {
			r = defaultSettings[value];
		} else {
			r = settings[value];
		}
		localStorage.setItem(`s-${value}`, r);
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

	$inspect(showEditor.val);
</script>

<Lightbox {defaultColors} bind:isDarkColor bind:settings />
<main class="main-wrapper">
	<MainHeader {welcome} />
	<div use:draggable={showEditor.val} class="pic-wrap">
		<Dockbar {isDarkColor} />
		<div class="pic-cover {overlay ? 'show-overlay' : ''}">
			<img src="/img/head-pic.png" alt="trippy cute cat" />
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