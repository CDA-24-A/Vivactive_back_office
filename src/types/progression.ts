import { Citizen } from "./citizen";
import { Step } from "./step";

export interface Progression {
    id: string;
    completed: boolean;
    dateCompleted: Date;
    citizen: Citizen;
    citizenId: string;
    step: Step;
    stepId: string;
}