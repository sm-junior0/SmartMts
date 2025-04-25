import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/styles/theme';
import { Star } from 'lucide-react-native';

interface RideStatusCardProps {
  time: string;
  pickup: string;
  dropoff: string;
  fare: string;
  paymentMethod: string;
  rating?: number;
  style?: object;
}

export default function RideStatusCard({
  time,
  pickup,
  dropoff,
  fare,
  paymentMethod,
  rating = 5,
  style,
}: RideStatusCardProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time}</Text>
      </View>

      <View style={styles.locationContainer}>
        <Text style={styles.location}>{pickup}</Text>
        <Text style={styles.separator}>-</Text>
        <Text style={styles.location}>{dropoff}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.fareContainer}>
          <Text style={styles.fareAmount}>{fare}</Text>
          <Text style={styles.paymentMethod}>{paymentMethod}</Text>
        </View>

        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={16}
              color={index < rating ? colors.primary.main : colors.text.secondary}
              fill={index < rating ? colors.primary.main : 'none'}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.paper,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  timeContainer: {
    marginBottom: spacing.xs,
  },
  time: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  location: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    flex: 1,
  },
  separator: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginHorizontal: spacing.xs,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fareContainer: {
    flexDirection: 'column',
  },
  fareAmount: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.primary.main,
  },
  paymentMethod: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});