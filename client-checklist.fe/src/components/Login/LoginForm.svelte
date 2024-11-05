<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import Icon from "@iconify/svelte";
  import PasswordInput from "../PasswordInput.svelte";
  import validationSchema, { type LoginFormType } from "./validationSchema";
  import {errorMessage,isLoginLoading} from '../../stores/login'
  import {onSubmit} from './auth'

  let error = "";
  let isLoading = false;
  let initialValues: LoginFormType = {
    username: "",
    password: "",
    rememberMe: false,
  };

  errorMessage.subscribe((value:any) => {
    error = value;
  }) 

  isLoginLoading.subscribe((value:any) => {
    isLoading = value;
  })

  const handleRemoveError = () => {
    error = "";
  };

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues,
    validationSchema,
    onSubmit,
  });
</script>

<form on:submit={handleSubmit} class="flex flex-col gap-4">
  <div>
    <div class="relative flex items-center border rounded w-full">
      <Icon icon="mdi:user" class="absolute ml-2 text-blue-600" height={22} />
      <input
        id="username"
        name="text"
        placeholder="Enter Username"
        class="block w-full py-3 pr-3 pl-10 text-sm"
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

  {#if error}
    <div
      class="bg-red-100 text-red-700 px-4 py-3 rounded relative text-sm"
      role="alert"
    >
      <span class="block sm:inline">{error}</span>
      <button
        type="button"
        class="absolute top-0 bottom-0 right-0 px-4 py-3"
        on:click={handleRemoveError}
        aria-label="Close alert"
      >
        <Icon icon="mdi:close" height={22} class="fill-current text-red-500" />
      </button>
    </div>
  {/if}

  <button
    class="w-full bg-blue-600 hover:bg-blue-800 text-sm text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center disabled:bg-blue-400"
    type="submit"
    disabled={isLoading}
  >
    {#if isLoading}
      <Icon icon="mdi:loading" class="animate-spin" height={22} />
    {:else}
      Login
    {/if}
  </button>
</form>
