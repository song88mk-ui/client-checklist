import { ClientRowStatus } from '$enums/ClientRowStatus';
import type { ProductFormType } from '$lib/ProductForm/validationSchema';

const hasIncompleteSubtask = (formData: ProductFormType): boolean => {
	let isIncomplete = false;

	Object.values(formData).forEach((data) => {
		if (data.clientSubTasks) {
			if (
				!data.clientSubTasks.every(
					(task) =>
						task.taskStatusId === ClientRowStatus.Completed ||
						task.taskStatusId === ClientRowStatus.NotApplicable
				)
			) {
				isIncomplete = true;
				return;
			}
		}
	});

	return isIncomplete;
};

export default hasIncompleteSubtask;
