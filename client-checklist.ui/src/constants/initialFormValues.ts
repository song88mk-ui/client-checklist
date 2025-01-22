import type { ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import IntegrationType from '$enums/integrationType';
import { BackOfficeValues, BAValuesWalletIntegration } from '$constants/productFormValues';
import integrationType from '$enums/integrationType';

const initialWalletFormValues: { [IntegrationType.WALLET_INTEGRATION]: { backOffice: ClientTaskFormType } } = {
	[IntegrationType.WALLET_INTEGRATION]: {
		1: BackOfficeValues,
		2: WalletIntegrationValues,
		3: SportsbookValues,
		4: MTSValues,
		5: EndtoEndValues,
		6: OperationsValues,
		7: BusinessValues,
		8: ClientLaunchValues
	},
};

const initialFeedFormValues: Record<string, ClientTaskFormType> = {
	[IntegrationType.FEED_INTEGRATION]: {
		1: BackOfficeValues,
		2: OddsfeedIntegrationValues,
		3: MTSValues,
		4: EndtoEndValues,
		5: OperationsValues,
		6: BusinessValues,
		7: ClientLaunchValues
	}
};

const initialFormValues = {
	...initialWalletFormValues,
	...initialFeedFormValues
};

export default initialFormValues;
