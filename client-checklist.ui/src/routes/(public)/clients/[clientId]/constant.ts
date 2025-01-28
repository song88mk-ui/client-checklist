import { OddsFeedSteps, WalletSteps } from '$constants/initialFormValues';
import type { ClientStepTemplate } from './types';

export const STEP_NAME_BY_INTEGRATION: Record<number, Record<number, string>> = {
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
export const DEFAULT_SERVICE_TEMPLATE: Record<number, ClientStepTemplate[]> = {
    2: [
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 1,
            sortOrder: 0,
            step: 1,
            stepName: 'Back Office',
            targetDateCompleted: ''
        },
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 1,
            sortOrder: 0,
            step: 2,
            stepName: 'Odds Feed Integration',
            targetDateCompleted: ''
        },
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 1,
            sortOrder: 0,
            step: 3,
            stepName: 'Managed Trading Services',
            targetDateCompleted: ''
        },
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 1,
            sortOrder: 0,
            step: 4,
            stepName: 'End to End Functional & Performance Test',
            targetDateCompleted: ''
        },
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 1,
            sortOrder: 0,
            step: 5,
            stepName: 'Operations',
            targetDateCompleted: ''
        },
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 1,
            sortOrder: 0,
            step: 6,
            stepName: 'Business Acceptance Test',
            targetDateCompleted: ''
        },
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 1,
            sortOrder: 0,
            step: 7,
            stepName: 'Client Launch',
            targetDateCompleted: ''
        }
    ],
    1: [
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 2,
            sortOrder: 0,
            step: 1,
            stepName: 'Back Office',
            targetDateCompleted: ''
        },
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 2,
            sortOrder: 0,
            step: 2,
            stepName: 'Wallet Integration',
            targetDateCompleted: ''
        },
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 2,
            sortOrder: 0,
            step: 3,
            stepName: 'Sportsbook Player Site UI/UX',
            targetDateCompleted: ''
        },
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 2,
            sortOrder: 0,
            step: 4,
            stepName: 'Managed Trading Services',
            targetDateCompleted: ''
        },
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 2,
            sortOrder: 0,
            step: 5,
            stepName: 'End to End Functional & Performance Test',
            targetDateCompleted: ''
        },
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 2,
            sortOrder: 0,
            step: 6,
            stepName: 'Operations',
            targetDateCompleted: ''
        },
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 2,
            sortOrder: 0,
            step: 7,
            stepName: 'Business Acceptance Test',
            targetDateCompleted: ''
        },
        {
            actualDateCompleted: '',
            assignedTo: '',
            clientId: '',
            clientStepId: 0,
            clientSubtasks: [],
            environment: 0,
            serviceTypeId: 2,
            sortOrder: 0,
            step: 8,
            stepName: 'Client Launch',
            targetDateCompleted: ''
        }
    ]
};
