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
	import {
		type ClientInformation,
		type ClientStep,
		type ClientProgressStatus,
		type ClientStepTemplate
	} from './types';
	import Environment from '$enums/Environment';
	import Device from '$enums/Device';

	import { LocalStorage } from '$lib/storage';
	import { DEFAULT_SERVICE_TEMPLATE } from './constant';

	const { clientId } = $page.params;
	const { searchParams } = $page.url;

	let queryToken = searchParams.get('token');

	const { getClient } = APIGateway();
	let client: ClientInformation | null = $state(null);
	let clientProgress: ClientProgressStatus = $state({
		notStarted: 0,
		inProgress: 0,
		completed: 0
	});
	let currEnvironment: Environment = $state(Environment.STAGING);
	let error: any = $state(null);
	let loading = $state(true);
	let targetDate = $state('');

	let device: Device = $state(Device.Desktop);

	function changeCurrEnvironment(selectedEnvironment: Environment) {
		if (selectedEnvironment === Environment.STAGING) {
			currEnvironment = Environment.STAGING;
			return;
		}
		currEnvironment = Environment.PRODUCTION;
	}

	function calculatePercentage(items: any) {
		const totalElements = items.length;
		const countOfNotStarted = items.filter((num: any) => num === 1).length;
		const countOfInProgress = items.filter((num: any) => num === 2).length;
		const countOfCompleted = items.filter((num: any) => num === 3).length;

		const percentageNotStarted = (countOfNotStarted / totalElements) * 100;
		const percentageInProgress = (countOfInProgress / totalElements) * 100;
		const percentageCompleted = (countOfCompleted / totalElements) * 100;

		clientProgress = {
			notStarted: percentageNotStarted,
			inProgress: percentageInProgress,
			completed: percentageCompleted
		};
	}

	function calcClientStepProgress(clientSteps: ClientStep[]) {
		const statusNotApplicable = 0;
		let allTask: any = [];
		clientSteps.map((item) => {
			if (
				item.environment === 1 &&
				item.clientSubtasks.length > 0 &&
				item.step === 7 &&
				item.serviceType === 2
			) {
				// remove prod bet validation
				const filteredTaskProgress = item.clientSubtasks.filter(
					(clientSubtask) => clientSubtask.subtaskName !== 'Bet Validation'
				);
				const taskProgress = filteredTaskProgress.map((clientSubtask) => clientSubtask.taskStatus);
				allTask.push(...taskProgress);
				return;
			}
			const taskProgress = item.clientSubtasks.map((clientSubtask) => clientSubtask.taskStatus);
			allTask.push(...taskProgress);
		});

		let result = allTask.filter((num: any) => num !== statusNotApplicable);

		calculatePercentage(result);
	}

	function getClientTask(env: number, clientSteps: ClientStep[]): ClientStepTemplate[] {
		if (!client) return [];
		let newClientSteps = DEFAULT_SERVICE_TEMPLATE[client.serviceTypeId];

		if (env === 0) {
			newClientSteps = newClientSteps.filter((x) => x.stepName !== 'Client Launch');
		}

		return newClientSteps.map((templateClientStep: ClientStepTemplate) => {
			const result = clientSteps.find((x) => x.step == templateClientStep.step);

			if (result) {
				return result;
			}

			return templateClientStep;
		});
	}
	onMount(async () => {
		if (window.innerWidth <= 768) {
			device = Device.Mobile;
		}
		try {
			if (!LocalStorage.getValue('firstView')) {
				openModal(ClientOnBoarding);
				LocalStorage.setValue('firstView', 'true');
			}

			const response = await getClient(clientId, {
				'x-client-token': queryToken ? queryToken : ''
			});

			if (response?.error) {
				error = response.error;
				loading = false;
				return;
			}

			let res: any = response?.data;
			const clientSteps = response?.data?.clientSteps.map((step: any) => {
				return {
					...step,
					isExpanded: true
				};
			});

			client = {
				...res?.client,
				clientSteps
			};

			// Get client launch staging odds feed
			const clientLaunchStagingOddsFeed = client?.clientSteps.find(
				(x) => x.serviceType == 2 && x.environment == 0 && x.step == 7
			);
			const betValidationSubTask = clientLaunchStagingOddsFeed?.clientSubtasks[0];

			client?.clientSteps.forEach((i) => {
				if (i.serviceType == 2 && i.step == 7 && i.environment == 1 && betValidationSubTask) {
					return { ...i, clientSubtasks: i.clientSubtasks.push(betValidationSubTask) };
				}
			});

			targetDate = client?.targetLaunchDate
				? new Date(client?.targetLaunchDate).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})
				: '';

			if (client && client.clientSteps.length > 0) {
				calcClientStepProgress(client?.clientSteps);
			}
			loading = false;
		} catch (err: any) {
			error = err;
			loading = false;
		}
	});
</script>

<header class="flex items-center bg-white p-5 shadow-md">
	<h1 class="mr-3">
		<CompanyLogo size={136} />
	</h1>
</header>

<div class="cc-client-view-page pb-[10px]">
	{#if error && !loading}
		<div class="mx-auto mt-[60px] flex w-[95vw] flex-col items-center justify-center">
			<img src="/icon-warning.svg" alt="icon-warning" class={'mb-[25px] h-[76px] w-[76px]'} />
			<div class="w-full bg-[#FCF8E3] py-[18px] text-center">
				<span class="mb-[12px] block text-[32px] font-[600] text-[#A68F64]">Site Disabled</span>
				<span class="block text-[23px] font-[600] text-[#A68F64]"
					>This site has been disabled by the site administrator. Please contact your Administrator.
				</span>
			</div>
		</div>
	{/if}

	{#if client !== null && !loading}
		<div class={`flex-1 ${device === Device.Desktop ? 'p-6' : ''}`}>
			<ClientDetails
				CompanyName={client.clientName}
				Domain={client?.domain}
				LangSupported={client?.languages}
				CurrencySupported={client?.currencies}
				LaunchDate={targetDate}
				ServiceToProvide={services[client.serviceTypeId]}
				CurrDevice={device}
			/>

			<ClientProgressBar
				InProgress={clientProgress.inProgress}
				NotStarted={clientProgress.notStarted}
				Completed={clientProgress.completed}
				CurrEnvironment={currEnvironment}
				HandleChangeEnvironment={changeCurrEnvironment}
				CurrDevice={device}
			/>
			{#if currEnvironment === Environment.STAGING}
				{#each getClientTask( 0, client.clientSteps.filter((clientStep) => clientStep.environment === 0) ) as clientStep}
					<ClientTaskComponent
						serviceTypeId={client.serviceTypeId}
						clientStep={clientStep as ClientStep}
						CurrDevice={device}
					/>
				{/each}
			{/if}
			{#if currEnvironment === Environment.PRODUCTION}
				{#each getClientTask( 1, client.clientSteps.filter((clientStep) => clientStep.environment === 1) ) as clientStep}
					<ClientTaskComponent
						serviceTypeId={client.serviceTypeId}
						clientStep={clientStep as ClientStep}
						CurrDevice={device}
					/>
				{/each}
			{/if}
		</div>
	{/if}
</div>
