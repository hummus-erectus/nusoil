/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { formatTimeAgo } from '@/features/notifications/utils/time';

import { useNotifications } from './notifications-context';
import { type Notification } from './types';

export function NotificationScreen() {
  const router = useRouter();
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  const renderNotification = ({ item }: { item: Notification }) => (
    <Pressable
      onPress={() => {
        markAsRead(item.id);
        if (item.action?.onPress) {
          item.action.onPress();
        }
      }}
      className={`border-b border-gray-200 p-4 ${
        !item.read ? 'bg-blue-50' : ''
      }`}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-base font-semibold text-primary">
            {item.title}
          </Text>
          <Text className="mt-1 text-sm text-neutral-600">{item.message}</Text>
          {item.action?.label && (
            <Text className="mt-2 text-sm font-medium text-blue-600">
              {item.action.label}
            </Text>
          )}
        </View>
        {!item.read && (
          <View className="mt-2 size-2 rounded-full bg-blue-500" />
        )}
      </View>
      <Text className="mt-2 text-xs text-gray-500">
        {formatTimeAgo(item.timestamp)}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
        <Text className="text-xl font-semibold">Notifications</Text>
        <View className="flex-row gap-4">
          <Pressable
            onPress={markAllAsRead}
            className="rounded-full bg-gray-100 px-3 py-1"
          >
            <Text className="text-sm text-gray-600">Mark all as read</Text>
          </Pressable>
          <Pressable onPress={() => router.back()}>
            <Text className="text-blue-500">Close</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-4">
            <Text className="text-center text-neutral-600">
              No notifications yet
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
