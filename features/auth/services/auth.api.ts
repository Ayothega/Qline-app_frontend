import { Platform } from 'react-native';
import { LoginDTO, SignupDTO, AuthResponse, User } from '../types';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

import Constants from 'expo-constants';

// Determine API URL based on environment
const getApiBaseUrl = () => {
    if (process.env.EXPO_PUBLIC_API_URL) {
        return process.env.EXPO_PUBLIC_API_URL;
    }

    // Attempt to use the Metro bundler IP (LAN IP) if available
    // this allows physical devices to connect to the backend running on the same PC
    const debuggerHost = Constants.expoConfig?.hostUri;
    const localhost = debuggerHost?.split(':')[0];

    if (localhost) {
        return `http://${localhost}:8000`;
    }

    // Android Emulator special host for localhost (fallback)
    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:8000';
    }
    // iOS Simulator or Web uses localhost
    return 'http://localhost:8000';
};

const API_BASE = getApiBaseUrl();
const TOKEN_KEY = 'auth_token';

// Ensure the browser session completes if the app is foregrounded
WebBrowser.maybeCompleteAuthSession();

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
    public async getAccessToken(): Promise<string | null> {
        return SecureStore.getItemAsync(TOKEN_KEY);
    }

    public async setAccessToken(token: string) {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    }

    async clearAccessToken() {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const token = await this.getAccessToken();
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string> || {}),
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers,
            credentials: 'include', // Still keep credentials for web/cookies if needed
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
        const response = await this.request<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (response.accessToken) {
            await this.setAccessToken(response.accessToken);
        }
        return response;
    }

    async signup(data: SignupDTO): Promise<AuthResponse> {
        const payload = {
            ...data,
            name: data.username,
        };
        const response = await this.request<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        if (response.accessToken) {
            await this.setAccessToken(response.accessToken);
        }
        return response;
    }

    async getProfile(): Promise<User> {
        return this.request<User>('/auth/profile');
    }

    async logout(): Promise<void> {
        try {
            await this.request('/auth/logout', { method: 'POST' });
        } catch (e) {
            console.warn('Logout failed on server', e);
        } finally {
            await this.clearAccessToken();
        }
    }

    async initiateGoogleLogin() {
        try {
            const redirectUrl = Linking.createURL('auth/callback');

            // Pass the redirect_uri to the backend so it knows where to return
            const authUrl = `${API_BASE}/auth/google?redirect_uri=${encodeURIComponent(redirectUrl)}`;

            const result = await WebBrowser.openAuthSessionAsync(
                authUrl,
                redirectUrl
            );

            return result;
        } catch (error) {
            throw error;
        }
    }
}

export const authApi = new AuthService();
