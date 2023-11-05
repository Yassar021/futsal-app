
export enum AccountType {
    VENUE = "venue",
    TEAM = "team"
}


type VenueUserInfo = {
    type: AccountType.VENUE,
    data: VenueInfo
}

export type VenueInfo = {
    id: number,
    name: string,
    address: string,
    est_year: number,
    owner_name: string,
    phone: string,
    profile_picture: string;
}

type TeamUserInfo = {
    type: AccountType.TEAM,
    data: TeamInfo
}

export type TeamInfo = {
    id: number,
    name: string,
    address: string,
    est_year: number,
    description: string,
    coach_name: string,
    phone: string,
    profile_picture: string
}

export type UserInfo = TeamUserInfo | VenueUserInfo;