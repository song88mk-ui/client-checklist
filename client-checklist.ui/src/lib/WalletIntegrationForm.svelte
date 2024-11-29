
<script lang="ts">
	import { ClientRowStatus } from "$enums/ClientRowStatus";
	import Environment from "$enums/Environment";
	import selectedIntegration from '$stores/integration';
	import ProductForm, { type ProductFormType } from "./ProductForm";
	import { INTEGRATION_STEPS } from "./ProgressStep/const";
    
    const { step, next, back } = $props()

	const steps = INTEGRATION_STEPS[$selectedIntegration];
	const title = steps[step].title;

    const walletIntegrationValues = {
        assignedTo: '',
        targetDateCompleted: ''                                                                                                                                                          ,
        actualDateCompleted: '',
        clientSubTasks: [
            {
                subtaskName: 'Authentication',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
            {
                subtaskName: 'Bet Placement',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
            {
                subtaskName: 'Bet Full Cashout',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
            {
                subtaskName: 'Bet Cancellation',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
            {
                subtaskName: 'Bet Settlement',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
            {
                subtaskName: 'Bet Resettlement',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
        ]
    }
    const initialValues = {
        [Environment.STAGING]: walletIntegrationValues,
        [Environment.PRODUCTION]: walletIntegrationValues
    }

    const handleSubmit = (values: ProductFormType) => {
        next()
    }
</script>

<ProductForm {title} {initialValues} {back} onSubmit={handleSubmit}/>