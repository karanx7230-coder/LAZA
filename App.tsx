import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import StackNavigator from './src/navigation/StackNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { navigationRef } from './src/navigation/navigationService';
import useDeepLinking from './src/service/link';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/redux/store/store';
import { useAppDispatch } from './src/hooks/redux';
import {
  setUser as setUserState,
  clearUser,
} from './src/store/redux/slice/userslice';
import {
  requestNotificationPermission,
  getFCMToken,
  handleNotificationNavigation,
  handleForegroundNotification,
} from './src/service/notification';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <AppRoot />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function AppRoot() {
  const dispatch = useAppDispatch();
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
      if (userState) {
        dispatch(
          setUserState({
            uid: userState.uid,
            name: userState.displayName || '',
            email: userState.email || '',
          }),
        );
      } else {
        dispatch(clearUser());
      }
    });
    return subscriber;
  }, [dispatch]);

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
    <NavigationContainer ref={navigationRef}>
      <StackNavigator user={user} />
    </NavigationContainer>
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
