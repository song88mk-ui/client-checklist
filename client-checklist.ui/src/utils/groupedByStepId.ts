import Environment from '$enums/Environment';
import { type ClientStep } from '$api/response.DTO.model';
import type { ClientTaskFormType } from '$lib/ProductForm/validationSchema';

const groupedByStepId = (data: ClientStep[]) => {
	const grouped = data.reduce(
		(
			acc: {
				[key: number]: {
					[Environment.STAGING]: ClientTaskFormType | object;
					[Environment.PRODUCTION]: ClientTaskFormType | object;
				};
			},
			item
		) => {
			if (!acc[item.step]) {
				acc[item.step] = { [Environment.STAGING]: {}, [Environment.PRODUCTION]: {} };
			}
      const clientTaskFormData = {
        id: item.clientStepId,
        assignedTo: item.assignedTo,
        targetDateCompleted: item.targetDateCompleted,
        actualDateCompleted: item.actualDateCompleted,
        clientSubTasks: item.clientSubtasks,
      };

			if (item.environment === 0) {
				acc[item.step][Environment.STAGING] = clientTaskFormData;
			} else {
				acc[item.step][Environment.PRODUCTION] = clientTaskFormData;
			}
			return acc;
		},
		{}
	);

	return grouped;
};

export default groupedByStepId;
