import { PaginationRequest } from "../../types/request";
import { PaginatedResponse } from "../../types/response";
import { Match } from "../../types/schedule";
import { baseFetcher } from "../fetcher";

export function getLatestSchedules(team_id: string, request: PaginationRequest): Promise<PaginatedResponse<Match>> {
    const { page = 1, size = 10 } = request;
    return baseFetcher(`/team/${team_id}/schedules?page=${page}&size=${size}`);
}