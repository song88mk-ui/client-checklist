<script lang="ts">
	import Role from '$enums/role';
	import RoleGuard from '$lib/RoleGuard.svelte';
	let { children } = $props();
</script>

<RoleGuard allowedRoles={[Role.ADMIN]}>
	{@render children()}
</RoleGuard>
