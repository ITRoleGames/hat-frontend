import {ExplanationResult} from "./explanation-result";

export interface UpdateExplanationData {

    id: number;

    result: ExplanationResult;

    endTime: Date;
}