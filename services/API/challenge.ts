import { CreateChallengeRequest } from "../../types/request";
import { CreateSuccess } from "../../types/response";
import { baseFetcher } from "../fetcher";

export async function createChallenge(payload: CreateChallengeRequest): Promise<CreateSuccess<any>> {
    return baseFetcher("/challenge", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}