<script lang="ts">
    import Lightbox from "$lib/Lightbox.svelte";
    import Settings from "$lib/Settings.svelte";
    import Dockbar from "$lib/Dockbar.svelte";

    const time: Date = new Date();

    const showLightbox: boolean = false;

    let welcome = $state('JUST CARRY ON');
</script>

<Lightbox showLightbox={showLightbox}/>
<Settings/>
<main class="main-wrapper">
    <div class="h-text">
        <h1>{welcome}</h1>
    </div>
    <Dockbar/>
    <div class="pic-wrap">
        <div class="pic-cover">
            <img src="/img/head-pic.png" alt="trippy cute cat"/>
        </div>
    </div>


    <div class="time">
        <h2>{ time.toLocaleTimeString("de-De").slice(0, 5) }</h2>
    </div>
    <!--    <Searchbar/>-->
</main>


<style>
    :global {
        * {
            font-family: Comfortaa, sans-serif;
            color: #fff;

            margin: 0;
            padding: 0;
        }

        body, html {
            overflow: hidden;
            background-color: #2e2e2e;

            height: 100%;
            width: 100%;
        }

        ::selection {
            background: #8a02b5;
        }
    }

    .main-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;

        height: 100%;
        width: 100%;
        z-index: -1;

        & .pic-wrap {
            position: relative;
            & .pic-cover {
                & img {
                    position: relative;
                    height: 28.6vw;
                    width: 28.6vw;
                    z-index: 100;

                    border: 1px solid #ffffff;
                }
            }

            & .pic-cover::after {
                content: " ";
                position: absolute;
                top: 0;
                left: 0;
                height: 28.6vw;
                width: 28.6vw;
                background-color: #2e2e2e;
                opacity: 0.3;
                z-index: 101;
            }
        }


    }

    .h-text {
        display: flex;
        flex-direction: row;
        justify-content: center;

        & h1 {
            padding: 6px 4px 6px 4px;
            border: aqua solid 1px;
            border-radius: 5px;
            margin-bottom: 3vw;
            margin-top: 4vw;
        }

    }

    .time {
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: 40px;
        letter-spacing: 15px;

        & h2 {
            padding: 3px 2px 3px 2px;
            border: aqua solid 1px;
            border-radius: 5px;
            margin-top: 3vw;

        }
    }


</style>