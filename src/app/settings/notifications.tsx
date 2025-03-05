/* eslint-disable max-lines-per-function */
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { BackButton } from '@/components/back-button';
import { Switch, Text, View } from '@/components/ui';
import { useUserStore } from '@/stores/user-store';

export default function Notifications() {
  const {
    notificationSettings,
    pushNotificationsEnabled,
    emailNotificationsEnabled,
    setNotificationSettings,
    setPushNotificationsEnabled,
    setEmailNotificationsEnabled,
    updateNotificationSetting,
  } = useUserStore();

  // Toggle handlers for push and email notifications
  const togglePushNotification = (id: string) => {
    const setting = notificationSettings.find((s) => s.id === id);
    if (setting) {
      updateNotificationSetting(id, { pushEnabled: !setting.pushEnabled });
    }
  };

  const toggleEmailNotification = (id: string) => {
    const setting = notificationSettings.find((s) => s.id === id);
    if (setting) {
      updateNotificationSetting(id, { emailEnabled: !setting.emailEnabled });
    }
  };

  // Master toggle handlers
  const toggleAllPushNotifications = () => {
    const newValue = !pushNotificationsEnabled;
    setPushNotificationsEnabled(newValue);

    // Update all individual settings
    const updatedSettings = notificationSettings.map((setting) => ({
      ...setting,
      pushEnabled: newValue,
    }));
    setNotificationSettings(updatedSettings);
  };

  const toggleAllEmailNotifications = () => {
    const newValue = !emailNotificationsEnabled;
    setEmailNotificationsEnabled(newValue);

    // Update all individual settings
    const updatedSettings = notificationSettings.map((setting) => ({
      ...setting,
      emailEnabled: newValue,
    }));
    setNotificationSettings(updatedSettings);
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 gap-6 p-6">
        <View className="-ml-10 self-start">
          <BackButton />
        </View>
        <Text className="text-center font-lora text-3xl text-primary">
          Notifications
        </Text>

        {/* Global Notification Settings */}
        <View className="gap-2">
          <Text className="font-poppins-semibold text-xl text-primary">
            Notification Channels
          </Text>

          <View className="gap-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="font-poppins-semibold text-neutral-600">
                  Push Notifications
                </Text>
                <Text className="text-sm text-neutral-500">
                  Receive notifications on your device
                </Text>
              </View>
              <Switch
                checked={pushNotificationsEnabled}
                onChange={toggleAllPushNotifications}
                accessibilityLabel="Toggle push notifications"
              />
            </View>

            <View className="flex-row items-center justify-between">
              <View>
                <Text className="font-poppins-semibold text-neutral-600">
                  Email Notifications
                </Text>
                <Text className="text-sm text-neutral-500">
                  Receive notifications via email
                </Text>
              </View>
              <Switch
                checked={emailNotificationsEnabled}
                onChange={toggleAllEmailNotifications}
                accessibilityLabel="Toggle email notifications"
              />
            </View>
          </View>
        </View>

        {/* Individual Notification Categories */}
        <View className="gap-2">
          <Text className="font-poppins-semibold text-xl text-primary">
            Notification Types
          </Text>

          {notificationSettings.map((setting) => (
            <View
              key={setting.id}
              className="gap-2 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800"
            >
              <View>
                <Text className="font-poppins-semibold text-neutral-600">
                  {setting.title}
                </Text>
                <Text className="text-sm text-neutral-500">
                  {setting.description}
                </Text>
              </View>

              <View className="mt-2 flex-row flex-wrap justify-between">
                <View className="flex-row items-center gap-2">
                  <Text className="text-neutral-500">Push</Text>
                  <Switch
                    checked={setting.pushEnabled}
                    onChange={() => togglePushNotification(setting.id)}
                    disabled={!pushNotificationsEnabled}
                    accessibilityLabel={`Toggle push notifications for ${setting.title}`}
                  />
                </View>

                <View className="flex-row items-center gap-2">
                  <Text className="text-neutral-500">Email</Text>
                  <Switch
                    checked={setting.emailEnabled}
                    onChange={() => toggleEmailNotification(setting.id)}
                    disabled={!emailNotificationsEnabled}
                    accessibilityLabel={`Toggle email notifications for ${setting.title}`}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Note about saving */}
        <View className="mt-4">
          <Text className="text-center text-sm text-neutral-500">
            Your notification preferences are automatically saved.
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
