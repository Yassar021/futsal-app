import { API_BASE_URL } from "../config";


export function baseFetcher(path: string, config: RequestInit = {method: "GET"}) {
    const token = localStorage.getItem("token");

    const requestHeader = config.headers ?? {}
    const headers = {
        "accept": "application/json",
        "content-type": "application/json",
        ...requestHeader
    }

    if (token) {
        headers["Authorization"] = "Bearer " + token
    }

    return fetch(`${API_BASE_URL}${path}`, {
        ...config,
        headers: headers
    }).then(res => res.json())
}