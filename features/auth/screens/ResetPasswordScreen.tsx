import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { authApi, ApiError } from '../services/auth.api';

export function ResetPasswordScreen({ route, navigation }: any) {
    const token = route.params?.token || '';
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError('');

        if (!token) {
            setError('Invalid or missing reset token. Please request a new password reset link.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);

        try {
            await authApi.resetPassword(token, password);
            // Navigate to login with success message
            navigation.navigate('Login', { resetSuccess: true });
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <View className="flex-1 bg-white justify-center px-6">
                <View className="mb-8">
                    <Text className="text-3xl font-bold text-slate-900 mb-2">
                        Reset Password
                    </Text>
                </View>
                <View className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                    <Text className="text-red-800 text-sm">
                        Invalid or missing reset token. Please request a new password reset link.
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                    className="py-4 rounded-lg bg-blue-600 items-center"
                >
                    <Text className="text-white font-semibold">Request New Reset Link</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white"
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 justify-center px-6 py-12">
                    <View className="mb-8">
                        <Text className="text-3xl font-bold text-slate-900 mb-2">
                            Set New Password
                        </Text>
                        <Text className="text-base text-slate-600">
                            Please enter your new password below.
                        </Text>
                    </View>

                    <View className="space-y-4">
                        {error ? (
                            <View className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                                <Text className="text-red-800 text-sm">{error}</Text>
                            </View>
                        ) : null}

                        <View className="mb-4">
                            <Text className="text-sm font-medium text-slate-700 mb-2">
                                New Password
                            </Text>
                            <TextInput
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-base"
                                placeholder="Enter new password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                editable={!isLoading}
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-sm font-medium text-slate-700 mb-2">
                                Confirm Password
                            </Text>
                            <TextInput
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-base"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                                editable={!isLoading}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={isLoading || !password || !confirmPassword}
                            className={`w-full py-4 rounded-lg items-center justify-center ${isLoading || !password || !confirmPassword
                                    ? 'bg-blue-300'
                                    : 'bg-blue-600'
                                }`}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-white font-semibold text-base">
                                    Reset Password
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        className="mt-6"
                    >
                        <Text className="text-center text-blue-600 font-medium">
                            ← Back to Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
