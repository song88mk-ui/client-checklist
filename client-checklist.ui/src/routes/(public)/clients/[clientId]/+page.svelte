<script lang="ts">
	import { onMount } from 'svelte';
	import APIGateway from '$api/APIGateway';
	import { page } from '$app/stores';
    import CompanyLogo from '$lib/CompanyLogo.svelte';
	import ClientDetails from './ClientDetails.svelte';
	import ClientTaskComponent from './ClientTask.svelte';
	import ClientProgressBar from './ClientProgressBar.svelte';
	import { type ClientInformation, type ClientTask, type ClientProgressStatus } from './types';

	const { clientId } = $page.params;
    const { searchParams } = $page.url;

    let queryToken = searchParams.get('token')

	const { getClientTaskStatus } = APIGateway();
	let client: ClientInformation | null = $state(null);
	let clientProgess: ClientProgressStatus = $state({
		notStarted: 0,
		inProgress: 0,
		completed: 0
	});
	let error: any = $state({});
	let loading = true;

	function calculatePercentage(items: any, itemToCheck: any):number {
		if (!Array.isArray(items) || items.length === 0) {
			return 0;
		}
		const totalItems = items.length;
		const itemCount = items.reduce((count, item) => {
			return item === itemToCheck ? count + 1 : count;
		}, 0);
		const percentage = (itemCount / totalItems) * 100;
		return percentage;
	}

	function calculateProgress(clientTask: ClientTask[]) {
		const clientProgressStatus = clientTask.map((item) => item.sortOrder);
		const notStarted = calculatePercentage(clientProgressStatus,0)
        const inProgress = calculatePercentage(clientProgressStatus,1)
		const completed = calculatePercentage(clientProgressStatus,2)
        clientProgess = {
            notStarted,
            inProgress,
            completed,
        }   
	}

	onMount(async () => {
		try {
			const response = await getClientTaskStatus({ clientId,token: queryToken ? queryToken : '' });
			if(response?.error){
				error = response.error
				return
			}
			loading = false;
			let res: any = response?.data;
			client = {
				...res?.client,
                // clientTasks: res?.clientTasks
				clientTasks: [
					{
						clientTaskId: 0,
						clientId: 'string',
						taskId: 0,
						taskName: 'string',
						serviceTypeId: 0,
						targetDateCompleted: 'string',
						actualDateCompleted: 'string',
						assignedTo: 'string',
						sortOrder: 0,
						environment: 0,
						subTasks: [
							{
								subtaskId: 0,
								subtaskName: 'string',
								comment: 'string',
								taskStatusId: 0,
								clientTaskStatusId: 0,
								sortOrder: 1
							},
                            {
								subtaskId: 0,
								subtaskName: 'string',
								comment: 'string',
								taskStatusId: 0,
								clientTaskStatusId: 0,
								sortOrder: 0
							},
                            {
								subtaskId: 0,
								subtaskName: 'string',
								comment: 'string',
								taskStatusId: 0,
								clientTaskStatusId: 0,
								sortOrder: 0
							}
						]
					},
					{
						clientTaskId: 0,
						clientId: 'string',
						taskId: 0,
						taskName: 'string',
						serviceTypeId: 0,
						targetDateCompleted: 'string',
						actualDateCompleted: 'string',
						assignedTo: 'string',
						sortOrder: 1,
						environment: 0,
						subTasks: [
							{
								subtaskId: 0,
								subtaskName: 'string',
								comment: 'string',
								taskStatusId: 0,
								clientTaskStatusId: 0,
								sortOrder: 0
							}
						]
					},
					{
						clientTaskId: 0,
						clientId: 'string',
						taskId: 0,
						taskName: 'string',
						serviceTypeId: 0,
						targetDateCompleted: 'string',
						actualDateCompleted: 'string',
						assignedTo: 'string',
						sortOrder: 2,
						environment: 0,
						subTasks: [
							{
								subtaskId: 0,
								subtaskName: 'string',
								comment: 'string',
								taskStatusId: 0,
								clientTaskStatusId: 0,
								sortOrder: 0
							}
						]
					}
				]
			};
			if (client && client.clientTasks.length > 0) {
				calculateProgress(client?.clientTasks);
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
	<nav class="flex flex-1 items-center justify-between">
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
				<button>
					<!-- <Icon icon="mdi:logout" height={24} /> -->
				</button>
			</div>
	</nav>
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
			LaunchDate={new Date(client?.targetLaunchDate).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		/>
		<ClientProgressBar
			InProgress={clientProgess.inProgress}
			NotStarted={clientProgess.notStarted}
			Completed={clientProgess.completed}
		/>
		{#if client.clientTasks.length > 0}
			{#each client.clientTasks as clientTask}
				<ClientTaskComponent {clientTask} />
			{/each}
		{/if}
	</div>
{/if}
