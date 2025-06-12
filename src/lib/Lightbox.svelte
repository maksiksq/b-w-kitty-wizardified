

<div v-if="isLightbox" class="lightbox">
    <button>
        piu
        <svg @click.prevent="isLightbox.value=false" aria-hidden="true" focusable="false" data-prefix="fas"
             data-icon="times" class="svg-inline--fa fa-times fa-w-11 " role="img" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 352 512">
            <path fill="currentColor"
                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
        </svg>
    </button>
</div>

<style>
    .lightbox {
        position: absolute;
        top: 0;
        left: 0;

        height: 100vw;
        width: 100vw;
        background-color: grey;

        transition: all 0.5s ease-in-out;
        border-radius: 0px;
        z-index: 9999;

        & svg {
            position: absolute;
            z-index: 10000;
            width: 2vw;
            height: 2vw;
            top: 3vw;
            right: 3vw;
            cursor: pointer;
        }
    }
</style>