import { PaginationRequest } from "../../types/request";
import { PaginatedResponse } from "../../types/response";
import { TeamInfo, UserInfo } from "../../types/user";
import { baseFetcher } from "../fetcher";

export async function getAccountInfo(): Promise<UserInfo> {
    return baseFetcher("/me")
}

export async function getAvailableTeams(request: PaginationRequest): Promise<PaginatedResponse<TeamInfo>> {
    const { page = 1, size = 10 } = request
    return baseFetcher(`/findteam?page=${page}&size=${size}`);
}