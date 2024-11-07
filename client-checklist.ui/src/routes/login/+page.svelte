<script lang="ts">
    import Button from '$lib/Button.svelte';
    let username = "";
    let password = "";
    let error = "";
    let showPassword = false;

    const togglePassword = () => {
      showPassword = !showPassword;
    };

</script>

<div class="flex-1 content-center h-[100svh]">
  <div
  class="shadow bg-white border rounded-md p-6 w-[442px] mx-auto gap-4 flex flex-col"
>
  <div class="flex justify-center">
    <img src="/logo.svg" width="200" alt="logo" />
  </div>

  <form on:submit={()=>{}} class="flex flex-col gap-4">
    <div>
      <div class="relative flex items-center border rounded w-full">
        <img src="/person.svg"  alt="person" class="absolute ml-2 text-blue-600" />
        <input
          name="username"
          type="text"
          placeholder="Enter Username"
          class="block w-full py-3 pr-3 pl-10 text-sm"
          bind:value={username}
        />
      </div>
      <!-- {#if $errors.username}
        <small class="text-red-500">{$errors.username}</small>
      {/if} -->
    </div>
  
    <div>
      <div class="relative flex items-center border rounded w-full">
        <img src="/lock.svg"  alt="lock" class="absolute ml-2 text-blue-600" />
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          class="block w-full py-3 px-10 text-sm"
          bind:value={password}
        />
        <div on:click={togglePassword} role="presentation" class="cursor-pointer">
          <!-- <Icon
            icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
            class="absolute mx-2 my-3 text-blue-600 right-0 top-0"
            height={22}
          /> -->
        </div>
      </div>      <!-- {#if $errors.password}
        <small class="text-red-500">{$errors.password}</small>
      {/if} -->
    </div>
  
    <label class="cursor-pointer flex items-center">
      <input type="checkbox"/>
      <small class="font-semibold ml-2 text-slate-500">Remember Me</small>
    </label>
  
    {#if error}
      <div
        class="bg-red-100 text-red-700 px-4 py-3 rounded relative text-sm"
        role="alert"
      >
        <span class="block sm:inline">{"error"}</span>
        <Button type="button" classNames="absolute top-0 bottom-0 right-0 p-3" ariaLabel="Close alert" click={() => {}}>Testing</Button>
      </div>
    {/if}
  
    <Button 
        type="submit" 
        classNames="w-full bg-blue-600 hover:bg-blue-800 text-sm text-white font-semibold py-3 px-4 rounded-full flex items-center justify-center disabled:bg-blue-400"
        disabled={true} >
        Login
    </Button>

  </form>
  
</div>



</div>