<script lang="ts">
    import Lightbox from "$lib/Lightbox.svelte";
    import Settings from "$lib/Settings.svelte";
    import Dockbar from "$lib/Dockbar.svelte";

    const time:Date = new Date();

    let welcome = $state('JUST CARRY ON');
</script>

<Lightbox is-lightbox=showLightbox />
<Settings/>
<main class="main-wrapper">
    <div>
        <div class="h-text">
            <h1>{{ welcome }}</h1>
        </div>
        <div class="pic-cover"></div>
        <Dockbar/>
        <img src="@/assets/pic.png" alt="beans"/>
        <div class="time">
            <h2>{ time.toLocaleTimeString("de-De").slice(0, 5) }</h2>
        </div>
    </div>
    <!--    <Searchbar/>-->
</main>
