<script>
    /**
     * @typedef {Object} Props
     * @property {number} [number]
     */

    /** @type {Props} */
    let { number = 2 } = $props();
</script>
<div class="grid grid-cols-3 md:flex flex-row gap-4 flex-wrap justify-stretch text-center md:text-left">
    {#each Array(number) as item}
        <div class="skeleton-effect-wave bg-gray-200 dark:bg-gray-800 px-1 md:px-4 py-2 flex flex-row">
        <span class="w-12 h-12 flex justify-center items-center p-2 mb-2 md:mb-0 md:mr-2 bg-gray-300 dark:bg-gray-700 rounded-full">
            <i class="icon-[eos-icons--loading] text-4xl"></i>
        </span>
        <div class="flex flex-col gap-2 justify-center">
            <p class="w-44 h-4 bg-gray-300 dark:bg-gray-700"></p>
            <p class="w-44 h-4 bg-gray-300 dark:bg-gray-700"></p>
        </div>
        </div>
    {/each}
</div>