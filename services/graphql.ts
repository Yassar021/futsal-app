import { request, ClientError, gql } from 'graphql-request'
import { TMatchHistory, TTeam, TVanue } from "../types/type";

const BASE_URL = "http://localhost:8080/v1/graphql";

const graphqlRequest = async ({ query }: { query: string }) => {
    try {
        const result = await request(BASE_URL, query)
        return { data: result }
    } catch (error) {
        if (error instanceof ClientError) {
            throw { error: { status: error.response.status, data: error } }
        }
        throw { error: { status: 500, data: error } }
    }
}


export const fetchVanues = async (): Promise<{vanue: TVanue[]}> => {
    const response = await graphqlRequest({
        query: gql`
        {
            vanue {
              id
              name
              owner_name
              phone
              address
            }
          }
        `
    })
    return response.data as {vanue: TVanue[]}
}

export const fetchTeams = async (): Promise<{team: TTeam[]}> => {
    const response = await graphqlRequest({
        query: gql`
        {
            team {
                id
                name
                description
            }
        }
        `
    })
    return response.data as {team: TTeam[]}
}

export const fetchMatchHistory = async (): Promise<{match: TMatchHistory[]}> => {
    const response = await graphqlRequest({
        query: gql`
        {
            match {
                home_team {
                  name
                }
                away_team {
                  name
                }
                match_results {
                  away
                  home
                  created_at
                }
            }
        }
        `
    })
    return response.data as {match: TMatchHistory[]}
}
