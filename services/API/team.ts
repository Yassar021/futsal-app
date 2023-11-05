import { PaginationRequest } from "../../types/request";
import { PaginatedResponse } from "../../types/response";
import { TeamInfo, UserInfo } from "../../types/user";
import { baseFetcher } from "../fetcher";
import { store } from "../../store";
import { ChallengeItem } from "../../types/challenge";

export async function getAccountInfo(): Promise<UserInfo> {
    return baseFetcher("/me")
}

export async function getAvailableTeams(request: PaginationRequest): Promise<PaginatedResponse<TeamInfo>> {
    const { page = 1, size = 10 } = request
    return baseFetcher(`/findteam?page=${page}&size=${size}`);
}


export async function getReceivedChallenge(): Promise<ChallengeItem[]> {
    const {account} = store.getState();
    const currentTeamId = account.userInfo?.data.id;

    return baseFetcher(`/team/${currentTeamId}/challenges/received`)
}

export async function getSentChallenge(): Promise<ChallengeItem[]> {
    const {account} = store.getState();
    const currentTeamId = account.userInfo?.data.id;

    return baseFetcher(`/team/${currentTeamId}/challenges/sent`)
}