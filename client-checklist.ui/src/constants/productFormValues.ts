import { ClientRowStatus } from '$enums/ClientRowStatus';
import type { ClientSubTaskFormType, ClientTaskFormType } from '$lib/ProductForm/validationSchema';










export const OddsFeedIntegrationValuesStg: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: oddsFeedIntegrationSubTasksStg
};
export const OddsFeedIntegrationValuesPrd: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: oddsFeedIntegrationSubTasksPrd
};

export const WalletIntegrationValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: walletIntegrationSubTasks 
};


export const SportsbookPlayerSiteValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: sportsbookPlayerSiteSubTasks
};

export const MTSValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: MTSSubTasks
};

export const EndToEndTestValuesWalletIntegration: ClientTaskFormType = {
    ...defaultValues,
    clientSubTasks: endToEndTestSubTasksWalletIntegration
}

export const EndToEndTestValuesFeedIntegration: ClientTaskFormType = {
    ...defaultValues,
    clientSubTasks: endToEndTestSubTasksFeedIntegration
}

export const OperationsValues: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: operationsSubTasks
};

export const BAValuesWalletIntegration: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: BASubTasksWalletIntegration
};
export const BAValuesFeedIntegration: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: BASubTasksFeedIntegration
};

export const ClientLaunchValuesWalletIntegration: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: clientLaunchSubTasksWalletIntegration
};

export const ClientLaunchValuesBetValidation: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: clientLaunchSubTasksBetValidation
};

export const ClientLaunchValuesOddsFeedAndLive: ClientTaskFormType = {
	...defaultValues,
	clientSubTasks: clientLaunchSubTasksOddsFeedAndLive
};
