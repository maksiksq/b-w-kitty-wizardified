<script lang="ts">
	let { showLightbox } = $props();
</script>

{#if showLightbox}
	<div class="lightbox">
		<svg onclick={() => {showLightbox=false}} aria-hidden="true" focusable="false" data-prefix="fas"
				 data-icon="times" class="svg-inline--fa fa-times fa-w-11 " role="img"
				 xmlns="http://www.w3.org/2000/svg"
				 viewBox="0 0 352 512">
			<path fill="currentColor"
						d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
		</svg>
	</div>
{/if}
<button type="button" class="settings-button" onclick={() => {showLightbox = true}}>
	redacted
</button>

<style>
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;

        opacity: 0.95;

        height: 100vw;
        width: 100vw;
        background-color: rgba(46, 46, 46, 1);

        transition: all 0.5s ease-in-out;
        border-radius: 0;
        z-index: 9999;

        & svg {
            top: 1vw;
            right: 3vw;

            position: absolute;
            z-index: 10000;
            width: 2vw;
            height: 2vw;

            cursor: pointer;

						opacity: 0.3;
            transition: opacity 0.3s;

						&:hover {
                opacity: 1;
						}
        }


    }

    .settings-button {
        all: unset;

        position: absolute;
        top: 1.3vw;
        transform: translateX(calc(100vw - 2vw));

        padding: 10px 15px 10px 30px;

        height: 3.25vw;
        width: 2vw;
        background-color: rgba(50, 200, 150, 0.3);

        transition: all 0.3s ease-in-out;
        border-radius: 8px;

        opacity: 0.3;

        &:hover {
            transform: translateX(calc(100vw - 4vw));
            cursor: pointer;
            opacity: 1;
        }
    }


</style>