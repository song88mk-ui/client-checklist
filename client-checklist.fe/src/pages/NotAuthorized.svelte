<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Link } from "svelte-routing";
</script>

<div class="flex-1 flex flex-col items-center justify-center">
  <div class="text-center max-w-lg">
    <h1 class="text-3xl font-bold mb-3">Not Authorized</h1>
    <div class="mb-7">
      Sorry, you are not authorized to access this page. Please contact your
      administrator if you believe this is a mistake.
    </div>
    <div>
      <Link
        to="/"
        class="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded inline-flex items-center justify-center disabled:bg-blue-400"
      >
        <Icon icon="mdi:chevron-left" height={24} /> Back to Home
      </Link>
    </div>
  </div>
</div>
