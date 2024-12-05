
<script lang="ts">
	import { ClientRowStatus } from "$enums/ClientRowStatus";
	import Environment from "$enums/Environment";
	import selectedIntegration from '$stores/integration';
	import ProductForm, { type ProductFormType } from "./ProductForm";
	import { INTEGRATION_STEPS } from "./ProgressStep/const";
    
    const { step, next, back } = $props()

	const steps = INTEGRATION_STEPS[$selectedIntegration];
	const title = steps[step].title;

    const sportsbookPlayerSiteValues = {
        assignedTo: '',
        targetDateCompleted: ''                                                                                                                                                          ,
        actualDateCompleted: '',
        clientSubTasks: [
            {
                subtaskName: 'Color Schemes / Themes',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            },
            {
                subtaskName: 'New Player Site Features',
                comment: '',
                taskStatusId: ClientRowStatus.NotStarted,
                assignedTo: ''
            }
        ]
    }
    const initialValues = {
        [Environment.STAGING]: sportsbookPlayerSiteValues,
        [Environment.PRODUCTION]: sportsbookPlayerSiteValues
    }

    const handleSubmit = (values: ProductFormType) => {
        next()
    }
</script>

<ProductForm {title} {initialValues} {back} onSubmit={handleSubmit}/>