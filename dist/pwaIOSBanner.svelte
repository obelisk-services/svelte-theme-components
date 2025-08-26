<script>
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';
    let { appName='la aplicación' } = $props();

    onMount(showBanner);
    let show = $state(false);
    function showBanner(){
        // Checks if should display install popup notification:
        if (isIos() && !isInStandaloneMode()) {
            setTimeout(()=>show = true, 1000);
            //show = true;
        }
    }
    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test( userAgent );
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    
</script>
{#if show}
    <div in:slide class="absolute bottom-0 left-0 right-0 card p-4 bg-gray-100 dark:bg-gray-900 rounded-lg" data-popup="pwa-ios-banner">
        <p class="text-sm text-center text-black dark:text-white">Instala <span class="italic">{appName}</span> en tu dispositivo. Pulsa <i class="icon-[ic--sharp-ios-share]"></i> y después en "Añadir a pantalla de inicio"</p>
        <div class="arrow bg-gray-100 dark:bg-gray-900"></div>
    </div>
{/if}