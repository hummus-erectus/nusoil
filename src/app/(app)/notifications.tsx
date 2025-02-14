import { Stack } from 'expo-router';
import React from 'react';

import { NotificationScreen } from '@/features/notifications/notification-screen';

export default function NotificationsRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <NotificationScreen />
    </>
  );
}

//How to use

// const { addNotification } = useNotifications();

// Example usage

// // Simple notification without action
// addNotification({
//   title: 'Success',
//   message: 'Operation completed',
//   type: 'success',
//   read: false,
// });

// // Notification with navigation
// addNotification({
//   title: 'New Message',
//   message: 'You have a new message from John',
//   type: 'info',
//   read: false,
//   action: {
//     label: 'View message',
//     onPress: () => router.push('/messages/123'),
//   },
// });

// // Notification with custom action
// addNotification({
//   title: 'Update Available',
//   message: 'A new version is available',
//   type: 'info',
//   read: false,
//   action: {
//     label: 'Update now',
//     onPress: () => {
//       showUpdateModal();
//       // Additional actions...
//     },
//   },
// });
