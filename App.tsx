import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import StackNavigator from './src/navigation/StackNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { navigationRef } from './src/navigation/navigationService';
import { StoreProvider } from './src/store';
import useDeepLinking from './src/service/link';
import { Provider } from 'react-redux';
import { store } from './src/store/redux/store/store';
import {
  requestNotificationPermission,
  getFCMToken,
  handleNotificationNavigation,
  handleForegroundNotification,
} from './src/service/notification';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    requestNotificationPermission();
    getFCMToken();
    const unsubscribeForeground = handleForegroundNotification();
    return () => {
      if (unsubscribeForeground) unsubscribeForeground();
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
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [loading]);

  useDeepLinking();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9B72FF" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <SafeAreaProvider>
        <StoreProvider>
          <Provider store={store}>
            <ThemeProvider>
              <NavigationContainer ref={navigationRef}>
                <StackNavigator user={user} />
              </NavigationContainer>
            </ThemeProvider>
          </Provider>
        </StoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
