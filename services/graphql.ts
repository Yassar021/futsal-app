import { request, ClientError, gql } from 'graphql-request'
import { TVanue } from "../types/type";

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
