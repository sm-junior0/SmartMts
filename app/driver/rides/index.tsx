import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/styles/theme';
import MapView from '@/components/common/MapView';

export default function RidesScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
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
});