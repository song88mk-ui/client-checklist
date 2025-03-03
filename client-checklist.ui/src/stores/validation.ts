import { ErrorValidationType } from "$enums/ErrorValidationType";
import { writable } from "svelte/store";

export const isFormModified = writable<boolean>(false);

const isErrorValidation = writable<Record<ErrorValidationType, boolean>>({
    [ErrorValidationType.MissingRequiredFields]: false,
    [ErrorValidationType.AllTasksCompletion]: false,
});

export default isErrorValidation;