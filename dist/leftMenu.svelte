<script>
	import { onDestroy } from 'svelte';
	import { clickOutside } from "svelte-js-functions-package";
	import { env as prodEnv } from '$env/dynamic/public';
	import { page } from '$app/state';
	import { showLeftMenu } from './theme-store.js';
	/**
	 * @typedef {Object} Props
	 * @property {any} [menu]
	 * @property {boolean} [showMobileMenu]
	 * @property {string} [appName]
	 */

	/** @type {Props} */
	let { menu = [], showMobileMenu = $bindable(false), appName = 'app' } = $props();

	function hideMobileMenuOnScreenSizeChange(ow){ //Si el usuario cambia el tamaño de la pantalla, se oculta el menu
		if(ow>=768){
			showMobileMenu=false;
		}
	}

	const unsubscribe = showLeftMenu.subscribe((slm)=>{
		showMobileMenu=slm;
	});
	let onlyIcons = $state(localStorage.getItem("onlyIcons")==='true');
	function handleMobile(smm){
		localStorage.setItem("onlyIcons", onlyIcons === true ? 'true' : 'false');
		onlyIcons=smm?false:onlyIcons;
	}
	onDestroy(unsubscribe);
	let outerWidth = $state(0);
	
	$effect(() => {
		hideMobileMenuOnScreenSizeChange(outerWidth);
	});
	$effect(() => {
		handleMobile(showMobileMenu);
	});
</script>

<svelte:window bind:outerWidth />

<!-- Mobile hamburger -->
<aside id="menuSidebar" use:clickOutside onoutclick={() => (showLeftMenu.set(false))} class="fixed md:static md:block inset-y-0 z-20 flex-shrink-0 {showMobileMenu?'w-48':'w-0'} {onlyIcons?'md:w-12':'md:w-48'} mt-16 md:mt-0 overflow-y-auto bg-white dark:bg-gray-800 transition-all ease-in-out" data-sveltekit-preload-data="tap">
    <div class="py-4 text-gray-500 dark:text-gray-400">
      	<div class="flex justify-center">
			<img alt={appName} src="/images/logo.webp" class="block dark:hidden {onlyIcons?'mx-2 max-w-8':'mx-6 max-w-12'} text-lg font-bold text-gray-800 dark:text-gray-200">
			<img alt={appName} src="/images/logoDark.webp" class="hidden dark:block {onlyIcons?'mx-2 max-w-8':'mx-6 max-w-12'} text-lg font-bold text-gray-800 dark:text-gray-200">
		</div>
	  	{#if !showMobileMenu}
			<div class="relative z-30">
				<button onclick={() => onlyIcons = !onlyIcons} class="absolute flex top-0 right-0 py-1 pl-1 pr-2 rounded-l-lg">
					{#if !onlyIcons}<i class="text-lg icon-[iconamoon--arrow-left-2-bold]"></i>{/if}
					{#if onlyIcons}<i class="text-lg icon-[iconamoon--arrow-right-2-bold]"></i>{/if}
				</button>
			</div>
		{/if}
	  
      <ul id="menuList" class="mt-6">
      	{#each menu as element, i}
			{#if element.defaultModule || JSON.parse(prodEnv.PUBLIC_ENABLED_MODULES).includes(element.name)}
				<li class="relative px-2 py-3 border-4 border-transparent {page.route.id.includes(element.href)?('border-l-app-500'):''}">
					<a href="{element.href}" onclick={() => (showMobileMenu = false)} class="menuCloser cursor-pointer inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 {page.route.id.includes(element.href)?'text-gray-800 dark:text-gray-100':''}">
						<i class="h-6 w-6 {element.icon}"></i>{#if !onlyIcons}<span class="ml-2 text-lg">{element.text}</span>{/if}
					</a>
				</li>
			{/if}
      	{/each}
      </ul>
    </div>

</aside>
