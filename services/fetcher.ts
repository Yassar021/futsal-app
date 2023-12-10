import { API_BASE_URL } from "../config";


export function baseFetcher(path: string, config: RequestInit = {method: "GET"}) {
    const token = localStorage.getItem("token");

    const requestHeader = config.headers ?? {}
    const headers = {
        "accept": "application/json",
        ...requestHeader
    }

    if (!(config.body instanceof FormData)) {
        headers["content-type"] = "application/json"
    }

    console.log(requestHeader,headers);

    if (token) {
        headers["Authorization"] = "Bearer " + token
    }

    return fetch(`${API_BASE_URL}${path}`, {
        ...config,
        headers: headers
    }).then(res => {
        if (res.status === 204) {
            return true;
        }

        return res.json();
    })
}