import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Redirect } from 'expo-router';
import { colors, typography, spacing } from '@/styles/theme';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

export default function SplashScreen() {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000, easing: Easing.ease });
    scale.value = withTiming(1, { duration: 1000, easing: Easing.elastic(1.2) });
    
    // After 2.5 seconds, redirect to the driver login page
    const timer = setTimeout(() => {
      // Redirect occurs after animation completes
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={styles.title}>Smart Motos</Text>
        <Text style={styles.subtitle}>Ride Smarter</Text>
      </Animated.View>
      
      <Redirect href="/driver/auth/login" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['5xl'],
    color: colors.primary.main,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xl,
    color: colors.text.primary,
    textAlign: 'center',
  },
});