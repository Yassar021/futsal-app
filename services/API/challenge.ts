import { Challenge } from "../../types/challenge";
import { CreateChallengeRequest, UpdateChallengeRequest } from "../../types/request";
import { CreateSuccess } from "../../types/response";
import { baseFetcher } from "../fetcher";

export async function createChallenge(payload: CreateChallengeRequest): Promise<CreateSuccess<any>> {
    return baseFetcher("/challenge", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}

export async function getChallengeDetail(challenge_id: number | string): Promise<Challenge> {
    return baseFetcher(`/challenge/${challenge_id}`);
}

export async function updateChallenge(challenge_id: number | string,payload: UpdateChallengeRequest): Promise<Challenge> {
    return baseFetcher(`/challenge/${challenge_id}`,{
        method: "PUT",
        body: JSON.stringify(payload)
    });
}

export async function deleteChallenge(challenge_id: number | string): Promise<void> {
    return baseFetcher(`/challenge/${challenge_id}`,{
        method: "DELETE"
    });
}