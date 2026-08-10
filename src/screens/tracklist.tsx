import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Routes } from '../utils';

const checkLocationPermission = async () => {
  if (Platform.OS !== 'android') return true;
  return PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
};

const requestLocationPermission = async () => {
  if (Platform.OS !== 'android') return true;
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location Permission',
      message: 'Live tracking ke liye location permission chahiye',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    },
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export default function TrackingScreen({ navigation }: any) {
  const [currentPosition, setCurrentPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const mapRef = useRef<MapView | null>(null);

  // Ek baar mount pe permission ensure karo
  useEffect(() => {
    (async () => {
      const already = await checkLocationPermission();

      if (already) {
        await Getcurrent();
      } else {
        const ok = await requestLocationPermission();
        if (ok) {
          await Getcurrent();
        } else {
          Alert.alert(
            'Permission denied',
            'need permission to access location',
          );
        }
      }
    })();
  }, []);

  const Getcurrent = async () => {
    const hasPermission = await checkLocationPermission();
    if (!hasPermission) {
      const ok = await requestLocationPermission();
      if (!ok) return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCurrentPosition(coords);
        mapRef.current?.animateToRegion({
          ...coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      error => console.warn('getCurrentPosition error:', error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
  const handleSave = () => {
    if (!currentPosition) {
      Alert.alert(
        'Save location',
        'Pehle Start Tracking dabayein aur location load hone ka intezaar karein',
      );
      return;
    }
    navigation.replace(Routes.ADDRESS, {
      savedLocation: {
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
      },
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.32137,
          longitude: -121.99687,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {currentPosition && (
          <Marker coordinate={currentPosition} title="Aap yahan hain" />
        )}
      </MapView>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text>Save Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    width: 150,
    alignItems: 'center',
    borderRadius: 8,
  },
  statusText: {
    marginBottom: 8,
    fontSize: 14,
    color: '#333',
  },
});
