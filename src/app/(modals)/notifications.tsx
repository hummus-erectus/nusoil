import React from 'react';
import { View } from 'react-native';

import { NotificationScreen } from '@/features/notifications/notification-screen';

export default function NotificationsRoute() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
      }}
    >
      <NotificationScreen />
    </View>
  );
}
