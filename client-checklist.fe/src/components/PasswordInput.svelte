<script lang="ts">
  import Icon from '@iconify/svelte';
  import { createEventDispatcher } from 'svelte';
  
  let showPassword = false;
  export let password = '';
  export let onChange = (event: Event) => event;
  export let onBlur = (event: Event) => event;

  const togglePassword = () => {
    showPassword = !showPassword;
  }
</script>

<div class="relative flex items-center border rounded w-full">
  <Icon icon="mdi:lock" class="absolute ml-2 text-blue-600" />
  <input
    name="password"
    type={showPassword ? "text" : "password"}
    placeholder="Enter Password"
    class="block w-full py-2 px-8"
    bind:value={password}
    on:change={onChange}
    on:blur={onBlur}
  />
  <div on:click={togglePassword} role="presentation" class="cursor-pointer">
    <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} class="absolute mx-2 my-3 text-blue-600 right-0 top-0" />
  </div>
</div>