import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '@/styles/theme';
import Button from '@/components/common/Button';
import MapView from '@/components/common/MapView';
import { Star, Clock, MapPin } from 'lucide-react-native';

const RIDER_IMAGE = "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300";

export default function RideRequestScreen() {
  const router = useRouter();

  const handleAccept = () => {
    router.push('/driver/rides/navigate-pickup');
  };

  const handleDecline = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      
      <View style={styles.bottomSheet}>
        <View style={styles.riderInfo}>
          <Image
            source={{ uri: RIDER_IMAGE }}
            style={styles.riderImage}
          />
          <View style={styles.riderDetails}>
            <Text style={styles.riderName}>John Doe</Text>
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
        </View>

        <View style={styles.tripDetails}>
          <View style={styles.detailRow}>
            <Clock size={20} color={colors.text.secondary} />
            <Text style={styles.detailText}>Estimated trip time: 25 mins</Text>
          </View>
          <View style={styles.detailRow}>
            <MapPin size={20} color={colors.text.secondary} />
            <Text style={styles.detailText}>Distance: 5.2 km</Text>
          </View>
        </View>

        <View style={styles.locationInfo}>
          <Text style={styles.locationLabel}>Pickup</Text>
          <Text style={styles.locationText}>Nyabugogo Bus Station</Text>
          <Text style={styles.locationLabel}>Dropoff</Text>
          <Text style={styles.locationText}>Masaka Center</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            text="Decline"
            onPress={handleDecline}
            variant="outline"
            style={styles.declineButton}
          />
          <Button
            text="Accept"
            onPress={handleAccept}
            style={styles.acceptButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  map: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: colors.background.paper,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.xl,
  },
  riderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  riderImage: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.full,
    marginRight: spacing.md,
  },
  riderDetails: {
    flex: 1,
  },
  riderName: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  tripDetails: {
    backgroundColor: colors.background.light,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  detailText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
  locationInfo: {
    marginBottom: spacing.xl,
  },
  locationLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  locationText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  declineButton: {
    flex: 1,
    marginRight: spacing.md,
  },
  acceptButton: {
    flex: 1,
  },
});