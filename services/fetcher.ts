export function baseFetcher(url: RequestInfo | URL, config: RequestInit) {

    const requestHeader = config.headers ?? {}
    const headers = {
        "accept": "application/json",
        ...requestHeader
    }

    return fetch(url, {
        ...config,
        headers: headers
    }).then(res => res.json())
}