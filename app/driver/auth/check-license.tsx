import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors, typography, spacing } from '@/styles/theme';
import Button from '@/components/common/Button';
import InputField from '@/components/common/InputField';
import Dropdown from '@/components/common/Dropdown';

export default function CheckLicenseScreen() {
  const [licenseType, setLicenseType] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    licenseType: '',
    licenseNumber: '',
  });

  const licenseTypes = [
    { label: 'Motorcycle License', value: 'motorcycle' },
    { label: 'Commercial License', value: 'commercial' },
    { label: 'Private License', value: 'private' },
    { label: 'Public Transport License', value: 'public_transport' },
  ];

  const validateForm = () => {
    let valid = true;
    const newErrors = { licenseType: '', licenseNumber: '' };

    if (!licenseType) {
      newErrors.licenseType = 'License type is required';
      valid = false;
    }

    if (!licenseNumber) {
      newErrors.licenseNumber = 'License number is required';
      valid = false;
    } else if (licenseNumber.length < 5) {
      newErrors.licenseNumber = 'Invalid license number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleVerify = () => {
    if (validateForm()) {
      setLoading(true);
      
      // Simulate API call to verify license
      setTimeout(() => {
        setLoading(false);
        
        // Send OTP for verification
        router.push('/driver/auth/otp-verification');
      }, 1500);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        <Text style={styles.headerTitle}>Check License Validity</Text>
        <Text style={styles.headerSubtitle}>Enter your license details for verification</Text>
        
        <View style={styles.form}>
          <Dropdown
            placeholder="Select License Type"
            options={licenseTypes}
            value={licenseType}
            onChange={setLicenseType}
            error={errors.licenseType}
          />
          
          <InputField
            placeholder="License Number"
            value={licenseNumber}
            onChangeText={setLicenseNumber}
            error={errors.licenseNumber}
          />
          
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              Note: We'll verify your driving license with the transportation department to ensure eligibility.
            </Text>
          </View>
          
          <Button
            text="Verify License"
            onPress={handleVerify}
            loading={loading}
            fullWidth
            style={styles.verifyButton}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.skipContainer}
          onPress={() => router.push('/driver/auth/otp-verification')}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
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
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  noteContainer: {
    backgroundColor: colors.background.light,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.md,
  },
  noteText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  verifyButton: {
    marginTop: spacing.md,
  },
  skipContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  skipText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    textDecorationLine: 'underline',
  },
});