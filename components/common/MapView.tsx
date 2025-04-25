import React from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import { colors } from '@/styles/theme';
import { Marker } from 'react-native-maps';

interface MapViewProps {
  style?: object;
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  markers?: Array<{
    id: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
    title?: string;
    description?: string;
  }>;
}

const defaultRegion = {
  latitude: 0.3476,
  longitude: 32.5825,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Create a lazy-loaded version of the map components for mobile
const LazyMapView = React.lazy(() => 
  Platform.select({
    native: () => require('react-native-maps'),
    default: () => ({ default: () => null }), // Fallback for web
  })()
);

const MapViewComponent = ({ 
  style,
  initialRegion = defaultRegion,
  markers = []
}: MapViewProps) => {
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, style, styles.webPlaceholder]}>
        <Text style={styles.webText}>Map view is not available on web platform</Text>
        <Text style={styles.webSubText}>Please use the mobile app to access the full map features</Text>
      </View>
    );
  }

  return (
    <React.Suspense fallback={<View style={styles.container} />}>
      <LazyMapView
        style={[styles.container, style]}
        provider={Platform.OS === 'android' ? 'PROVIDER_GOOGLE' : undefined}
        initialRegion={initialRegion}
        customMapStyle={mapStyle}
      >
        {markers?.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </LazyMapView>
    </React.Suspense>
  );
};

export default function MapView(props: MapViewProps) {
  // This wrapper component ensures the web check happens before any native imports
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, props.style, styles.webPlaceholder]}>
        <Text style={styles.webText}>Map view is not available on web platform</Text>
        <Text style={styles.webSubText}>Please use the mobile app to access the full map features</Text>
      </View>
    );
  }

  return <MapViewComponent {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  webPlaceholder: {
    backgroundColor: colors.background.light,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webText: {
    fontSize: 18,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  webSubText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
  }
});

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];