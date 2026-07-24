// index.js
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import App from './App';
import 'react-native-url-polyfill/auto';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: {
      channelId,
      pressAction: { id: 'default' },
    },
  });
});

AppRegistry.registerComponent(appName, () => App);