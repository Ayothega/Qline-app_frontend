import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper to merge Tailwind Classes if nativewind supports it or just use clsx
// For basic NativeWind usage, we usually just pass string classes.
// But keeping `clsx` logic for variants is good.

interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'default' | 'lg';
    isLoading?: boolean;
    disabled?: boolean;
    className?: string; // Add className prop support
}

export function Button({
    onPress,
    title,
    variant = 'primary',
    size = 'default',
    isLoading = false,
    disabled = false,
    className,
}: ButtonProps) {

    const baseClasses = "flex-row justify-center items-center rounded-lg";

    const variantClasses = {
        primary: "bg-primary",
        outline: "bg-transparent border border-gray-200",
        ghost: "bg-transparent",
    };

    const sizeClasses = {
        default: "py-2.5 px-4",
        lg: "py-3.5 px-5 rounded-xl",
    };

    const textBaseClasses = "font-semibold text-center text-base";

    const textVariantClasses = {
        primary: "text-white",
        outline: "text-gray-800",
        ghost: "text-gray-800",
    };

    const disabledClasses = disabled ? "opacity-50" : "";

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || isLoading}
            className={twMerge(clsx(
                baseClasses,
                variantClasses[variant],
                sizeClasses[size],
                disabledClasses,
                className
            ))}
            activeOpacity={0.8}
        >
            {isLoading ? (
                <ActivityIndicator color={variant === 'primary' ? '#fff' : '#2563eb'} />
            ) : (
                <Text className={twMerge(clsx(
                    textBaseClasses,
                    textVariantClasses[variant],
                    disabled && "text-gray-400"
                ))}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}
