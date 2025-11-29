<script>
  import { page } from '$app/state';
  import { onDestroy } from 'svelte';
  import ThemeHandler from './darkThemeHandler.svelte';
  import LeftMenu from './leftMenu.svelte';
  import LeftMenuHamburger from './leftMenuHamburger.svelte';
  import UserMenu from './userMenu.svelte';
  import { NotificationsMenu } from 'svelte-firebase';
  import { navigating } from '$app/state';
  import DashButtonSkeleton from './skeletonLoaders/dashButtonSkeleton.svelte';
  import TextSkeleton from './skeletonLoaders/textSkeleton.svelte';
  import AgGridSkeleton from './skeletonLoaders/agGridSkeleton.svelte';
  import UpdateHandler from './updateHandler.svelte';
  import { dark } from './theme-store.js';
  
  
  let { data, children, CenterElement, RightElement, user, userPoolId='', notifications=false, AditionalMenuLinks=null, firebaseConfig={} } = $props();

  let darkMode = $state(false);
	//Para tema oscuro
	const unsubscribeDarkTheme = dark.subscribe(value => {
		darkMode = value;
	});
  onDestroy(unsubscribeDarkTheme);

  let showMobileMenu = $state(false);

</script>


<div id="mainContent" class="flex flex-[0_0_100%] min-h-full max-w-full place-items-stretch bg-gray-100 dark:bg-gray-900">
  <LeftMenu menu={data.menuConfig} appName={data.appName} bind:showMobileMenu />
  <!-- Right sidebar -->
  <aside id="rightSidebar" class="flex fixed inset-y-0 right-0 z-20 flex-shrink-0 w-0 mt-16 overflow-y-auto bg-white dark:bg-gray-800 transition-all ease-in-out">
    <div class="py-4 text-gray-800 dark:text-gray-100 flex flex-auto flex-col">
      
    </div>
  </aside>
  <div class="flex flex-col flex-1 min-w-0">
    <header class="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
      <div class="flex items-center justify-between px-6 mx-auto text-app-600 dark:text-app-300">
        <LeftMenuHamburger />
        <!-- MiddleHeadText -->
        <div class="flex justify-center flex-1 lg:mr-32">
          {@render CenterElement()}
        </div>
        <ul class="flex items-center flex-shrink-0 space-x-4">
          {@render RightElement()}
          <li>
            <UpdateHandler />
          </li>
          <li>
            <ThemeHandler />
          </li>
          <!-- Notifications menu -->
          {#if notifications}
            <li>
              <NotificationsMenu {darkMode} appName={data.appName} config={firebaseConfig} />
            </li>
          {/if}
          <li>
            <UserMenu dest={page.url.pathname.split('/')[1]} {userPoolId} backendPath={data.backendPath} {user} {AditionalMenuLinks}/>
          </li>
        </ul>
      </div>
    </header>
    <main class="flex flex-auto overflow-y-auto place-items-stretch bg-dingley-100 dark:bg-dingley-900 {showMobileMenu?'opacity-50':''}">
      <!-- Main content -->
      <div class="flex flex-auto flex-col place-items-stretch max-w-full">
        {#if !navigating.to}
          {@render children?.()}
        {:else}
          <section class="flex p-6 flex-auto flex-col place-items-stretch">
            <div class="flex flex-auto flex-col place-items-stretch max-w-full">
              <DashButtonSkeleton />
              <TextSkeleton />
              <AgGridSkeleton />
            </div>
          </section>
        {/if}
      </div>
        <!-- Fin seccion de datos -->
    </main>
  </div>
</div>
