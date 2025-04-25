import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { colors, typography, spacing } from '@/styles/theme';
import Button from '@/components/common/Button';
import InputField from '@/components/common/InputField';
import SocialButtons from '@/components/common/SocialButtons';

export default function DriverLoginScreen() {
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    phoneOrEmail: '',
    password: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { phoneOrEmail: '', password: '' };

    if (!phoneOrEmail) {
      newErrors.phoneOrEmail = 'Phone or email is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Navigate to driver home upon successful login
        router.replace('/driver/home');
      }, 1500);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Implement social login logic
    console.log(`Login with ${provider}`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Driver Login</Text>
        
        <View style={styles.form}>
          <InputField
            placeholder="Phone or Email"
            value={phoneOrEmail}
            onChangeText={setPhoneOrEmail}
            keyboardType="email-address"
            error={errors.phoneOrEmail}
          />
          
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            showPasswordToggle
            error={errors.password}
          />
          
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <Button
            text="Login"
            onPress={handleLogin}
            loading={loading}
            fullWidth
            style={styles.loginButton}
          />
        </View>
        
        <SocialButtons
          onFacebookPress={() => handleSocialLogin('Facebook')}
          onTwitterPress={() => handleSocialLogin('Twitter')}
          onGooglePress={() => handleSocialLogin('Google')}
        />
        
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Link href="/driver/auth/signup" asChild>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Create New Account</Text>
            </TouchableOpacity>
          </Link>
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
  },
  headerTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['3xl'],
    color: colors.text.primary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.primary.main,
  },
  loginButton: {
    marginTop: spacing.md,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  signupText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
  signupLink: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.primary.main,
  },
});