export type TVanue = {
    id: string;
    name: string;
    owner_name: string;
    phone: string;
    address: string;
}

export type TTeam = {
    id: string;
    name: string;
    description: string;
}

type MatchResult = {
    away: number;
    home: number;
    created_At: string;
}


export type TMatchHistory = {
    home_team: {name: string};
    away_team: {name: string};
    match_results : MatchResult;
}

export enum FetchStatus {
    LOADING,
    IDLE,
    FINISHED
}


export type BookingSlot = {
    id: number;
    booking_id: number;
    date_start: string;
}

export type VenueField = {
    id: number;
    name: string;
    type: {
        id: number;
        name: string;
    }
}