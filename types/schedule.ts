import { TeamInfo, VenueInfo } from "./user";

enum MatchType {
    FRIENDLY = "friendly",
    TOURNAMENT = "tournament"
}

export type Match = {
    home_team: TeamInfo,
    away_team: TeamInfo,
    venue: VenueInfo,
    date: string,
    type: MatchType
}