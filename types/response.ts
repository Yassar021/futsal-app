export type ValidationError = {
    errors: {
        [key: string] : string[]
    },
    message: string
}


export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}