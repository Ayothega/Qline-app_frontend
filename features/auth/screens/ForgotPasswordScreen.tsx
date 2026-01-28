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

export function ForgotPasswordScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            await authApi.requestPasswordReset(email);
            setSuccess(true);
            setEmail('');
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
                            Forgot Password?
                        </Text>
                        <Text className="text-base text-slate-600">
                            Enter your email address and we'll send you a link to reset your password.
                        </Text>
                    </View>

                    {success ? (
                        <View className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                            <Text className="text-green-800 text-sm">
                                If an account with that email exists, a password reset link has been sent. Please check your inbox.
                            </Text>
                        </View>
                    ) : (
                        <View className="space-y-4">
                            {error ? (
                                <View className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                                    <Text className="text-red-800 text-sm">{error}</Text>
                                </View>
                            ) : null}

                            <View className="mb-4">
                                <Text className="text-sm font-medium text-slate-700 mb-2">
                                    Email Address
                                </Text>
                                <TextInput
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-base"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    editable={!isLoading}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={isLoading || !email}
                                className={`w-full py-4 rounded-lg items-center justify-center ${isLoading || !email ? 'bg-blue-300' : 'bg-blue-600'
                                    }`}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text className="text-white font-semibold text-base">
                                        Send Reset Link
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
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
