export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  type?: 'info' | 'warning' | 'success' | 'error';
  action?: {
    label: string;
    onPress: () => void;
  };
}

export type NotificationsContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp'>
  ) => void;
};
