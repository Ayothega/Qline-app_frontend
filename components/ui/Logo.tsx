import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    style?: ViewStyle;
}

export function Logo({ size = 'lg', style }: LogoProps) {
    let qSize = 72;
    let lineSize = 30;

    switch (size) {
        case 'sm':
            qSize = 36;
            lineSize = 15;
            break;
        case 'md':
            qSize = 48;
            lineSize = 20;
            break;
        case 'xl':
            qSize = 96;
            lineSize = 40;
            break;
        default: // lg
            qSize = 72;
            lineSize = 30;
    }

    // Calculate a proportional padding/margin for the Q based on size to avoid clipping
    // and provide correct visual spacing.
    const qMargin = size === 'sm' ? 6 : size === 'md' ? 6 : 8;

    return (
        <View style={style}>
            <Text allowFontScaling={false}>
                <Text
                    style={{ fontSize: qSize, paddingRight: qMargin }}
                    className="font-mono font-extrabold italic text-primary"
                >
                    Q
                </Text>
                <Text
                    style={{ fontSize: lineSize }}
                    className="font-bold text-[#0f172a]"
                >
                    line
                </Text>
            </Text>
        </View>
    );
}

