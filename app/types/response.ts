export type Response<T = unknown> = {
    data?: T;
    error: string;
    humanError: string;
};
