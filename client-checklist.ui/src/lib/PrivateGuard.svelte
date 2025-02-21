<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import auth from '$stores/auth';
	import { LocalStorage } from './storage';

	$: if (browser && (!$auth?.userToken && !LocalStorage.getValue('userToken'))) {
		goto('/login');
	} else {
        if (LocalStorage.getValue('userToken')) {
            $auth = {
                username: LocalStorage.getValue('username'),
                userToken: LocalStorage.getValue('userToken'),
                accessType: LocalStorage.getValue('accessType'),
            };
        }
    }
</script>

{#if $auth}
	<slot />
{:else}
	<div class="h-full flex items-center justify-center">Authenticating...</div>
{/if}
