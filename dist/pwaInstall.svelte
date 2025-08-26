<script>
    import { onMount } from 'svelte';
    let showInstallPromptButton=$state(false);
    let installPrompt;
    onMount(showBanner);
    function showBanner(){
        window.addEventListener("beforeinstallprompt", (event) => {
            event.preventDefault();
            installPrompt = event;
            showInstallPromptButton=true
        });
    }

    async function install(){
        const result = await installPrompt.prompt();
        console.log(`Install prompt was: ${result.outcome}`);
        showInstallPromptButton=false;
    }
    
</script>
{#if showInstallPromptButton}
    <button aria-label="Instalar aplicación" type="button" onclick={install}><i class="icon-[material-symbols--install-mobile] icon"></i></button>
{/if}