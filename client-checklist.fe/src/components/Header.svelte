<script lang="ts">
  import { Link } from "svelte-routing";
  import { auth, removeAuth } from "../stores/auth";
  import CompanyLogo from "./CompanyLogo.svelte";
  import Icon from "@iconify/svelte";

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
        <Link
          class="flex-1 text-center inline-block bg-blue-600 hover:bg-blue-800 text-sm text-white font-semibold py-3 px-4 rounded items-center justify-center disabled:bg-blue-400"
          to="/clients/create">Create Client Account</Link
        >
        <div class="flex items-center gap-3">
          <div class="flex-1 text-sm text-right">
            <div class="text-blue-600 font-semibold capitalize">
              {$auth.fullName}
            </div>
            <div class="text-xs italic capitalize">{$auth.role}</div>
          </div>
          <div
            class="rounded-full w-8 h-8 bg-pink-500 flex items-center justify-center text-white"
          >
            J
          </div>
        </div>
        <button on:click={handleLogout}>
          <Icon icon="mdi:logout" height={24} />
        </button>
      </div>
    {/if}
  </nav>
</header>
