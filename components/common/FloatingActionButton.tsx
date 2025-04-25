import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/styles/theme';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  backgroundColor?: string;
  size?: number;
  style?: object;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function FloatingActionButton({
  onPress,
  icon,
  position = 'bottom-right',
  backgroundColor = colors.primary.main,
  size = 56,
  style,
}: FloatingActionButtonProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(1, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  const getPositionStyle = () => {
    switch (position) {
      case 'top-left':
        return { top: spacing.xl, left: spacing.xl };
      case 'top-right':
        return { top: spacing.xl, right: spacing.xl };
      case 'bottom-left':
        return { bottom: spacing.xl, left: spacing.xl };
      case 'bottom-right':
        return { bottom: spacing.xl, right: spacing.xl };
    }
  };

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          width: size,
          height: size,
          ...getPositionStyle(),
        },
        animatedStyle,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon}
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
});