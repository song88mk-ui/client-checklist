import IntegrationType from '$enums/integrationType';
import { OddsFeedSteps, WalletSteps } from '$constants/initialFormValues';

export const STEP_NAME: any = {
	'1': 'Back Office',
	'2': 'Wallet Integration',
	'3': 'Odds Feed Integration',
	'4': 'Sportsbook Player Site UI/UX',
	'5': 'Managed Trading Services',
	'6': 'End to End Functional & Performance Test',
	'7': 'Operations',
	'8': 'Business Acceptance Test',
	'9': 'Client Launch'
};

export const STEP_NAME_BY_INTEGRATION: Record<number, any> = {
	1: {
		[WalletSteps.BackOffice]: 'Back Office',
		[WalletSteps.WalletIntegration]: 'Wallet Integration',
		[WalletSteps.SportsbookPlayerSite]: 'Sportsbook Player Site UI/UX',
		[WalletSteps.ManagedTradingServices]: 'Managed Trading Services',
		[WalletSteps.EndToEndFunctionalPerformanceTest]: 'End to End Functional Performance Test',
		[WalletSteps.Operations]: 'Operations',
		[WalletSteps.BusinessAcceptanceTest]: 'Business Acceptance Test',
		[WalletSteps.ClientLaunch]: 'Client Launch',
	},
	2: {
		[OddsFeedSteps.BackOffice]: 'Back Office',
		[OddsFeedSteps.OddsfeedIntegration]: 'Odds feed Integration',
		[OddsFeedSteps.ManagedTradingServices]: 'Managed Trading Services',
		[OddsFeedSteps.EndToEndFunctionalPerformanceTest]: 'End to End Functional Performance Test',
		[OddsFeedSteps.Operations]: 'Operations',
		[OddsFeedSteps.BusinessAcceptanceTest]: 'Business Acceptance Test',
		[OddsFeedSteps.ClientLaunch]: 'Client Launch',
	}
};
export const DEFAULT_SERVICE_TEMPLATE: any = {
	2: [
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 1,
			sortOrder: 0,
			step: 1,
			stepName: 'Back Office',
			targetDateCompleted: null
		},
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 1,
			sortOrder: 0,
			step: 2,
			stepName: 'Odds Feed Integration',
			targetDateCompleted: null
		},
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 1,
			sortOrder: 0,
			step: 3,
			stepName: 'Managed Trading Services',
			targetDateCompleted: null
		},
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 1,
			sortOrder: 0,
			step: 4,
			stepName: 'End to End Functional & Performance Test',
			targetDateCompleted: null
		},
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 1,
			sortOrder: 0,
			step: 5,
			stepName: 'Operations',
			targetDateCompleted: null
		},
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 1,
			sortOrder: 0,
			step: 6,
			stepName: 'Business Acceptance Test',
			targetDateCompleted: null
		},
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 1,
			sortOrder: 0,
			step: 7,
			stepName: 'Client Launch',
			targetDateCompleted: null
		}
	],
	1: [
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 2,
			sortOrder: 0,
			step: 1,
			stepName: 'Back Office',
			targetDateCompleted: null
		},
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 2,
			sortOrder: 0,
			step: 2,
			stepName: 'Wallet Integration',
			targetDateCompleted: null
		},
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 2,
			sortOrder: 0,
			step: 3,
			stepName: 'Sportsbook Player Site UI/UX',
			targetDateCompleted: null
		},
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 2,
			sortOrder: 0,
			step: 4,
			stepName: 'Managed Trading Services',
			targetDateCompleted: null
		},
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 2,
			sortOrder: 0,
			step: 5,
			stepName: 'End to End Functional & Performance Test',
			targetDateCompleted: null
		},
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 2,
			sortOrder: 0,
			step: 6,
			stepName: 'Operations',
			targetDateCompleted: null
		},
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 2,
			sortOrder: 0,
			step: 7,
			stepName: 'Business Acceptance Test',
			targetDateCompleted: null
		},
		{
			actualDateCompleted: null,
			assignedTo: null,
			clientId: null,
			clientStepId: 0,
			clientSubtasks: [],
			environment: 0,
			serviceTypeId: 2,
			sortOrder: 0,
			step: 8,
			stepName: 'Client Launch',
			targetDateCompleted: null
		}
	]
};
