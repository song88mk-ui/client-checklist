import IntegrationType from "$enums/integrationType";
import StepStatus from "$enums/StepStatus";
import type Step from "$types/step";
import StepEnum from "$enums/Step";

export const STATUS_COLORS = {
    [StepStatus.Active]: {
        bg: 'bg-white',
        icon: 'text-blue-600',
        border: 'border-blue-600',
        line: 'bg-gray-300',
        text: 'text-blue-600'
    },
    [StepStatus.Completed]: {
        bg: 'bg-blue-600',
        icon: 'text-white',
        border: 'border-blue-600',
        line: 'bg-blue-600',
        text: 'text-blue-600'
    },
    [StepStatus.Inactive]: {
        bg: 'bg-white',
        icon: 'text-gray-300',
        border: 'border-gray-300',
        line: 'bg-gray-300',
        text: 'text-gray-300'
    }
}

const WALLET_INTEGRATION_STEPS: Step[] = [
    { title: 'Contact Information', status: StepStatus.Active, stepId: 0 },
    { title: 'Back Office', status: StepStatus.Inactive, stepId: 1 },
    { title: 'Wallet Integration', status: StepStatus.Inactive, stepId: 2 },
    { title: 'Sportsbook Player Site UI/UX', status: StepStatus.Inactive, stepId: 3 },
    { title: 'Manage Trading Services', status: StepStatus.Inactive, stepId: 4 },
    { title: 'End-to-End Functional & Performance Test', status: StepStatus.Inactive, stepId: 5 },
    { title: 'Operations', status: StepStatus.Inactive, stepId: 6 },
    { title: 'Business Acceptance Test', status: StepStatus.Inactive, stepId: 7 },
    { title: 'Client Launch', status: StepStatus.Inactive, stepId: 8 }
]

const FEED_INTEGRATION_STEPS: Step[] = [
    { title: 'Contact Information', status: StepStatus.Active, stepId: 0 },
    { title: 'Back Office', status: StepStatus.Inactive, stepId: 1 },
    { title: 'Odds Feed Integration', status: StepStatus.Inactive, stepId: 2 },
    { title: 'Manage Trading Services', status: StepStatus.Inactive, stepId: 3 },
    { title: 'End-to-End Functional & Performance Test', status: StepStatus.Inactive, stepId: 4 },
    { title: 'Operations', status: StepStatus.Inactive, stepId: 5 },
    { title: 'Business Acceptance Test', status: StepStatus.Inactive, stepId: 6 },
    { title: 'Client Launch', status: StepStatus.Inactive, stepId: 7 }
]

export const INTEGRATION_STEPS = {
    [IntegrationType.WALLET_INTEGRATION]: WALLET_INTEGRATION_STEPS,
    [IntegrationType.FEED_INTEGRATION]: FEED_INTEGRATION_STEPS
}