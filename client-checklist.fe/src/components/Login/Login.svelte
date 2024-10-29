<script lang="ts">
  import LoginForm from "./LoginForm.svelte";
  import { type LoginFormType } from './validationSchema';
  import Icon from '@iconify/svelte';

  let initialValues = {
    username: "",
    password: "",
    rememberMe: false,
  }
  let errorMessage = "";
  let showError = false;
  let isLoading = false;

  const handleLogin = async (values: LoginFormType) => {
    isLoading = true;
    showError = false;
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      isLoading = true;
    } catch (error: any) {
      errorMessage = error.message;
      showError = true;
    }
    isLoading = false;
  }
  const handleRemoveError = () => {
    showError = false;
  }
</script>

<div class="border rounded p-5 w-[400px] mx-auto gap-4 flex flex-col">
  <div class="flex justify-center">
    <img src="./assets/logo.svg" alt="logo" />
  </div>

  {#if errorMessage && showError}
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">Holy smokes!</strong>
    <span class="block sm:inline">{errorMessage}</span>
    <button type="button" class="absolute top-0 bottom-0 right-0 px-4 py-3" on:click={handleRemoveError} aria-label="Close alert">
      <Icon icon="mdi:close" class="fill-current h-6 w-6 text-red-500" />
    </button>
  </div>
  {/if}

  <LoginForm initialValues={initialValues} onSubmit={handleLogin} isLoading={isLoading} />
</div>
