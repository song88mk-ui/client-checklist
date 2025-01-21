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
	import { type ClientInformation, type ClientStep, type ClientProgressStatus } from './types';
	import Environment from '$enums/Environment';
	import { LocalStorage } from '$lib/storage';
	import {DEFAULT_SERVICE_TEMPLATE} from './constant'

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
	let loading = true;

	function changeCurrEnvironment(selectedEnvironment: Environment){
		if(selectedEnvironment === Environment.STAGING){
			currEnvironment = Environment.STAGING
			return
		}
		currEnvironment = Environment.PRODUCTION
	}

	function calculatePercentage(items: any, itemToCheck: any):number {
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
			const taskProgress = item.clientSubtasks.map((clientSubtask) => clientSubtask.taskStatus);
			const totalPercentage = calculatePercentage(taskProgress,2)
			if(totalPercentage === 0) return 0
			if(totalPercentage > 0 && totalPercentage < 100) return 1
			if(totalPercentage === 100) return 2
		});

		clientProgress = {
			notStarted: calculatePercentage(clientProgressStatus, 0),
			inProgress: calculatePercentage(clientProgressStatus, 1),
			completed: calculatePercentage(clientProgressStatus, 2)
		};
	}
	function getClientTask(clientSteps: ClientStep[]):ClientStep[]{
		let newClientSteps = []
		if(client){
			newClientSteps = DEFAULT_SERVICE_TEMPLATE[client.serviceTypeId].map((templateClientStep:ClientStep)=>{
				const result = clientSteps.find((x)=> x.step ==templateClientStep.step)
				if(result){
					return result
				}
				return templateClientStep

			})
		}
		return newClientSteps
	}

	onMount(async () => {
		try {
			if (!LocalStorage.getValue('firstView')) {
				openModal(ClientOnBoarding);
				LocalStorage.setValue('firstView', 'true');
			}

			const response = await getClient(clientId, {
				'x-user-token': queryToken ? queryToken : ''
			});

			if (response?.error) {
				error = response.error;
                loading = false;
				return;
			}

			let res: any = response?.data;
			const clientSteps =  response?.data?.clientSteps.map((step: any) => {
                return {
                    ...step,
                    isExpanded: true
                }
            })

			client = {
				...res?.client,
				clientSteps
			};
            
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
		<a href="/">
			<CompanyLogo size={136} />
		</a>
	</h1>
</header>

<div class="cc-client-view-page">
    {#if error && !loading}
        <div class="w-[95vw] mt-[60px] flex flex-col items-center justify-center mx-auto">
            <img
                src="/icon-warning.svg"
                alt="icon-warning"
                class={"h-[76px] w-[76px] mb-[25px]"}
            />
            <div class="w-full text-center bg-[#FCF8E3] py-[18px]">
                <span class="block text-[#A68F64] font-[600] text-[32px] mb-[12px]">Site Disabled</span>
                <span class="block text-[#A68F64] font-[600] text-[23px]">This site has been disabled by the site administrator. Please contact your Administrator. </span>
            </div>
        </div>
    {/if}
    
    {#if client !== null && !loading}
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
                CurrEnvironment={currEnvironment}
                HandleChangeEnvironment={changeCurrEnvironment}
            />
            {#if currEnvironment === Environment.STAGING}
                {#each getClientTask(client.clientSteps.filter((clientStep) => clientStep.environment === 0)) as clientStep}
                    <ClientTaskComponent {clientStep}  />
                {/each}
            {/if}
            {#if currEnvironment === Environment.PRODUCTION}
                {#each getClientTask(client.clientSteps.filter((clientStep) => clientStep.environment === 1)) as clientStep}
                    <ClientTaskComponent {clientStep}  />
                {/each}
            {/if}
        </div>
    {/if}
</div>
