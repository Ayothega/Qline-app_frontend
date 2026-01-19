import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export function WelcomeScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white items-center px-6 pt-[60px] pb-10">
            {/* Logo Section */}
            <View className="flex-row items-center mb-10">
                <Logo size="lg" />
            </View>

            {/* Illustration Area */}
            <View className="flex-1 justify-center items-center w-full mb-10">
                {/* Placeholder for the illustration from the design */}
                <View
                    style={{ width: width * 0.8, height: width * 0.8 }}
                    className="bg-pink-600/10 rounded-3xl justify-center items-center"
                >
                    <MaterialCommunityIcons name="cellphone-nfc" size={120} color="#2563eb" />
                </View>
            </View>

            {/* Content Section */}
            <View className="w-full items-center">
                <Text className="text-3xl font-bold text-center text-gray-900 mb-10 leading-9">
                    Your time, managed intelligently.
                </Text>

                <View className="w-full gap-4">
                    <Button
                        title="Get Started"
                        onPress={() => router.push('/(auth)/signup')}
                        className="rounded-full"
                    />
                    <Button
                        title="Login"
                        variant="outline"
                        onPress={() => router.push('/(auth)/login')}
                        className="rounded-full"
                    />
                </View>
            </View>
        </View>
    );
}
