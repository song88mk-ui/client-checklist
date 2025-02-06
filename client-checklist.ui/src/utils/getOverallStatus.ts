import { ClientRowStatus } from "$enums/ClientRowStatus";
import type { ClientSubTaskFormType } from "$lib/ProductForm/validationSchema";
import type Step from "$types/step";

const getOverallStatus = (steps: Step[]): ClientRowStatus => {
  
  // Remove client information
  const filteredSteps = steps.slice(1);
  
  const allStatuses = filteredSteps.flatMap(step => {
    if (!step.formData) return [ClientRowStatus.NotStarted];

    let status: ClientRowStatus[] = [];

    Object.values(step.formData).forEach(data => {
      if (data.clientSubTasks) {
        status = [
          ...status,
          ...data.clientSubTasks.map((task: ClientSubTaskFormType) => task.taskStatusId)
        ];
      }
    });

    return status;
  });

  if (allStatuses.every(status => status === ClientRowStatus.Completed || status === ClientRowStatus.NotApplicable)) {
    return ClientRowStatus.Completed;
  }

  if (allStatuses.every(status => status === ClientRowStatus.NotStarted)) {
    return ClientRowStatus.NotStarted;
  }

  return ClientRowStatus.InProgress;
}

export default getOverallStatus;