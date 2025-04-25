import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors, typography, spacing } from '@/styles/theme';
import Button from '@/components/common/Button';
import OtpInput from '@/components/common/OtpInput';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';

export default function OtpVerificationScreen() {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Animation for error message
  const shakeValue = useSharedValue(0);
  const errorOpacity = useSharedValue(0);
  
  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeValue.value }],
    };
  });
  
  const errorStyle = useAnimatedStyle(() => {
    return {
      opacity: errorOpacity.value,
    };
  });
  
  // Countdown timer for OTP resend
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      setResendDisabled(false);
    }
  }, [timeLeft]);
  
  const handleVerifyOtp = () => {
    if (otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      errorOpacity.value = withTiming(1, { duration: 300 });
      shakeValue.value = withRepeat(
        withTiming(10, { duration: 100 }), 
        5, 
        true
      );
      setTimeout(() => {
        shakeValue.value = withTiming(0);
      }, 500);
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      setLoading(false);
      
      // For demonstration purposes, we'll show success screen 
      // In a real app, this would be based on API response
      const isSuccess = Math.random() > 0.3; // 70% chance of success
      
      if (isSuccess) {
        router.push({
          pathname: '/driver/auth/license-validation-result',
          params: { status: 'success' }
        });
      } else {
        router.push({
          pathname: '/driver/auth/license-validation-result',
          params: { status: 'error' }
        });
      }
    }, 1500);
  };
  
  const handleResendOtp = () => {
    // Reset timer and disable resend button
    setTimeLeft(60);
    setResendDisabled(true);
    
    // Clear any existing OTP
    setOtp('');
    
    // Show success message
    // You would normally trigger an API call here to resend OTP
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Verification</Text>
        <Text style={styles.headerSubtitle}>We've sent a verification code to your phone number</Text>
        
        <View style={styles.form}>
          <Animated.View style={shakeStyle}>
            <OtpInput
              length={4}
              value={otp}
              onChange={setOtp}
              autoFocus
            />
          </Animated.View>
          
          <Animated.Text style={[styles.errorText, errorStyle]}>
            {error}
          </Animated.Text>
          
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {resendDisabled 
                ? `Resend code in ${timeLeft}s` 
                : 'Didn\'t receive the code?'}
            </Text>
            
            {!resendDisabled && (
              <TouchableOpacity onPress={handleResendOtp}>
                <Text style={styles.resendText}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <Button
            text="Verify"
            onPress={handleVerifyOtp}
            loading={loading}
            fullWidth
            style={styles.verifyButton}
          />
        </View>
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
  headerTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['3xl'],
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.error.main,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  timerText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginRight: spacing.xs,
  },
  resendText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.primary.main,
  },
  verifyButton: {
    marginTop: spacing.lg,
  },
});