import type StepStatus from "$enums/StepStatus";

type Step = {
    title: string;
    status: StepStatus;
};

export type { Step as default };
