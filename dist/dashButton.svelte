<script>
    /**
     * @typedef {Object} Props
     * @property {any} [href]
     * @property {any} [target]
     * @property {string} [icon]
     * @property {string} [iconSize]
     * @property {string} [upperText]
     * @property {string} [lowerText]
     * @property {any} [onclickfunction]
     * @property {any} [title]
     * @property {string} [direction]
     */

    /** @type {Props} */
    let {
        href = null,
        target = null,
        icon = '',
        iconSize = 'text-4xl',
        upperText = '',
        lowerText = '',
        onclickfunction = null,
        title = null,
        direction = 'flex-col md:flex-row'
    } = $props();

    const elementType = href!==null?'a':(onclickfunction!==null?'button':'div');
</script>
<svelte:element onclick={onclickfunction} this={elementType} {title} {target} {href} class="flex {direction} items-center px-1 md:px-4 py-2 bg-white rounded-lg {!href && !onclickfunction?'':'shadow-md'} dark:shadow-gray-700 dark:bg-gray-800" data-sveltekit-preload-data="off" data-sveltekit-preload-code="hover">
    <span class="w-12 h-12 flex justify-center items-center p-2 mb-2 md:mb-0 md:mr-2 bg-app-100 dark:bg-app-600 rounded-full">
        <i class="{iconSize} dark:text-app-100 text-app-500 {icon}"></i>
    </span>
    <div class="max-w-full">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400 break-normal overflow-wrap-anywhere">{upperText}</p>
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200 text-center break-normal overflow-wrap-anywhere">{lowerText}</p>
    </div>
</svelte:element>