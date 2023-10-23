export type ValidationError = {
    errors: {
        [key: string] : string[]
    },
    message: string
}