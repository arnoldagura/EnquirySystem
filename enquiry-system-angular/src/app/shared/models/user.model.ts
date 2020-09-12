export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    userType: string;
    password?: string;
    token?: string;
}
export interface Login {
    username: string;
    password: string;
}