import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import StackNavigator from './src/navigation/StackNavigator';
import { WishlistProvider } from './src/context/WishlistContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { navigationRef } from './src/navigation/navigationService';
import { StoreProvider } from './src/store';
import useDeepLinking from './src/service/link';
import {
  requestNotificationPermission,
  getFCMToken,
  handleNotificationNavigation,
  handleForegroundNotification,
} from './src/service/notification';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    requestNotificationPermission();
    getFCMToken();
    const unsubscribeForeground = handleForegroundNotification();
    return () => {
      unsubscribeForeground();
    };
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userState: any) => {
      setUser(userState);
      setLoading(false);
    });
    return subscriber;
  }, []);

  useEffect(() => {
    if (!loading) {
      const unsubscribe = handleNotificationNavigation();
      return () => unsubscribe();
    }
  }, [loading]);
      useDeepLinking();
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <StoreProvider>
      <ThemeProvider>
        <WishlistProvider>
          <NavigationContainer ref={navigationRef}>
            <StackNavigator user={user} />
          </NavigationContainer>
        </WishlistProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
