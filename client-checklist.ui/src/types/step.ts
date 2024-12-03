import type StepStatus from "$enums/StepStatus";

type Step = {
    title: string;
    status: StepStatus;
    id?: string;
};

export type { Step as default };
