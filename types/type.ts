export type TVanue = {
    id: string;
    name: string;
    owner_name: string;
    phone: string;
    address: string;
}

export enum FetchStatus {
    LOADING,
    IDLE,
    FINISHED
}