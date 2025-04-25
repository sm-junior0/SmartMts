import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/styles/theme';

interface OtpInputProps {
  length: number;
  value: string;
  onChange: (otp: string) => void;
  containerStyle?: object;
  inputStyle?: object;
  autoFocus?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 4,
  value,
  onChange,
  containerStyle,
  inputStyle,
  autoFocus = true,
}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [isFocused, setIsFocused] = useState<boolean[]>(Array(length).fill(false));
  
  // Initialize with correct array length when component mounts
  useEffect(() => {
    inputRefs.current = Array(length).fill(null);
    setIsFocused(Array(length).fill(false));
  }, [length]);

  // Split the current OTP value into an array of single characters
  const otpValues = value.split('').concat(Array(length).fill('')).slice(0, length);

  const handleChange = (text: string, index: number) => {
    // Ensure we only allow one character
    const digit = text.slice(-1);
    
    // Allow only numbers
    if (/^\d*$/.test(digit) || digit === '') {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = digit;
      
      // Join and update parent
      const newOtp = newOtpValues.join('');
      onChange(newOtp);
      
      // Move to next input if a digit was entered
      if (digit !== '' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace') {
      if (otpValues[index] === '' && index > 0) {
        // If current input is empty and we press backspace, move to previous input
        const newOtpValues = [...otpValues];
        newOtpValues[index - 1] = '';
        onChange(newOtpValues.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleFocus = (index: number) => {
    const newFocused = [...isFocused];
    newFocused[index] = true;
    setIsFocused(newFocused);
  };

  const handleBlur = (index: number) => {
    const newFocused = [...isFocused];
    newFocused[index] = false;
    setIsFocused(newFocused);
  };

  const handleInputPress = (index: number) => {
    // If a later box is pressed, move focus to the first empty box or the last filled box
    let focusIndex = index;
    const filledIndices = otpValues.findIndex(v => v === '');
    
    if (filledIndices === -1) {
      // All filled, focus on the requested index
      focusIndex = index;
    } else if (filledIndices < index) {
      // Empty box exists before the requested index
      focusIndex = filledIndices;
    }
    
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Array(length).fill(0).map((_, index) => (
        <TextInput
          key={`otp-${index}`}
          ref={ref => inputRefs.current[index] = ref}
          style={[
            styles.input,
            isFocused[index] && styles.inputFocused,
            otpValues[index] && styles.inputFilled,
            inputStyle
          ]}
          maxLength={1}
          keyboardType="numeric"
          value={otpValues[index]}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          onBlur={() => handleBlur(index)}
          onPressIn={() => handleInputPress(index)}
          autoFocus={autoFocus && index === 0}
          selectionColor={colors.primary.main}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    textAlign: 'center',
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    backgroundColor: colors.background.paper,
    borderColor: colors.secondary.light,
  },
  inputFocused: {
    borderColor: colors.primary.main,
    backgroundColor: colors.background.light,
  },
  inputFilled: {
    borderColor: colors.primary.main,
  },
});

export default OtpInput;