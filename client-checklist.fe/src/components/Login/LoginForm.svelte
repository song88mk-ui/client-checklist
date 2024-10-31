<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import Icon from "@iconify/svelte";
  import PasswordInput from "../PasswordInput.svelte";
  import validationSchema, { type LoginFormType } from "./validationSchema";

  export let initialValues: LoginFormType = {
    username: "",
    password: "",
    rememberMe: false,
  };
  export let isLoading = false;
  export let onSubmit: (values: LoginFormType) => Promise<void>;

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues,
    validationSchema,
    onSubmit,
  });
</script>

<form on:submit={handleSubmit} class="flex flex-col gap-3">
  <div>
    <div class="relative flex items-center border rounded w-full">
      <Icon icon="mdi:user" class="absolute ml-2 text-blue-600" />
      <input
        id="username"
        name="text"
        placeholder="Enter Username"
        class="block w-full py-2 pr-3 pl-8"
        on:change={handleChange}
        bind:value={$form.username}
      />
    </div>
    {#if $errors.username}
      <small class="text-red-500">{$errors.username}</small>
    {/if}
  </div>

  <div>
    <PasswordInput password={$form.password} onChange={handleChange} />
    {#if $errors.password}
      <small class="text-red-500">{$errors.password}</small>
    {/if}
  </div>

  <label class="cursor-pointer flex items-center">
    <input
      type="checkbox"
      bind:checked={$form.rememberMe}
      on:click={() => ($form.rememberMe = !$form.rememberMe)}
    />
    <small class="font-semibold ml-2 text-slate-500">Remember Me</small>
  </label>

  <button
    class="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center disabled:bg-blue-400"
    type="submit"
    disabled={isLoading}
  >
    {#if isLoading}
      <Icon icon="mdi:loading" class="animate-spin" height={24} />
    {:else}
      Login
    {/if}
  </button>
</form>
