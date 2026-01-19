import { Text, type TextProps } from 'react-native';
import clsx from 'clsx';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  className?: string; // Add className prop support if passed down
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  className,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // Mapping types to tailwind classes
  const typeClasses = {
    default: "text-base leading-6",
    defaultSemiBold: "text-base leading-6 font-semibold",
    title: "text-[32px] font-bold leading-8",
    subtitle: "text-xl font-bold",
    link: "text-base leading-[30px] text-[#0a7ea4]",
  };

  return (
    <Text
      style={[{ color }, style]} // Keep color dynamic via style for now, or could use css variables
      className={clsx(typeClasses[type], className)}
      {...rest}
    />
  );
}
