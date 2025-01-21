<script lang="ts">
	import { type EditProductPayload } from '$api/request.DTO.model';
	import { EndToEndTestValuesWalletIntegration } from '$constants/productFormValues';
	import Environment from '$enums/Environment';
	import ProductForm, { type ProductFormType } from '../ProductForm';
	import steps from '$stores/steps';
	import auth from '$stores/auth';
	import { ErrorMessages } from '$enums/ErrorMessages';
	import Alert from '../Alert.svelte';
	import Step from '$enums/Step';
	import APIGateway from '$api/APIGateway';
	import type { ClientInformationFormType } from '../ClientInformationForm';
	import { servicesTypeId } from '$constants/services';
	import selectedIntegration from '$stores/integration';
	import { AccessType } from '$enums/role';

	const { createStep, updateStep } = APIGateway();
	const {
		back,
		next,
		step,
		isEdit = false
	} = $props<{
		back: () => void;
		next: () => void;
		step: number;
		isEdit?: boolean;
	}>();

	const title = $steps[step].title;

	let initialValues = $steps[step].formData as ProductFormType || {
		[Environment.STAGING]: EndToEndTestValuesWalletIntegration,
		[Environment.PRODUCTION]: EndToEndTestValuesWalletIntegration
	};

	let error = $state('');
	let isLoading = $state(false);
	let disabled = $state(false);
	const serviceStep = Step[$selectedIntegration];

	$effect(() => {
		disabled = isEdit && AccessType.READWRITE !== $auth?.accessType;
	});

	const handleSubmit = async (values: ProductFormType) => {
		if (disabled) {
			next();
			return;
		}

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
		next();
	};

	const handleCreateProduct = async (values: ProductFormType) => {
		const clientFormData = $steps[serviceStep.ClientInformation].formData;
		const stagingProduct = createStep(
			{
				clientId: (clientFormData as ClientInformationFormType).clientId || '',
				stepId: serviceStep.EndToEndFunctionalPerformanceTest,
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
				stepId: serviceStep.EndToEndFunctionalPerformanceTest,
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

		return response;
	};

	const handleEditProduct = async (values: ProductFormType) => {
		const stagingProduct = updateStep(
			{
				...values[Environment.STAGING],
				stepName: ''
			} as EditProductPayload,
			{
				'x-user-token': $auth?.userToken as string
			}
		);
		const productionProduct = updateStep(
			{
				...values[Environment.PRODUCTION],
				stepName: ''
			} as EditProductPayload,
			{
				'x-user-token': $auth?.userToken as string
			}
		);

		const response = await Promise.all([stagingProduct, productionProduct]);

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

<ProductForm {title} {initialValues} {back} {disabled} onSubmit={handleSubmit} />
