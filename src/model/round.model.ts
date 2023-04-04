import {Explanation} from "./explanation.model";
import {RoundStatus} from "./round-status";

export interface Round {
    id: number,
    explainerId: number,
    explanation: Explanation,
    startTime: string, //todo: date
    status: RoundStatus
}