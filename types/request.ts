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