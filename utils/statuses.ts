import { ChallengeStatus } from "../types/challenge";

export function getStatusColor(status: ChallengeStatus): string {
    let result = "#000";
    switch (status) {
        case ChallengeStatus.PENDING:
            result = "#FFA600"
            break;
        case ChallengeStatus.VENUE_PENDING:
            result = "#FFA600"
            break;
        case ChallengeStatus.REJECTED:
            result = "#EB5757"
            break;
        case ChallengeStatus.VENUE_REJECTED:
            result = "#EB5757"
            break;
        case ChallengeStatus.ACCEPTED:
            result = "#2DCC70"
            break;
    }

    return result;
}

export function getStatusName(status: ChallengeStatus): string {
    let result = "";
    switch (status) {
        case ChallengeStatus.PENDING:
            result = "Pending"
            break;
        case ChallengeStatus.VENUE_PENDING:
            result = "Venue Pending"
            break;
        case ChallengeStatus.REJECTED:
            result = "Rejected"
            break;
        case ChallengeStatus.VENUE_REJECTED:
            result = "Rejected by Venue"
            break;
        case ChallengeStatus.ACCEPTED:
            result = "Accepted"
            break;
    }

    return result;
}