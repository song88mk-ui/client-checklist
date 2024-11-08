<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import auth from '$stores/auth';
	import Role from '$enums/role';

	let hasAccess = false;
	export let allowedRoles: Role[] = [];

	if (browser) {
		if (!$auth) {
			goto('/not-authorized');
		} else {
			hasAccess = allowedRoles.includes($auth.role);

			if (!hasAccess) {
				goto('/not-authorized');
			}
		}
	}
</script>

{#if hasAccess}
	<slot />
{/if}
