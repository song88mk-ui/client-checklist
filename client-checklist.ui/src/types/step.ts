import type StepStatus from "$enums/StepStatus";

type Step = {
    title: string;
    status: StepStatus;
    ids: string[];
};

export type { Step as default };
