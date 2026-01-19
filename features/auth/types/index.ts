export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthResponse {
    user: User;
    // cookie handled by browser/client automatically
}

export interface LoginDTO {
    email?: string; // allow email for convenience, though web used username? No web used email/username field
    password?: string;
    username?: string;
}

export interface SignupDTO {
    email: string;
    username: string; // name in backend
    password: string;
}
