import type { LoginData } from "./login";

export type RegisterData = LoginData & {
    email: string;
    password2: string;
};
