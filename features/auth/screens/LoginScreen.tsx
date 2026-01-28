import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import { authApi } from '../services/auth.api';

export function LoginScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        if (!form.email || !form.password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await authApi.login(form);
            // On success, navigate to main app
            router.replace('/(tabs)');
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-white p-6 justify-center">
            <View className="items-center mb-10">
                <View className="flex-row items-center mb-6">
                    <Logo size="md" />
                </View>
                <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</Text>
                <Text className="text-base text-gray-500">Login to continue to your queue</Text>
            </View>

            <View className="w-full">
                <Input
                    label="Email"
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={form.email}
                    onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
                    rightItem={<MaterialCommunityIcons name="email-outline" size={20} color="#9ca3af" />}
                />

                <View className="mt-4">
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        secureTextEntry={!showPassword}
                        value={form.password}
                        onChangeText={(text) => setForm(prev => ({ ...prev, password: text }))}
                        rightItem={
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <MaterialCommunityIcons name={showPassword ? "eye" : "eye-off"} size={20} color="#9ca3af" />
                            </TouchableOpacity>
                        }
                    />
                </View>

                <TouchableOpacity
                    className="self-end mt-2 mb-6"
                    onPress={() => router.push('/(auth)/forgot-password')}
                >
                    <Text className="text-primary font-semibold">Forgot Password?</Text>
                </TouchableOpacity>

                {error && <Text className="text-red-500 mb-4 text-center">{error}</Text>}

                <Button
                    title="Login"
                    onPress={handleLogin}
                    isLoading={isLoading}
                    className="rounded-lg"
                />

                <View className="mt-4">
                    <GoogleLoginButton
                        onSuccess={async (result: any) => {
                            // If the backend returned a token in the URL params, we would extract it here.
                            console.log('Google login result:', result);
                            if (result.type === 'success' && result.url) {
                                try {
                                    // Extract token from URL params (e.g. ?token=... or &token=...)
                                    const match = result.url.match(/[?&]token=([^&]+)/);
                                    if (match && match[1]) {
                                        const token = match[1];
                                        await authApi.setAccessToken(token);
                                        router.replace('/(tabs)');
                                    } else {
                                        console.warn('No token found in redirect URL');
                                    }
                                } catch (e) {
                                    console.error('Failed to handle Google login', e);
                                }
                            }
                        }}
                        onError={(error: any) => console.log(error)}
                    />
                </View>

                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-500">Don't have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                        <Text className="text-primary font-bold">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
