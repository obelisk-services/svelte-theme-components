<script>
	import { clickOutside } from "svelte-js-functions-package";
	import { fade } from 'svelte/transition';
	import { getUrl } from "aws-amplify/storage";
	let showUserMenu=$state(false);

	/**
	 * @typedef {Object} Props
	 * @property {string} [dest]	
	 * @property {any} [user]
	 * @property {string} [backendPath]
	 * @property {any} [AditionalMenuLinks]
	 */

	/** @type {Props} */
	let { user={}, userPoolId='', backendPath='/backend/', dest='usuario', AditionalMenuLinks=null } = $props();

</script>

<div class="relative">
	<button type="button" aria-label="Menú de usuario" onclick={() => (showUserMenu = !showUserMenu)} class="flex align-middle rounded-full focus:shadow-outline-red focus:outline-none">
		{#await getUrl({path: userPoolId+'/'+user.username.username, options: {validateObjectExistence:true}})}
			<i class="text-3xl icon-[mdi--account-circle] text-gray-400 dark:text-gray-300"></i>
		{:then linkToStorageFile}
	  		<img class="object-cover w-8 h-8 rounded-full userImage" src="{linkToStorageFile.url.toString()}" alt="Perfil"/>
		{:catch error}
			<i class="text-3xl icon-[mdi--account-circle] text-gray-400 dark:text-gray-300"></i>
		{/if}
	</button>
	{#if showUserMenu}
	  <ul transition:fade use:clickOutside onoutclick={() => (showUserMenu = false)} class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700">
		{#if AditionalMenuLinks}
			<AditionalMenuLinks click={() => (showUserMenu = false)} {user}/>
		{/if}
		<li class="flex">
		  <a onclick={() => (showUserMenu = false)} class="menuCloser inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/{dest}/profile/">
			<i class="text-lg icon-[mdi--user] mr-1"></i>
			<span>Perfil</span>
		  </a>
		</li>
		<li class="flex">
		  <a class="menuCloser inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200" type="button" href="/logout">
			<i class="text-lg icon-[ic--outline-logout] mr-1"></i>
			<span>Salir</span>
		  </a>
		</li>
	  </ul>
	{/if}

</div>


