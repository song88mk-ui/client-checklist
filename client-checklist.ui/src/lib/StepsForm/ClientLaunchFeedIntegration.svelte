<script lang="ts">
	import { goto } from '$app/navigation';
	import { type EditProductPayload } from '$api/request.DTO.model';
	import Environment from '$enums/Environment';
	import { type ProductFormType } from '../ProductForm';
	import ProductFormProd from '../ProductForm/ProductFormProd.svelte';

	import steps from '$stores/steps';
	import auth from '$stores/auth';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import Alert from '../Alert.svelte';
	import Step from '$enums/Step';
	import APIGateway from '$api/APIGateway';
	import type { ClientInformationFormType } from '../ClientInformationForm';
	import { servicesTypeId } from '$constants/services';
	import selectedIntegration from '$stores/integration';

	const { createStep, updateStep } = APIGateway();
	const { back, step, isSuperAdmin, isEdit = false } = $props<{
		back: () => void;
		next: () => void;
		step: number;
        isSuperAdmin: boolean;
        isEdit?: boolean;
	}>();

	const title = $steps[step].title;
    
    const finishFormButtonLabel = (): string => {
        return isSuperAdmin && isEdit ? 'Update' : isSuperAdmin && !isEdit ? 'Create' : 'Close';
    }

	const TASKS: Record<number, ProductFormType> = {
		// 8: $steps[step].formData as ProductFormType || {
		// 	[Environment.STAGING]: ClientLaunchValuesWalletIntegration,
		// 	[Environment.PRODUCTION]: ClientLaunchValuesWalletIntegration
		// },
		// 7: $steps[step].formData as ProductFormType || {
		// 	[Environment.STAGING]: ClientLaunchValuesBetValidation,
		// 	[Environment.PRODUCTION]: ClientLaunchValuesOddsFeedAndLive
		// },
		// 6: $steps[step].formData as ProductFormType || {
		// 	[Environment.PRODUCTION]: BAValuesFeedIntegration
		// },
		// 4: $steps[step].formData as ProductFormType || {
		// 	[Environment.PRODUCTION]: EndToEndTestValuesFeedIntegration
		// }
	};
	let initialValues = TASKS[step];


	let error = $state('');
	let isLoading = $state(false);
	let message = $state('');
	const serviceStep = Step[$selectedIntegration];

	const handleSubmit = async (values: ProductFormType) => {
		isLoading = true;

		let response;
		if (values[Environment.STAGING].id && values[Environment.PRODUCTION].id) {
			response = await handleEditProduct(values);
		} else {
			response = await handleCreateProduct(values);
		}

		isLoading = false;

		if (response.some((res) => res.error)) {
			error = ErrorMessages.CreateProductFailed;
			return;
		}

		const [stagingResponse, productionResponse] = response;

		if (stagingResponse.data && productionResponse.data) {
			$steps[step].formData = {
				[Environment.STAGING]: {
					id: stagingResponse.data.id,
					...values[Environment.STAGING]
				},
				[Environment.PRODUCTION]: {
					id: productionResponse.data.id,
					...values[Environment.PRODUCTION]
				}
			};
		}
	};

	const handleCreateProduct = async (values: ProductFormType) => {
		const clientFormData = $steps[serviceStep.ClientInformation].formData;
		const stagingProduct = createStep(
			{
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: step,
				stepName: '',
				serviceTypeId: servicesTypeId[$selectedIntegration],
				environment: 0,
				...values[Environment.STAGING]
			},
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		const productionProduct = createStep(
			{
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: step,
				stepName: '',
				serviceTypeId: servicesTypeId[$selectedIntegration],
				environment: 1,
				...values[Environment.PRODUCTION]
			},
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		const response = await Promise.all([stagingProduct, productionProduct]);
		if (response.some((res) => res.message === 'Success' && res.statusCode === 100)) {
			message = 'The account has been successfully created';
			setTimeout(() => {
				goto('/');
			}, 3000);
		}
		return response;
	};

	const handleEditProduct = async (values: ProductFormType) => {
		const stagingProduct = updateStep({
			...values[Environment.STAGING],
			stepName: ''
		} as EditProductPayload, {
			'x-user-token': $auth?.userToken as string
		});
		const productionProduct = updateStep({
				...values[Environment.PRODUCTION],
				stepName: ''
			} as EditProductPayload, {
				'x-user-token': $auth?.userToken as string
			}
		);

		const response = await Promise.all([stagingProduct, productionProduct]);
		if (response.some((res) => res.message === 'Success' && res.statusCode === 100)) {
			message = 'The account has been successfully updated';
			setTimeout(() => {
				goto('/');
			}, 3000);
		}
		return response;
	};

	$effect(() => {
		if (error) {
			setTimeout(() => {
				error = '';
			}, 5000);
		}
	});
</script>

{#if error}
	<div class="mb-5">
		<Alert variant="error" message={error} hasCloseButton={false} />
	</div>
{/if}

{#if message}
	<div class="mb-5">
		<Alert variant="success" {message} hasCloseButton={false} />
	</div>
{/if}

<ProductFormProd finishFormButtonLabel={finishFormButtonLabel()} {step} {title} {initialValues} {back} {isLoading} onSubmit={handleSubmit} />

