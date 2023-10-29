import { baseFetcher } from "../fetcher";

export function getOptionFields(): Promise<{id: number, label: string}[]> {
    return baseFetcher("/option/field")
}