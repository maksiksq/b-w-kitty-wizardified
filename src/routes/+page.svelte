<script lang="ts">
	import Lightbox from '$lib/components/Lightbox.svelte';
	import Dockbar from '$lib/components/Dockbar.svelte';
	import { browser } from '$app/environment';

	import '../global.css';
	import Clock from '$lib/components/Clock.svelte';
	import MainHeader from '$lib/components/MainHeader.svelte';

	let showLightbox: boolean = $state(false);

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
		welcome: string;
		overlay: boolean;
	}

	let settings: TSettings = $state({
		'welcome': 'お帰りなさい',
		'overlay': true,

	});

	$inspect('hai', settings.overlay);
</script>

<Lightbox {defaultColors} bind:showLightbox bind:settings />
<main class="main-wrapper">
	<MainHeader welcome={settings.welcome} />
	<div class="pic-wrap">
		<Dockbar />
		<div class="pic-cover {settings.overlay ? 'show-overlay' : ''}">
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