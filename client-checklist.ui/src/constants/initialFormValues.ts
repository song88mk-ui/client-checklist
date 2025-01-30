import type { ClientTaskFormType } from '$lib/ProductForm/validationSchema';
import IntegrationType from '$enums/integrationType';
import Environment from '$enums/Environment';
import { OddsFeedIntegrationStagingValues } from '$constants/OddsFeedIntegration/oddsFeedIntegrationStagingValues';
import { BackOfficeValues } from '$constants/Backoffice/backofficeValues';
import { OddsFeedIntegrationProdValues } from '$constants/OddsFeedIntegration/oddsFeedIntegrationProdValues';
import { MTSOddsFeedValues } from '$constants/MTS/MTSValuesOddsFeed';
import { EndToEndOddsFeedValues } from '$constants/EndToEnd/endToEndValuesOddsFeed';
import Step from '$enums/Step';
import { OperationsValues } from './Operations/operationsValues';
import { BusinessAcceptanceOddsFeedValues } from '$constants/BusinessAcceptance/businessAcceptanceValuesOddsFeed';
import { WalletIntegrationValues } from '$constants/WalletIntegration/walletIntegrationValues';
import { SportsbookValues } from '$constants/Sportsbook/sportsbookValues';
import { MTSWalletValues } from '$constants/MTS/MTSValuesWallet';
import { EndToEndWalletValues } from '$constants/EndToEnd/endToEndValuesWallet';
import { ClientLaunchWalletValues } from '$constants/ClientLaunch/clientLaunchValuesWallet';
import { BusinessAcceptanceWalletValues } from '$constants/BusinessAcceptance/businessAcceptanceValuesWallet';
import { ClientLaunchSportsValues } from '$constants/ClientLaunch/clientLaunchSportsValues';

export const WalletSteps = Step[IntegrationType.WALLET_INTEGRATION];
const initialWalletFormValues: Record<
	string,
	Record<number, Record<string, ClientTaskFormType>>
> = {
	[IntegrationType.WALLET_INTEGRATION]: {
		[WalletSteps.BackOffice]: {
			[Environment.STAGING]: BackOfficeValues,
			[Environment.PRODUCTION]: BackOfficeValues
		},
		[WalletSteps.WalletIntegration]: {
			[Environment.STAGING]: WalletIntegrationValues,
			[Environment.PRODUCTION]: WalletIntegrationValues
		},
		[WalletSteps.SportsbookPlayerSite]: {
			[Environment.STAGING]: SportsbookValues,
			[Environment.PRODUCTION]: SportsbookValues
		},
		[WalletSteps.ManagedTradingServices]: {
			[Environment.STAGING]: MTSWalletValues,
			[Environment.PRODUCTION]: MTSWalletValues
		},
		[WalletSteps.Operations]: {
			[Environment.STAGING]: OperationsValues,
			[Environment.PRODUCTION]: OperationsValues
		},
		[WalletSteps.EndToEndFunctionalPerformanceTest]: {
			[Environment.STAGING]: EndToEndWalletValues,
			[Environment.PRODUCTION]: EndToEndWalletValues
		},
		[WalletSteps.BusinessAcceptanceTest]: {
			[Environment.STAGING]: BusinessAcceptanceWalletValues,
			[Environment.PRODUCTION]: BusinessAcceptanceWalletValues
		},
		[WalletSteps.ClientLaunch]: {
			[Environment.PRODUCTION]: ClientLaunchWalletValues
		}
	}
};

export const OddsFeedSteps = Step[IntegrationType.FEED_INTEGRATION];
const initialFeedFormValues: Record<string, Record<number, Record<string, ClientTaskFormType>>> = {
	[IntegrationType.FEED_INTEGRATION]: {
		[OddsFeedSteps.BackOffice]: {
			[Environment.STAGING]: BackOfficeValues,
			[Environment.PRODUCTION]: BackOfficeValues
		},
		[OddsFeedSteps.OddsfeedIntegration]: {
			[Environment.STAGING]: OddsFeedIntegrationStagingValues,
			[Environment.PRODUCTION]: OddsFeedIntegrationProdValues
		},
		[OddsFeedSteps.ManagedTradingServices]: {
			[Environment.STAGING]: MTSOddsFeedValues,
			[Environment.PRODUCTION]: MTSOddsFeedValues
		},
		[OddsFeedSteps.Operations]: {
			[Environment.STAGING]: OperationsValues,
			[Environment.PRODUCTION]: OperationsValues
		},
		[OddsFeedSteps.EndToEndFunctionalPerformanceTest]: {
			[Environment.STAGING]: EndToEndOddsFeedValues,
			[Environment.PRODUCTION]: EndToEndOddsFeedValues
		},
		[OddsFeedSteps.BusinessAcceptanceTest]: {
			[Environment.STAGING]: BusinessAcceptanceOddsFeedValues,
			[Environment.PRODUCTION]: BusinessAcceptanceOddsFeedValues
		},
		[OddsFeedSteps.ClientLaunch]: {
			[Environment.PRODUCTION]: ClientLaunchSportsValues
		}
	}
};

const initialFormValues = {
	...initialWalletFormValues,
	...initialFeedFormValues
};

export default initialFormValues;
