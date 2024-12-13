<script lang="ts">
	import { onMount } from 'svelte';
	import APIGateway from '$api/APIGateway';
	import { page } from '$app/stores';
	import CompanyLogo from '$lib/CompanyLogo.svelte';
	import services from '$constants/services';
	import ClientDetails from './ClientDetails.svelte';
	import ClientTaskComponent from './ClientTask.svelte';
	import ClientProgressBar from './ClientProgressBar.svelte';
	import ClientOnBoarding from './ClientOnBoarding.svelte';
	import { openModal } from '$stores/modal';
	import { DEFAULT_SERVICE_TEMPLATE } from './constant';
	import { type ClientInformation, type ClientStep, type ClientProgressStatus } from './types';
	import { LocalStorage } from '$lib/storage';

	const { clientId } = $page.params;
	const { searchParams } = $page.url;

	let queryToken = searchParams.get('token');

	const { getClientTaskStatus } = APIGateway();
	let client: ClientInformation | null = $state(null);
	let clientProgress: ClientProgressStatus = $state({
		notStarted: 0,
		inProgress: 0,
		completed: 0
	});
	let error: any = $state(null);
	let loading = true;

	function calculatePercentage(items: any, itemToCheck: any): number {
		if (!Array.isArray(items) || items.length === 0) {
			return 0;
		}
		const totalItems = items.length;
		const itemCount = items.reduce((count, item) => {
			return item === itemToCheck ? count + 1 : count;
		}, 0);

		return (itemCount / totalItems) * 100;
	}

	function calcClientStepProgress(clientSteps: ClientStep[]) {
		const clientProgressStatus = clientSteps.map((item) => {
			const taskProgress = item.clientSubtasks.map((clientSubtask) => clientSubtask.taskStatusId);
			const totalPercentage = calculatePercentage(taskProgress, 2);
			if (totalPercentage === 0) return 0;
			if (totalPercentage > 0 && totalPercentage < 100) return 1;
			if (totalPercentage === 100) return 2;
		});

		clientProgress = {
			notStarted: calculatePercentage(clientProgressStatus, 0),
			inProgress: calculatePercentage(clientProgressStatus, 1),
			completed: calculatePercentage(clientProgressStatus, 2)
		};
	}

	onMount(async () => {
		try {
			if (!LocalStorage.getValue('firstView')) {
				openModal(ClientOnBoarding);
				LocalStorage.setValue('firstView', 'true');
			}

			const response = await getClientTaskStatus(clientId, {
				'x-user-token': queryToken ? queryToken : ''
			});
			if (response?.error) {
				error = response.error;
				return;
			}
			loading = false;
			let res: any = response?.data;
			const clientSteps = DEFAULT_SERVICE_TEMPLATE[res?.client.serviceTypeId].map(
				(clientStep: any) => {
					if (res && res?.clientSteps.length > 0) {
						if (res?.clientSteps?.find((item: any) => item?.stepId === clientStep?.stepId)) {
							return res?.clientSteps?.find((item: any) => item?.stepId === clientStep?.stepId);
						}
					}
					return clientStep;
				}
			);
			client = {
				...res?.client,
				clientSteps: clientSteps
			};

			if (client && client.clientSteps.length > 0) {
				calcClientStepProgress(client?.clientSteps);
			}
		} catch (err: any) {
			error = err;
			loading = false;
		}
	});
</script>

<header class="flex items-center bg-white p-5 shadow-md">
	<h1 class="mr-3">
		<a href="/">
			<CompanyLogo size={136} />
		</a>
	</h1>
	<!-- <nav class="flex flex-1 items-center justify-between">
		<div></div>
			<div class="flex items-center gap-3">
				<div class="flex items-center gap-3">
					<div class="flex-1 text-right text-sm">
						<div class="font-semibold capitalize text-blue-600">test</div>
						<div class="text-xs capitalize italic">test</div>
					</div>
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white">
						J
					</div>
				</div>
			</div>
	</nav> -->
</header>

{#if error}
	<div>Client not found</div>
{/if}

{#if client !== null}
	<div class="flex-1 p-6">
		<ClientDetails
			CompanyName={client.clientName}
			Domain={client?.domain}
			LangSupported={client?.languages}
			CurrencySupported={client?.currencies}
			LaunchDate={new Date(client?.targetLaunchDate).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
			ServiceToProvide={services[client.serviceTypeId]}
		/>
		<ClientProgressBar
			InProgress={clientProgress.inProgress}
			NotStarted={clientProgress.notStarted}
			Completed={clientProgress.completed}
		/>
		{#if client.clientSteps.length > 0}
			{#each client.clientSteps as clientStep}
				<ClientTaskComponent {clientStep} />
			{/each}
		{/if}
	</div>
{/if}
