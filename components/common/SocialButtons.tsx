import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/styles/theme';
import { Facebook as FacebookIcon, Twitter as TwitterIcon, Mail } from 'lucide-react-native';

interface SocialButtonsProps {
  onFacebookPress: () => void;
  onTwitterPress: () => void;
  onGooglePress: () => void;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({
  onFacebookPress,
  onTwitterPress,
  onGooglePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.divider} />
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.socialButton} 
          onPress={onFacebookPress}
          activeOpacity={0.7}
        >
          <FacebookIcon size={24} color="#1877F2" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.socialButton} 
          onPress={onTwitterPress}
          activeOpacity={0.7}
        >
          <TwitterIcon size={24} color="#1DA1F2" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.socialButton} 
          onPress={onGooglePress}
          activeOpacity={0.7}
        >
          <Mail size={24} color="#DB4437" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: spacing.lg,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  dividerText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginHorizontal: spacing.md,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.divider,
  },
});

export default SocialButtons;