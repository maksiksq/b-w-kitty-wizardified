<script lang="ts">
	import Lightbox from '$lib/components/Lightbox.svelte';
	import Dockbar from '$lib/components/Dockbar.svelte';
	import { browser } from '$app/environment';

	import '../global.css';
	import { onDestroy, onMount } from 'svelte';
	import Clock from '$lib/components/Clock.svelte';

	const showLightbox: boolean = false;

	let welcome = $state('お帰りなさい');

</script>

<Lightbox {showLightbox} />
<main class="main-wrapper">
	<div class="h-text">
		<h1>{welcome}</h1>
	</div>
	<div class="pic-wrap">
		<Dockbar />
		<div class="pic-cover">
			<img src="/img/head-pic.png" alt="trippy cute cat" />
		</div>
	</div>


	<Clock>

	</Clock>
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
</style>