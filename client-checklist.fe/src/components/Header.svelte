<script lang="ts">
  import { Link } from "svelte-routing";
  import { auth, removeAuth } from "../stores/auth";
  import CompanyLogo from "./CompanyLogo.svelte";
  import Icon from "@iconify/svelte";
  import Role from "../enums/role";
  import CreateClientDropdown from "./CreateClientDropdown.svelte";

  let handleLogout = () => {
    removeAuth();
  };
</script>

<header class="flex items-center p-5 shadow-md bg-white">
  <h1 class="mr-3">
    <Link to="/">
      <CompanyLogo size={136} />
    </Link>
  </h1>
  <nav class="flex-1 flex items-center justify-between">
    <div></div>
    {#if $auth}
      <div class="flex items-center gap-3">
        {#if $auth.role === Role.ADMIN}
          <CreateClientDropdown />
        {/if}
        <div class="flex items-center gap-3">
          <div class="flex-1 text-sm text-right">
            <div class="text-blue-600 font-semibold capitalize">
              Janina Mencero
            </div>
            <div class="text-xs italic capitalize">{$auth.role}</div>
          </div>
          <div
            class="rounded-full w-8 h-8 bg-pink-500 flex items-center justify-center text-white"
          >
            J
          </div>
        </div>
        {#if $auth.role === Role.ADMIN}
          <button on:click={handleLogout}>
            <Icon icon="mdi:logout" height={24} />
          </button>
        {/if}
      </div>
    {/if}
  </nav>
</header>
