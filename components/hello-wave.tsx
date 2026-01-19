import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Text } from 'react-native';

export function HelloWave() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 150 }),
        withTiming(0, { duration: 150 })
      ),
      4 // Run 4 times
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  // Note: NativeWind might not directly style Animated.Text perfectly if using className for transform/animations in strict reanimated logic,
  // but for static props it works. Reanimated 'style' prop is best for the animation part.

  return (
    <Animated.Text
      style={animatedStyle}
      className="text-3xl leading-8 -mt-1.5"
    >
      👋
    </Animated.Text>
  );
}
