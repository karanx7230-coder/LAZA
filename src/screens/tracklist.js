import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform, Alert, Button, Text } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

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

export default function TrackingScreen() {
    const [currentPosition, setCurrentPosition] = useState(null); // { latitude, longitude }
    const [trail, setTrail] = useState([]); // array of {latitude, longitude} for Polyline
    const [isTracking, setIsTracking] = useState(false);
    const watchIdRef = useRef(null);
    const mapRef = useRef(null);

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

        // Cleanup: screen unmount hone pe watch band karo
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

        // Ek baar turant current location le lo (map ko center karne ke liye)
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
            },
            (error) => console.warn('getCurrentPosition error:', error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        // Ab live updates ke liye watch lagao
        watchIdRef.current = Geolocation.watchPosition(
            (position) => {
                const coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                setCurrentPosition(coords);
                setTrail((prev) => [...prev, coords]);
            },
            (error) => console.warn('watchPosition error:', error),
            {
                enableHighAccuracy: true,
                distanceFilter: 5, // sirf tab update aaye jab 5 meter se zyada move ho
                interval: 5000, // Android: har 5 sec try karo
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
                    {isTracking ? 'Tracking chal rahi hai...' : 'Tracking band hai'}
                </Text>
                <Button
                    title={isTracking ? 'Stop Tracking' : 'Start Tracking'}
                    onPress={isTracking ? stopTracking : startTracking}
                />
            </View>
        </View>
    );
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
});