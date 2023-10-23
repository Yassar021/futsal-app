import { baseFetcher } from "./fetcher";

type LoginAccount = {
    email: string;
    password: string;
}

const AUTH_BASE_URL = "http://localhost:8000/api"


export async function teamLogin({email, password}: LoginAccount) {
    let req = await baseFetcher(`${AUTH_BASE_URL}/auth/team/login`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    
    return req
}