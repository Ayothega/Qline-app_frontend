import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { LoginDTO, SignupDTO, AuthResponse, User } from '../types';

// Determine API URL based on environment
const getApiBaseUrl = () => {
    if (process.env.EXPO_PUBLIC_API_URL) {
        return process.env.EXPO_PUBLIC_API_URL;
    }
    // Android Emulator special host for localhost
    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:8000';
    }
    // iOS Simulator or Web uses localhost
    return 'http://localhost:8000';
};

const API_BASE = getApiBaseUrl();

export class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public code?: string,
        public fieldErrors?: Record<string, string[]>
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

class AuthService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string> || {}),
        };

        const response = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers,
            credentials: 'include', // Needed for cookies if supported
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = { message: 'An unexpected error occurred' };
            }

            throw new ApiError(
                response.status,
                errorData.message || 'API request failed',
                errorData.code,
                errorData.errors
            );
        }

        return response.json();
    }

    async login(data: LoginDTO): Promise<AuthResponse> {
        return this.request<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async signup(data: SignupDTO): Promise<AuthResponse> {
        // Map frontend DTO (username) to backend DTO (name)
        const payload = {
            ...data,
            name: data.username,
        };
        return this.request<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }

    async getProfile(): Promise<User> {
        return this.request<User>('/auth/profile');
    }

    async logout(): Promise<void> {
        try {
            await this.request('/auth/logout', { method: 'POST' });
        } catch (e) {
            console.warn('Logout failed on server', e);
        }
    }
}

export const authApi = new AuthService();
