<script>
	import { showLeftMenu } from './theme-store.js';
	import { get } from "svelte/store";
</script>

<!-- Mobile hamburger -->
<button aria-label="Menu" onclick={() => {showLeftMenu.set(!get(showLeftMenu))}} class="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-red">
	<i class="icon-[pajamas--hamburger] icon"></i>
</button>