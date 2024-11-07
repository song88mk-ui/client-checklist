<script lang="ts">
	import { goto } from '$app/navigation';
	
    function login() {
        goto('/dashboard');
    }
</script>

<div class="text-lg">This is the login page</div>
<a href="/dashboard">Dashboard</a>
<button on:click={login} aria-label="Login">Go to Dashboard</button>