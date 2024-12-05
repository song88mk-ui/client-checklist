import IntegrationType from "$enums/integrationType";
import StepStatus from "$enums/StepStatus";
import type Step from "$types/step";

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
    { title: 'Contact Information', status: StepStatus.Active, ids: [] },
    { title: 'Back Office', status: StepStatus.Inactive, ids: [] },
    { title: 'Wallet Integration', status: StepStatus.Inactive, ids: [] },
    { title: 'Sportsbook Player Site UI/UX', status: StepStatus.Inactive, ids: [] },
    { title: 'Manage Trading Services', status: StepStatus.Inactive, ids: [] },
    { title: 'End-to-End Functional & Performance Test', status: StepStatus.Inactive, ids: [] },
    { title: 'Operations', status: StepStatus.Inactive, ids: [] },
    { title: 'Business Acceptance Test', status: StepStatus.Inactive, ids: [] },
    { title: 'Client Launch', status: StepStatus.Inactive, ids: [] }
]

const FEED_INTEGRATION_STEPS: Step[] = [
    { title: 'Contact Information', status: StepStatus.Active, ids: [] },
    { title: 'Back Office', status: StepStatus.Inactive, ids: [] },
    { title: 'Odds Feed Integration', status: StepStatus.Inactive, ids: [] },
    { title: 'Manage Trading Services', status: StepStatus.Inactive, ids: [] },
    { title: 'End-to-End Functional & Performance Test', status: StepStatus.Inactive, ids: [] },
    { title: 'Operations', status: StepStatus.Inactive, ids: [] },
    { title: 'Business Acceptance Test', status: StepStatus.Inactive, ids: [] },
    { title: 'Client Launch', status: StepStatus.Inactive, ids: [] }
]

export const INTEGRATION_STEPS = {
    [IntegrationType.WALLET_INTEGRATION]: WALLET_INTEGRATION_STEPS,
    [IntegrationType.FEED_INTEGRATION]: FEED_INTEGRATION_STEPS
}