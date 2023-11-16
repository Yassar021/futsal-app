import { PaginationRequest } from "../../types/request";
import { PaginatedResponse } from "../../types/response";
import { Match, MatchHistory } from "../../types/schedule";
import { baseFetcher } from "../fetcher";

export function getLatestSchedules(team_id: string, request: PaginationRequest): Promise<PaginatedResponse<Match>> {
    const { page = 1, size = 10 } = request;
    return baseFetcher(`/team/${team_id}/schedules?page=${page}&size=${size}`);
}

export function getMatchHistories(team_id:string,request: PaginationRequest): Promise<PaginatedResponse<MatchHistory>> {
    const { page = 1, size = 10 } = request;
    return baseFetcher(`/team/${team_id}/histories?page=${page}&size=${size}`);
}