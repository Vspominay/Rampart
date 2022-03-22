import { Logo } from './logo';
import { User } from "./user";

export interface serverResponse {
    success: boolean,
    msg: string,
    typeError?: string,
    user?: User | User[],
    logo?: Logo | Logo[],
}