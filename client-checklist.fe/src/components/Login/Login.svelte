<script lang="ts">
  import "./Login.css";

  let username = "";
  let password = "";
  let showPassword = false;
  let errorMessage = "";
  let showError = false;
  let isLoading = false;

  async function handleLogin() {
    isLoading = true;
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      isLoading = true;
    } catch (error: any) {
      errorMessage = error.message;
      showError = true;
      // Hide the error message after 3 seconds
      setTimeout(() => {
        showError = false;
      }, 5000);
    }
    isLoading = false;
  }
  function togglePassword() {
    showPassword = !showPassword;
  }
</script>

<div class="login-container">
  <div class="logo">
    <img src="./assets/logo.svg" alt="logo" />
  </div>
  <div class="input-container">
    <img src="./assets/person.svg" alt="logo" class="left-icon" />
    <input type="text" placeholder="Enter Username" bind:value={username} />
  </div>
  <div class="input-container">
    <img src="./assets/lock.svg" alt="logo" class="left-icon" />
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter Password"
      bind:value={password}
    />
    <div on:click={togglePassword} role="presentation">
      <img src="./assets/password-eye.svg" alt="Eye Icon" class="right-icon" />
    </div>
  </div>

  <div class="check-remember">
    <input class="check-remember-input" type="checkbox" />
    <span>Remember Me</span>
  </div>

  {#if errorMessage && showError}
    <p class="error">{errorMessage}</p>
  {/if}

  <button on:click={handleLogin}>
    {#if isLoading}
      <div
        class="spinner"
        style="display: {isLoading ? 'block' : 'none'}"
      ></div>
    {/if}
    {#if !isLoading}
      Login
    {/if}
  </button>
</div>
