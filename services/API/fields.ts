import { baseFetcher } from "../fetcher";

export function getOptionFields(): Promise<{id: number, label: string}[]> {
    return baseFetcher("/option/field")
}


export function getFieldTypes(): Promise<{id: number,name: string}[]> {
    return baseFetcher("/me/venue/field_types");
}

export function addField(payload: {name: string, type_id: number}): Promise<any> {
    return baseFetcher("/me/venue/field",{
        method: "POST",
        body: JSON.stringify(payload)
    })
}

export function editField(payload: {id:number, name: string, type_id: number}): Promise<any> {
    return baseFetcher("/me/venue/field",{
        method: "PUT",
        body: JSON.stringify(payload)
    })
}

export function deleteField(field_id: number): Promise<any> {
    return baseFetcher(`/me/venue/field/${field_id}`,{
        method: "DELETE",
    })
}