import { PaginationRequest, SubmitGameResult } from "../../types/request";
import { PaginatedResponse } from "../../types/response";
import { GameResult, InsertedResult, Match, MatchHistory } from "../../types/schedule";
import { baseFetcher } from "../fetcher";

export function getLatestSchedules(team_id: string, request: PaginationRequest): Promise<PaginatedResponse<Match>> {
    const { page = 1, size = 10 } = request;
    return baseFetcher(`/team/${team_id}/schedules?page=${page}&size=${size}`);
}

export function getMatchHistories(team_id:string,request: PaginationRequest): Promise<PaginatedResponse<MatchHistory>> {
    const { page = 1, size = 10 } = request;
    return baseFetcher(`/team/${team_id}/histories?page=${page}&size=${size}`);
}

export async function setMatchResult(team_id: number,match_id: number,result: SubmitGameResult) {
    return baseFetcher(`/team/${team_id}/histories/${match_id}/results`,{
        method: "POST",
        body: JSON.stringify(result)
    })
}

export async function getSubmitedResult(team_id:number, match_id: number): Promise<{result: InsertedResult | null}> {
    return baseFetcher(`/team/${team_id}/histories/${match_id}/results`);
}