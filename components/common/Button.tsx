import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle,
  Platform
} from 'react-native';
import { colors, typography, borderRadius, spacing } from '@/styles/theme';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface ButtonProps {
  text: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  // Animation for press effect
  const scale = useSharedValue(1);
  
  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };
  
  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Get button styles based on variant and size
  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      opacity: disabled ? 0.6 : 1,
    };

    // Add size-specific styles
    if (size === 'small') {
      baseStyle.paddingVertical = spacing.xs;
      baseStyle.paddingHorizontal = spacing.md;
    } else if (size === 'medium') {
      baseStyle.paddingVertical = spacing.sm;
      baseStyle.paddingHorizontal = spacing.md;
    } else if (size === 'large') {
      baseStyle.paddingVertical = spacing.md;
      baseStyle.paddingHorizontal = spacing.lg;
    }

    // Add variant-specific styles
    if (variant === 'primary') {
      baseStyle.backgroundColor = colors.primary.main;
    } else if (variant === 'secondary') {
      baseStyle.backgroundColor = colors.secondary.main;
    } else if (variant === 'outline') {
      baseStyle.backgroundColor = 'transparent';
      baseStyle.borderWidth = 1;
      baseStyle.borderColor = colors.primary.main;
    } else if (variant === 'text') {
      baseStyle.backgroundColor = 'transparent';
    }

    // Add fullWidth style if needed
    if (fullWidth) {
      baseStyle.width = '100%';
    }

    return baseStyle;
  };

  // Get text styles based on variant and size
  const getTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: typography.fontFamily.medium,
    };

    // Add size-specific styles
    if (size === 'small') {
      baseStyle.fontSize = typography.fontSize.sm;
    } else if (size === 'medium') {
      baseStyle.fontSize = typography.fontSize.md;
    } else if (size === 'large') {
      baseStyle.fontSize = typography.fontSize.lg;
    }

    // Add variant-specific styles
    if (variant === 'primary') {
      baseStyle.color = colors.primary.contrastText;
    } else if (variant === 'secondary') {
      baseStyle.color = colors.secondary.contrastText;
    } else if (variant === 'outline' || variant === 'text') {
      baseStyle.color = colors.primary.main;
    }

    return baseStyle;
  };

  return (
    <Animated.View style={[animatedStyle, fullWidth && styles.fullWidth]}>
      <TouchableOpacity
        style={[getButtonStyles(), style]}
        onPress={onPress}
        disabled={disabled || loading}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={variant === 'primary' ? colors.primary.contrastText : colors.primary.main} 
          />
        ) : (
          <>
            {leftIcon && <>{leftIcon}</>}
            <Text style={[getTextStyles(), textStyle, leftIcon && { marginLeft: spacing.sm }, rightIcon && { marginRight: spacing.sm }]}>
              {text}
            </Text>
            {rightIcon && <>{rightIcon}</>}
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
});

export default Button;