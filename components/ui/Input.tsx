import React, { useState } from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';
import clsx from 'clsx';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    rightItem?: React.ReactNode;
    containerClassName?: string;
}

export function Input({ label, error, rightItem, containerClassName, onFocus, onBlur, ...props }: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className={clsx("mb-1 w-full", containerClassName)}>
            {label && <Text className="text-sm font-medium text-gray-700 mb-1.5">{label}</Text>}

            <View
                className={clsx(
                    "flex-row items-center bg-gray-50 border rounded-lg px-3",
                    isFocused ? "border-primary" : "border-gray-200",
                    !!error && "border-red-500"
                )}
            >
                <TextInput
                    className="flex-1 py-3 text-base text-gray-900"
                    placeholderTextColor="#9ca3af"
                    onFocus={(e) => {
                        setIsFocused(true);
                        onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        onBlur?.(e);
                    }}
                    {...props}
                />
                {rightItem && (
                    <View className="ml-2">
                        {rightItem}
                    </View>
                )}
            </View>

            {error && <Text className="text-xs text-red-500 mt-1">{error}</Text>}
        </View>
    );
}
