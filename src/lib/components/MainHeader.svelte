<script>

	let { welcome } = $props();
</script>

<div class="h-text">
	<h1>{welcome}</h1>
</div>

<style>
    .h-text {
        display: flex;
        flex-direction: row;
        justify-content: center;

        margin-top: 3.2vw;

        & h1 {
            font-size: 20pt;
            border: 1px solid var(--accent-color2);
            border-radius: 5px;
            padding: 0 20px 0 35px;
            letter-spacing: 15px;
        }
    }
</style>