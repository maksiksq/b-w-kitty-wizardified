<script lang="ts">
	import Fa from 'svelte-fa';
	import { fas } from '@fortawesome/free-solid-svg-icons';
	import { fab } from '@fortawesome/free-brands-svg-icons';

	let { isDarkColor } = $props();

	interface Ibookmark {
		url: string,
		icon: string,
	}

	let bookmarks: Ibookmark[] = [
		{
			url: 'https://mail.google.com/mail/u/5/#inbox',
			icon: 'faEnvelope'
		},
		{
			url: 'https://keep.google.com/u/0/',
			icon: 'faStickyNote'
		},
		{
			url: 'https://www.youtube.com/',
			icon: 'faYoutube'
		},
		{
			url: 'https://web.telegram.org/a/',
			icon: 'faTelegram'
		},
		{
			url: 'https://github.com/maksiksq/',
			icon: 'faGithubAlt'
		},
		// {
		// 	url: "https://reddit.com",
		// 	icon: "faRedditAlien",
		// },
		// {
		// 	url: "https://thekanjimap.com/%E6%97%A5",
		// 	icon: "faSnowflake",
		// },
		{
			url: 'https://translate.google.com/',
			icon: 'faLanguage'
		},
		{
			url: 'https://classroom.google.com/u/3/',
			icon: 'faChalkboard'
		},
		{
			url: 'https://docs.google.com/document/u/0/',
			icon: 'faFileWord'
		}
	];
</script>

<div class="dockbar">
	{#each bookmarks as bookmark}
		<a href={bookmark.url}>
			<Fa icon={
                    (fas[bookmark.icon] !== undefined)
                    ? fas[bookmark.icon]
                    : fab[bookmark.icon]
                }
					color={isDarkColor ? 'white' : '#2e2e2e'}
			/>
		</a>
	{/each}
</div>

<style>
    .dockbar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;

        position: absolute;
        height: 100%;
        left: 0;
        top: 0;

        z-index: 1;

        a {
            position: relative;
            height: 60px;
        }

        :global {
            svg {
                position: absolute;
                width: 70px;
                font-size: 40px;
                padding: 5px 10px 5px 10px;
                border-radius: 5px 0 0 5px;
                background-color: var(--accent-color);
                transition: .5s;
                opacity: 0.5;
                left: -20px;

                &:hover {
                    left: -70px;
                    opacity: 1;
                    padding: 5px 20px 5px 0;
                }
            }
        }
    }
</style>