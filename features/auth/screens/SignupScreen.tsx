import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import { authApi } from '../services/auth.api';

export function SignupScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async () => {
        if (!form.username || !form.email || !form.password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await authApi.signup({
                ...form,
                username: form.username // mapping
            });
            Alert.alert('Success', 'Account created! Please log in.');
            router.back(); // Go back to login
        } catch (err: any) {
            setError(err.message || 'Signup failed');
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
                <Text className="text-3xl font-bold text-gray-900 mb-2">Create Account</Text>
                <Text className="text-base text-gray-500">Start your journey with Qline</Text>
            </View>

            <View className="w-full">
                <Input
                    label="Username"
                    placeholder="johndoe"
                    value={form.username}
                    onChangeText={(text) => setForm(prev => ({ ...prev, username: text }))}
                />

                <View className="h-4" />

                <Input
                    label="Email"
                    placeholder="you@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={form.email}
                    onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
                />

                <View className="mt-4 mb-6">
                    <Input
                        label="Password"
                        placeholder="Create a password"
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

                {error && <Text className="text-red-500 mb-4 text-center">{error}</Text>}

                <Button
                    title="Sign Up"
                    onPress={handleSignup}
                    isLoading={isLoading}
                    className="rounded-lg"
                />

                <View className="mt-4">
                    <GoogleLoginButton
                        text="Sign up with Google"
                        onSuccess={async (result: any) => {
                            console.log('Google signup result:', result);
                            if (result.type === 'success' && result.url) {
                                try {
                                    const match = result.url.match(/[?&]token=([^&]+)/);
                                    if (match && match[1]) {
                                        const token = match[1];
                                        await authApi.setAccessToken(token);
                                        router.replace('/(tabs)');
                                    } else {
                                        console.warn('No token found in redirect URL');
                                    }
                                } catch (e) {
                                    console.error('Failed to handle Google signup', e);
                                }
                            }
                        }}
                        onError={(error: any) => console.log(error)}
                    />
                </View>

                <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-500">Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                        <Text className="text-primary font-bold">Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
