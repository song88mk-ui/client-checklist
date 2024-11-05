<script lang="ts">
  import LoginForm from "./LoginForm.svelte";
  import CompanyLogo from "../CompanyLogo.svelte";
</script>

<div
  class="shadow bg-white border rounded-md p-6 w-[442px] mx-auto gap-4 flex flex-col"
>
  <div class="flex justify-center">
    <CompanyLogo />
  </div>

  <LoginForm/>
</div>
