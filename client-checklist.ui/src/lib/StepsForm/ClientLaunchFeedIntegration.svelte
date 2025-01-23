<script lang="ts">
	import APIGateway from '$api/APIGateway';
	import { type EditProductPayload } from '$api/request.DTO.model';
	import ProductForm, { type ProductFormType } from '../ProductForm';
	import steps from '$stores/steps';
	import Product from '$utils/client';
	import Alert from '../Alert.svelte';
	import type { ClientInformationFormType } from '../ClientInformationForm';

	import { servicesTypeId } from '$constants/services';
	import Environment from '$enums/Environment';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import Step from '$enums/Step';
	import auth from '$stores/auth';
	import selectedIntegration from '$stores/integration';
	import initialFormValues from '$constants/initialFormValues';
	import { goto } from '$app/navigation';


	const { createStep, updateStep } = APIGateway();
	const {
		back,
		step,
		isEdit = false,
		isSuperAdmin
	} = $props<{
		back: () => void;
		next: () => void;
		step: number;
		isSuperAdmin?: boolean;
		isEdit?: boolean;
	}>();

	const title = $steps[step].title;

	const finishFormButtonLabel = (): string => {
		return isSuperAdmin && isEdit ? 'Update' : isSuperAdmin && !isEdit ? 'Create' : 'Close';
	};

	console.log("ALL FORMS", $steps);

	const defaultValues = initialFormValues[$selectedIntegration][step];
	let initialValues = $steps[step].formData as ProductFormType || defaultValues;


	let error = $state('');
	let isLoading = $state(false);
	let message = $state('');
	let disabled = $state(false);
	const serviceStep = Step[$selectedIntegration];

	$effect(() => {
		disabled = isEdit && !isSuperAdmin;
	});

	const handleSubmit = async (values: ProductFormType) => {
		if (disabled) {
			setTimeout(() => {
				goto('/');
			}, 3000);
			return;
		}

		isLoading = true;

		let response;
		if (values[Environment.PRODUCTION].id) {
			response = await handleEditProduct(values);
		} else {
			response = await handleCreateProduct(values);
		}

		if (response.error) {
			error = ErrorMessages.CreateProductFailed;
			isLoading = false;
			return;
		}

		setTimeout(() => {
			goto('/');
		}, 3000);

		if (response.data) {
			$steps[step].formData = {
				[Environment.PRODUCTION]: {
					id: response.data.id,
					...values[Environment.PRODUCTION]
				}
			};
		}
	};

	const handleCreateProduct = async (values: ProductFormType) => {
		const clientFormData = $steps[serviceStep.ClientInformation].formData;
		const productionProduct = createStep(
			{
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: serviceStep.ClientLaunch,
				stepName: '',
				serviceTypeId: servicesTypeId[$selectedIntegration],
				environment: 1,
				...values[Environment.PRODUCTION]
			},
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		const response = await productionProduct;
		if (response.message === 'Success' && response.statusCode === 100) {
			message = `${Product[$selectedIntegration]} has been successfully created`;
		}
		return response;
	};

	const handleEditProduct = async (values: ProductFormType) => {
		const productionProduct = updateStep(
			{
				...values[Environment.PRODUCTION],
				stepName: ''
			} as EditProductPayload,
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		const response = await productionProduct;
		if (response.message === 'Success' && response.statusCode === 100) {
			message = `${Product[$selectedIntegration]} has been successfully updated`;
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

<div class="cc-client-launch">
	<ProductForm isLaunch={true} finishFormButtonLabel={finishFormButtonLabel()} {title} {initialValues} {back}
							 {isLoading} {disabled} onSubmit={handleSubmit} dataKeys={["bet-validation","sports"]}/>

</div>
