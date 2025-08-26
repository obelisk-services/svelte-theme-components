<script>
    import { updated } from '$app/state';
    import { swalWrap } from "svelte-js-functions-package";
    import { clickOutside } from "svelte-js-functions-package";
	import { fade } from 'svelte/transition';

    import { obeliskFetchAwait } from "svelte-js-functions-package";

    let showUpdateMenu = $state(false);

    function update(){
        swalWrap.fire('Nueva versión disponible', 'Se ha actualizado la aplicación', 'success').then(() => location.reload())
    }

    let currentVersion = $state('');
    let newVersion = $state('');
    $effect(()=>{
        loadVersion(updated.current)
    });

    async function loadVersion(update){
        try{
            let json = await obeliskFetchAwait.fetchJSON(fetch, '/_app/version.json', 'GET');
            if(json){
                if(!update) currentVersion = json.version;
                else newVersion = json.version;
            }
        }catch(e){
            //console.log(e)
        }
    }

</script>
{#if updated.current}
    <div class="relative">
        <div class="flex">
            <button class="flex" aria-label="Nueva versión disponible" type="button" onclick={() => (showUpdateMenu = !showUpdateMenu)}>
                <i class="icon icon-[solar--smartphone-update-broken]" ></i>
            </button>
        </div>
        {#if showUpdateMenu}
            <div transition:fade use:clickOutside onoutclick={() => (showUpdateMenu = false)} class="absolute top-6 -left-16 w-42 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700">
                <p>Versión actual:<br/>{currentVersion}</p>
                <p>Nueva versión:<br/>{newVersion}</p>
                <button class="button" onclick={update}>Actualizar</button>
            </div>
            
        {/if}
    </div>
{/if}