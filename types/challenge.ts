import { Field } from "./field";
import { TeamInfo, VenueInfo } from "./user";

export enum ChallengeType {
    RECEIVED = "received",
    SENT = "sent"
}

export enum ChallengeStatus {
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    PENDING = 'pending', 
    EXPIRED = 'expired'
}

export type Challenge = {
    id: number;
    home_team: TeamInfo;
    away_team: TeamInfo;
    message: string;
    date_start: string;
    date_end: string;
    venue: VenueInfo;
    status: ChallengeStatus;
}

export type ChallengeItem = {
    id: number;
    team: {
        name:  string;
    };
    message: string;
    type: ChallengeType;
    status: ChallengeStatus;

}