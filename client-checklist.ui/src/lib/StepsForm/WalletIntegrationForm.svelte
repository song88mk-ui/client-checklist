<script lang="ts">
	import { type EditProductPayload } from '$api/request.DTO.model';
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
	import IntegrationType from '$enums/integrationType';
	import initialFormValues from '$constants/initialFormValues';
	import getOverallStatus from '$utils/getOverallStatus';
	import { toEditClientPayload } from '$mapper/ClientMapper';
	import hasIncompleteSubtask from '$utils/hasIncompleteSubtask';

	const { createStep, updateStep, updateClient } = APIGateway();
	const {
		back,
		next,
		step,
        isSuperAdmin,
		isEdit = false
	} = $props<{
		back: () => void;
		next: () => void;
		step: number;
		isSuperAdmin?: boolean;
		isEdit?: boolean;
	}>();

	const title = $steps[step].title;

	const defaultValues = initialFormValues[$selectedIntegration][step]
	let initialValues = ($steps[step].formData as ProductFormType) || defaultValues

	let isLoading = $state(false);
	let disabled = $state(false);
	const serviceStep = Step[IntegrationType.WALLET_INTEGRATION]

	$effect(() => {
		disabled = isEdit && !isSuperAdmin;
	});

	const handleSubmit = async (values: ProductFormType) => {
        $steps[step].error = null;

		if (disabled) {
			next();
			return;
		}

        const isClientCreation: boolean = !isEdit && isSuperAdmin && !values[Environment.STAGING]?.id && !values[Environment.PRODUCTION]?.id

        if (isClientCreation) {
            $steps[step].formData = {
				[Environment.STAGING]: {
					...values[Environment.STAGING]
				},
				[Environment.PRODUCTION]: {
					...values[Environment.PRODUCTION]
				}
			};

            next();
            return;
        }

		isLoading = true;

        const response = await handleEditProduct(values);

		isLoading = false;

		if (response.some((res) => res.error)) {
			$steps[step].error = ErrorMessages.CreateProductFailed;
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

			$steps[step].isIncomplete = hasIncompleteSubtask($steps[step].formData);

			const currentStatus = getOverallStatus($steps);
			const formData = $steps[serviceStep.ClientInformation].formData as ClientInformationFormType;
			
			const formattedData = {
				...toEditClientPayload($selectedIntegration, formData),
				taskStatus: currentStatus
			}
			if (formData.taskStatus !== currentStatus) {
				const response = await updateClient(formattedData, {
					'x-user-token': $auth?.userToken as string
				});

				$steps[serviceStep.ClientInformation].formData = {
					...formData,
					taskStatus: currentStatus
				};

				if (response.error) {
					$steps[step].error = ErrorMessages.UpdateClientFailed;
					return;
				}
			}
		}
		next();
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
</script>

{#if $steps[step].error}
	<div class="mb-5">
		<Alert variant="error" message={$steps[step].error} hasCloseButton={false} />
	</div>
{/if}

<ProductForm finishFormButtonLabel="Next" {title} {initialValues} {back} {disabled} onSubmit={handleSubmit} />
