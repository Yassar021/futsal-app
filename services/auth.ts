import { baseFetcher } from "./fetcher";

type LoginAccount = {
    email: string;
    password: string;
}

export async function teamLogin({email, password}: LoginAccount) {
    let req = await baseFetcher(`/auth/team/login`,{
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

export async function venueLogin({email,password}: LoginAccount) {
    let req = await baseFetcher(`/auth/venue/login`,{
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