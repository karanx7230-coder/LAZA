import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import { navigate } from '../navigation/navigationService';
export const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
    await messaging().requestPermission();
  } catch (e) {
    console.log(e);
  }
};
export const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();

    console.log('FCM TOKEN:', token);

    return token;
  } catch (e) {
    console.log(e);
  }
};
export const handleNotificationNavigation = () => {
  const idno = 15;
  const unsubscribe = messaging().onNotificationOpenedApp(() => {
    navigate('productstack', { id: idno });
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        navigate('productstack', { id: idno });
      }
    });

  return unsubscribe;
};
export const handleForegroundNotification = () => {
  const unsubscribeFCM = messaging().onMessage(async remoteMessage => {
    console.log('📩 FCM message received:', remoteMessage);

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    try {
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId,
          pressAction: { id: 'default' },
        },
      });
      console.log('✅ Notification displayed');
    } catch (err) {
      console.log('❌ displayNotification failed:', err);
    }
  });

  const unsubscribeNotifee = notifee.onForegroundEvent(({ type }) => {
    if (type === EventType.PRESS) {
      navigate('productstack', { id: 18 });
    }
  });

  return () => {
    unsubscribeFCM();
    unsubscribeNotifee();
  };
};
// export const handleForegroundNotification = () => {
//   return messaging().onMessage(item => {
//     Alert.alert(
//       item.notification?.title,
//       item.notification?.body,
//       [
//         { text: 'Dismiss', style: 'cancel' },
//         {
//           text: 'View',
//           onPress: () => navigate('productstack', { id: 10 }),
//         },
//       ]
//     );
//   });
// };
