import { TeamInfo, VenueInfo } from "./user";

enum MatchType {
    FRIENDLY = "friendly",
    TOURNAMENT = "tournament"
}

export type InsertedResult = {
    home: number;
    away: number;
    isPenalty: boolean;
    home_penalty: number;
    away_penalty: number;
    created_by: number;
}

export type GameResult = {
    isSettle: boolean;
    home: number | string;
    away: number | string;
    isPenalty: boolean;
    home_penalty: number;
    away_penalty: number;
    submited: InsertedResult[]
}

export type Match = {
    id: number;
    home_team: TeamInfo,
    away_team: TeamInfo,
    venue: VenueInfo,
    date: string,
    type: MatchType
}

export type MatchHistory = Match & {
    result: GameResult
}