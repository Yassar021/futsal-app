import { PaginationRequest, RegisterTeamRequest } from "../../types/request";
import { PaginatedResponse, ValidationError } from "../../types/response";
import { TeamInfo, UserInfo } from "../../types/user";
import { baseFetcher } from "../fetcher";
import { store } from "../../store";
import { ChallengeItem } from "../../types/challenge";
import { API_BASE_URL } from "../../config";

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


export async function registerTeam(payload: RegisterTeamRequest): Promise<any | ValidationError> {    
    const form = new FormData();
    
    for (const field_name in payload) {
        if (field_name === "profile_picture") {
            continue;
        }
        form.append(field_name, payload[field_name])
    }

    form.append("profile_picture",payload.profile_picture);



    return fetch(`${API_BASE_URL}/auth/team/register`, {
        method: "POST",
        body: form,
        headers: {
            "accept": "application/json"
        }
    }).then(res => res.json())
}

export async function updateTeam(payload: Partial<TeamInfo | {profile_picture: string | File}>): Promise<any | ValidationError> {
    const form = new FormData();
    
    for (const field_name in payload) {
        form.append(field_name, payload[field_name])
    }

    return baseFetcher(`/me/team`, {
        method: "POST",
        body: form,
    })
}