import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform, Alert, Button, Text } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Routes } from '../utils';

// Reuse the SAME key you already added for Maps SDK for Android in AndroidManifest.xml.
// You must also enable "Geocoding API" for this key/project in Google Cloud Console
// (APIs & Services -> Library -> Geocoding API -> Enable). Maps SDK and Geocoding API
// are billed/quota'd separately even though they share one key.
const GOOGLE_MAPS_API_KEY = 'AIzaSyBWH0MfwaB8TzFHtYSpcnS-Y-JZ-aERwz4';

// ---- Permission helpers ----
const checkLocationPermission = async () => {
    if (Platform.OS !== 'android') return true;
    return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
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
        }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
};

// ---- Reverse geocoding: lat/lng -> city, country, pincode ----
const reverseGeocode = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' || !data.results?.length) {
        console.warn('Geocoding failed:', data.status, data.error_message);
        return null;
    }

    // Google returns multiple results (most specific first). Pull the address
    // components we care about from the first (most specific) result.
    const components = data.results[0].address_components;

    const find = (type) =>
        components.find((c) => c.types.includes(type))?.long_name ?? null;

    return {
        formattedAddress: data.results[0].formatted_address,
        city: find('locality') || find('administrative_area_level_2'), // fallback for areas without a 'locality'
        state: find('administrative_area_level_1'),
        country: find('country'),
        pincode: find('postal_code'),
    };
};

export default function TrackingScreen({ navigation }) {
    const [currentPosition, setCurrentPosition] = useState(null); // { latitude, longitude }
    const [trail, setTrail] = useState([]); // array of {latitude, longitude} for Polyline
    const [isTracking, setIsTracking] = useState(false);
    const [address, setAddress] = useState(null); // { formattedAddress, city, state, country, pincode }
    const watchIdRef = useRef(null);
    const mapRef = useRef(null);

    // Throttle reverse geocoding: only geocode when the user moved a meaningful
    // distance, not on every watchPosition tick (Geocoding API is billed per call).
    const lastGeocodedRef = useRef(null);

    const maybeReverseGeocode = async (coords) => {
        const last = lastGeocodedRef.current;
        if (last) {
            const movedMeters = haversineMeters(last, coords);
            if (movedMeters < 50) return; // skip: hasn't moved far enough to matter
        }
        lastGeocodedRef.current = coords;

        const result = await reverseGeocode(coords.latitude, coords.longitude);
        if (result) setAddress(result);
    };

    // Ek baar mount pe permission ensure karo
    useEffect(() => {
        (async () => {
            const already = await checkLocationPermission();
            if (!already) {
                const ok = await requestLocationPermission();
                if (!ok) {
                    Alert.alert('Permission chahiye', 'Tracking ke liye location permission zaroori hai');
                }
            }
        })();

        return () => {
            if (watchIdRef.current !== null) {
                Geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, []);

    const startTracking = async () => {
        const hasPermission = await checkLocationPermission();
        if (!hasPermission) {
            const ok = await requestLocationPermission();
            if (!ok) return;
        }

        Geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                setCurrentPosition(coords);
                setTrail([coords]);
                mapRef.current?.animateToRegion({
                    ...coords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                maybeReverseGeocode(coords);
            },
            (error) => console.warn('getCurrentPosition error:', error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        watchIdRef.current = Geolocation.watchPosition(
            (position) => {
                const coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                setCurrentPosition(coords);
                setTrail((prev) => [...prev, coords]);
                maybeReverseGeocode(coords);
            },
            (error) => console.warn('watchPosition error:', error),
            {
                enableHighAccuracy: true,
                distanceFilter: 5,
                interval: 5000,
                fastestInterval: 2000,
            }
        );

        setIsTracking(true);
    };

    const stopTracking = () => {
        if (watchIdRef.current !== null) {
            Geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
        setIsTracking(false);
    };

    const handleSave = () => {
        if (!currentPosition) {
            Alert.alert('Save location', 'Pehle Start Tracking dabayein aur location load hone ka intezaar karein');
            return;
        }
        navigation.navigate(Routes.ADDRESS, {
            savedLocation: {
                fulladdress:
                    address?.formattedAddress ||
                    `Latitude: ${currentPosition.latitude.toFixed(6)}, Longitude: ${currentPosition.longitude.toFixed(6)}`,
                city: address?.city || '',
                country: address?.country || '',
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
                    latitude: 28.6139,
                    longitude: 77.209,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {currentPosition && (
                    <Marker coordinate={currentPosition} title="Aap yahan hain" />
                )}

                {trail.length > 1 && (
                    <Polyline
                        coordinates={trail}
                        strokeColor="#1E90FF"
                        strokeWidth={4}
                    />
                )}
            </MapView>

            <View style={styles.controls}>
                <Text style={styles.statusText}>
                </Text>
                <Text style={styles.statusText}>
                    {isTracking ? 'Tracking chal rahi hai...' : 'Tracking band hai'}
                </Text>

                {address && (
                    <View style={styles.addressBox}>
                        <Text style={styles.addressText}>{address.formattedAddress}</Text>
                        <Text style={styles.addressDetail}>
                            {[address.city, address.state, address.country]
                                .filter(Boolean)
                                .join(', ')}
                            {address.pincode ? ` - ${address.pincode}` : ''}
                        </Text>
                    </View>
                )}

                <View style={styles.buttonsRow}>
                    <Button
                        title={isTracking ? 'Stop Tracking' : 'Start Tracking'}
                        onPress={isTracking ? stopTracking : startTracking}
                    />
                    <Button title="Save" onPress={handleSave} />
                </View>
            </View>
        </View>
    );
}

// Distance between two {latitude, longitude} points, in meters.
function haversineMeters(a, b) {
    const R = 6371000;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(b.latitude - a.latitude);
    const dLon = toRad(b.longitude - a.longitude);
    const lat1 = toRad(a.latitude);
    const lat2 = toRad(b.latitude);

    const h =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    controls: {
        padding: 16,
        backgroundColor: '#fff',
    },
    statusText: {
        marginBottom: 8,
        fontSize: 14,
        color: '#333',
    },
    addressBox: {
        marginBottom: 12,
        padding: 10,
        backgroundColor: '#f0f4f8',
        borderRadius: 8,
    },
    addressText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111',
    },
    addressDetail: {
        fontSize: 13,
        color: '#555',
        marginTop: 2,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
    },
});