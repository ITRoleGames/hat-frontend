import {Explanation} from "./explanation.model";
import {RoundStatus} from "./round-status";

export interface Round {
    id: number,
    explainerId: number,
    explanation: Explanation,
    startTime: Date, //todo: date
    status: RoundStatus
}