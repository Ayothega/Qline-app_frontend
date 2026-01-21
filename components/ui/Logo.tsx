import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    style?: ViewStyle;
}

export function Logo({ size = 'lg', style }: LogoProps) {
    // Map abstract sizes to numeric values for SVG/font scaling
    const sizeMap = {
        sm: { height: 40, qSize: 32, lineSize: 16 },
        md: { height: 60, qSize: 48, lineSize: 24 },
        lg: { height: 80, qSize: 64, lineSize: 32 },
        xl: { height: 100, qSize: 84, lineSize: 42 },
    };

    const s = sizeMap[size];

    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
            <Svg height={s.height} width={s.height * 0.8} viewBox="0 0 100 100">
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0" stopColor="#2563EB" stopOpacity="1" />
                        <Stop offset="1" stopColor="#4F46E5" stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                {/* 
                  Using SVG Text for gradient fill support. 
                  Adjust fonts as needed. 'font-extrabold italic' maps generally to fontWeight="800" fontStyle="italic".
                */}
                <SvgText
                    fill="url(#grad)"
                    stroke="none"
                    fontSize="100"
                    fontWeight="800"
                    fontStyle="italic"
                    x="50"
                    y="80"
                    textAnchor="middle"
                >
                    Q
                </SvgText>
            </Svg>

            <Text
                className="text-slate-900 font-bold tracking-tight"
                style={{ fontSize: s.lineSize, lineHeight: s.lineSize * 1.2, marginLeft: s.lineSize * 0.1 }}
            >
                line
            </Text>
        </View>
    );
}

