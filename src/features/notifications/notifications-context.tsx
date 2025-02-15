/* eslint-disable max-lines-per-function */

//TODO: Use a backend notifications API for source of truth
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { registerForPushNotificationsAsync } from '@/services/notifications';

import { type Notification, type NotificationsContextType } from './types';

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  // Prefix with underscore to indicate intentionally unused
  const [_expoPushToken, setExpoPushToken] = useState<string>('');
  const router = useRouter();

  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addNotification = (
    notification: Omit<Notification, 'id' | 'timestamp'>
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) {
          setExpoPushToken(token);
          console.log('Push token:', token);
        }
      })
      .catch(console.error);

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const { title, body, data } = notification.request.content;
        addNotification({
          title: title || 'New Notification',
          message: body || '',
          type: (data?.type as any) || 'info',
          read: false,
          action: data?.actionRoute
            ? {
                label: (data.actionLabel as string) || 'View',
                onPress: () => {
                  // Use type assertion for route path
                  router.push(data.actionRoute as `/${string}`);
                },
              }
            : undefined,
        });
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        if (data?.actionRoute) {
          // Use type assertion for route path
          router.push(data.actionRoute as `/${string}`);
        }
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [router]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationsProvider'
    );
  }
  return context;
}
