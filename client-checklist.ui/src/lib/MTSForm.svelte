
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
                subtaskName: 'Max Bet',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
            {
                subtaskName: 'Max Bet(Client)',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
            {
                subtaskName: 'Max Payout',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
            {
                subtaskName: 'Max Payout(Client)',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
            {
                subtaskName: 'Player CCF and Groupings',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
            {
                subtaskName: 'Player CCF and Groupings(Client)',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
            {
                subtaskName: 'Bet Validation',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
            {
                subtaskName: 'Bet Validation(Client)',
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