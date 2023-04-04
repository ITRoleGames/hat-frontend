import {ExplanationStatus} from "./explanation-status";

export interface UpdateExplanationData {

    id: number;

    status: ExplanationStatus;

    endTime: Date;
}