<script>
	import { clickOutside } from "svelte-js-functions-package";

	let { showForm = $bindable(null), showFormData = null, data = null, change = ()=>{} } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {if (dialog && showForm!==null) dialog.showModal();});

	function handleClose(event){
		dialog.close();
	}

	function passChangeEvent(e){
		change(e.detail);
	}

	const SvelteComponent = $derived(showForm);
</script>

<dialog
	bind:this={dialog}
	onclose={() => (showForm = null)}
	class="m-auto overscroll-contain bg-gray-50 dark:bg-gray-900 shadow-lg rounded-lg shadow-gray-800 dark:shadow-gray-800 p-0"
>
	{#if showForm}
	<div use:clickOutside onoutclick={() => dialog.close()}>
		<div class="py-10 px-4 relative">
			<button aria-label="Cerrar popup" type="button" onclick={() => dialog.close()} title="cerrar" ><i class="icon-[fa-solid--times] absolute right-6 top-6 text-lg cursor-pointer text-orange-600 hover:text-orange-700 z-50"></i></button>
			<SvelteComponent {showFormData} {data} onclose={handleClose} onchange={passChangeEvent}></SvelteComponent>
		</div>
		<!-- svelte-ignore a11y_autofocus -->
	</div>
	{/if}
</dialog>

<style>
	/*dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}*/
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.90);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
