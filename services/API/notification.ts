import { baseFetcher } from "../fetcher";


export async function getUnreadNotification(team_id: string): Promise<[]> {
    return baseFetcher(`/team/${team_id}/unread_notifications`)
}