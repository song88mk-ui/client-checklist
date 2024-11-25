<script lang="ts">
	import Environment from '$enums/Environment';

	let { environment = $bindable() } = $props<{ environment: Environment }>();

	const handleEnvironmentChange = (env: Environment) => {
		environment = env;
	};

	const isActiveEnvironment = (env: string) => {
		return environment === env ? 'bg-[#09387B] text-white' : 'bg-[#ECECEC] text-[#949090]';
	};
</script>

<div>
	<button
		class={`w-[100px] rounded-l-md ${isActiveEnvironment(Environment.STAGING)} py-3 text-sm font-semibold`}
		onclick={() => handleEnvironmentChange(Environment.STAGING)}>Staging</button
	><button
		class={`w-[100px] rounded-r-md ${isActiveEnvironment(Environment.PRODUCTION)} py-3 text-sm font-semibold`}
		onclick={() => handleEnvironmentChange(Environment.PRODUCTION)}>Production</button
	>
</div>
