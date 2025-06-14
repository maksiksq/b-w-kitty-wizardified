<script lang="ts">
	import Fa from 'svelte-fa';
	import { fas } from '@fortawesome/free-solid-svg-icons';
	import { fab } from '@fortawesome/free-brands-svg-icons';

	interface bookmarkI {
		url: string,
		icon: string,
	}

	let bookmarks: bookmarkI[] = [
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

{#each bookmarks as bookmark}
	<a href={bookmark.url}>
		<Fa icon={
                    (fas[bookmark.icon] !== undefined)
                    ? fas[bookmark.icon]
                    : fab[bookmark.icon]
                } />
	</a>
{/each}