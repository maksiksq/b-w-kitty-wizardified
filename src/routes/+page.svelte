<script lang="ts">
	import Lightbox from '$lib/components/Lightbox.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import Dockbar from '$lib/components/Dockbar.svelte';

	import '../global.css';
	import { onDestroy, onMount } from 'svelte';

	const time: Date = new Date();
	let timeDisplay: string = $state('');

	const showLightbox: boolean = false;

	let welcome = $state('お帰りなさい');

	onMount(() => {
		const interval = setInterval(() => {
			timeDisplay = time.toLocaleTimeString("de-De").slice(0, 5)},
			1000);


		onDestroy(() => {
			clearInterval(interval);
		})

	})
</script>

<Lightbox showLightbox={showLightbox} />
<main class="main-wrapper">
	<div class="h-text">
		<h1>{welcome}</h1>
	</div>
	<Dockbar />
	<div class="pic-wrap">
		<div class="pic-cover">
			<img src="/img/head-pic.png" alt="trippy cute cat" />
		</div>
	</div>


	<div class="time">
		<h2>{ timeDisplay }</h2>
	</div>
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

    .h-text {
        display: flex;
        flex-direction: row;
        justify-content: center;

        margin-top: 3.2vw;

        & h1 {
            font-size: 20pt;
            border: 1px solid rgba(200, 50, 50, 0.3);
            border-radius: 5px;
            padding: 0 20px 0 35px;
            letter-spacing: 15px;
        }

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

        & .pic-cover::after {
            content: " ";
            position: absolute;
            top: 0;
            left: 0;
            height: 29.4vw;
            width: 29.4vw;

            background-color: #2e2e2e;
            opacity: 0.3;
            z-index: 101;
        }
    }
    .time {
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: 40px;
        letter-spacing: 15px;
        margin-top: 1.5vw;

        & h2 {
            padding: 0 20px 0 35px;
            border: 1px solid rgba(200, 50, 50, 0.3);
            border-radius: 5px;

            font-size: 40px;
        }
    }
</style>