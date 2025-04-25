import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, typography, spacing } from '@/styles/theme';
import Button from '@/components/common/Button';
import { CheckCircle, XCircle } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, Easing } from 'react-native-reanimated';

export default function LicenseValidationResultScreen() {
  const { status } = useLocalSearchParams();
  const isSuccess = status === 'success';
  
  // Animation values
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  
  useEffect(() => {
    // Start animations
    scale.value = withSequence(
      withTiming(1.2, { duration: 400, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 200 })
    );
    
    opacity.value = withTiming(1, { duration: 600 });
    
    contentOpacity.value = withDelay(
      300,
      withTiming(1, { duration: 300 })
    );
  }, []);
  
  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });
  
  const contentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
    };
  });
  
  const handleContinue = () => {
    if (isSuccess) {
      // Navigate to driver home upon successful validation
      router.replace('/driver/home');
    } else {
      // Go back to check license screen to try again
      router.push('/driver/auth/check-license');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, iconStyle]}>
          {isSuccess ? (
            <CheckCircle 
              size={100} 
              color={colors.success.main} 
              strokeWidth={1.5}
            />
          ) : (
            <XCircle 
              size={100} 
              color={colors.error.main} 
              strokeWidth={1.5}
            />
          )}
        </Animated.View>
        
        <Animated.View style={contentStyle}>
          <Text style={styles.resultTitle}>
            {isSuccess ? 'Success!' : 'Error!'}
          </Text>
          
          <Text style={styles.resultMessage}>
            {isSuccess 
              ? 'Your license has been successfully verified. You are now eligible to drive with Smart Motos.' 
              : 'We could not verify your license. Please check your license details and try again.'}
          </Text>
          
          <Button
            text={isSuccess ? 'Continue' : 'Try Again'}
            onPress={handleContinue}
            variant={isSuccess ? 'primary' : 'secondary'}
            fullWidth
            style={styles.actionButton}
          />
          
          {!isSuccess && (
            <Button
              text="Skip For Now"
              onPress={() => router.replace('/driver/home')}
              variant="outline"
              fullWidth
              style={styles.skipButton}
            />
          )}
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  resultTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['4xl'],
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  resultMessage: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
    lineHeight: 24,
  },
  actionButton: {
    marginTop: spacing.md,
  },
  skipButton: {
    marginTop: spacing.md,
  },
});