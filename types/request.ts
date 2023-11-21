export interface PaginationRequest {
    page: number;
    size: number;
}

export interface CreateChallengeRequest {
    team_id: string;
    datetime: string;
    field_id: string;
    message: string;
}

export type UpdateChallengeRequest = Omit<CreateChallengeRequest, "team_id">;

export type SubmitGameResult = {
    home: number;
	away: number;
	isPenalty: boolean;
	home_penalty: number;
	away_penalty: number;
}