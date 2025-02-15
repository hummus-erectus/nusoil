import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { sendPushNotification } from '@/services/notifications';

export function NotificationTest({ token }: { token?: string }) {
  const [sending, setSending] = useState(false);

  const handleTestNotification = async () => {
    if (!token) {
      console.warn('No push token available');
      return;
    }

    setSending(true);
    try {
      await sendPushNotification(token);
      console.log('Test notification sent');
    } catch (error) {
      console.error('Failed to send test notification:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <View className="p-4">
      <Text className="mb-2 text-sm text-neutral-600">
        Push Token: {token || 'Not available'}
      </Text>
      <Pressable
        onPress={handleTestNotification}
        disabled={sending || !token}
        className={`rounded-lg bg-primary px-4 py-2 ${
          !token || sending ? 'opacity-50' : ''
        }`}
      >
        <Text className="text-center text-white">
          {sending ? 'Sending...' : 'Send Test Notification'}
        </Text>
      </Pressable>
    </View>
  );
}
