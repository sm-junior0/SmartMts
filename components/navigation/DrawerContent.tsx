import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/styles/theme';
import { Chrome as Home, Car, User, LogOut, Star } from 'lucide-react-native';

const PROFILE_IMAGE = "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300";

const menuItems = [
  { icon: Home, label: 'Home', route: '/' },
  { icon: Car, label: 'Rides', route: '/rides' },
  { icon: User, label: 'Account', route: '/account' },
];

export default function DrawerContent(props: any) {
  const router = useRouter();

  const handleSignOut = () => {
    router.replace('/driver/auth/login');
  };

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: PROFILE_IMAGE }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Kamana Emmanuel</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              color={colors.primary.main}
              fill={colors.primary.main}
            />
          ))}
        </View>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.route)}
          >
            <item.icon size={24} color={colors.text.primary} />
            <Text style={styles.menuItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.menuItem, styles.signOutButton]}
        onPress={handleSignOut}
      >
        <LogOut size={24} color={colors.error.main} />
        <Text style={[styles.menuItemText, styles.signOutText]}>Sign Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.paper,
  },
  profileSection: {
    alignItems: 'center',
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  name: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.xl,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuSection: {
    padding: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xs,
  },
  menuItemText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
  signOutButton: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  signOutText: {
    color: colors.error.main,
  },
});