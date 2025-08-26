<script>
	import { browser } from '$app/environment';
	import { dark } from './theme-store.js';

	let darkTheme = $state(false);

	if (browser) darkTheme = localStorage.getItem("theme")==='dark';

	function toggleDarkTheme(){
		localStorage.setItem("theme", darkTheme === true ? 'dark' : 'light');
		dark.set(darkTheme);
		darkTheme?document.body.classList.add('dark'):document.body.classList.remove('dark');
		document.body.dataset.agThemeMode = darkTheme ? 'dark-blue' : 'light';
	}
	$effect(() => {
		toggleDarkTheme(darkTheme);
	});
</script>
<div class="flex">
	<button class="flex" aria-label="Modo claro/oscuro" type="button" onclick={() => darkTheme=!darkTheme}>
		<i id="themeHandler" class="icon {darkTheme?'icon-[ph--sun-fill]':'icon-[ph--moon-fill]'}" ></i>
	</button>
</div>