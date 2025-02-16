import { DrawerActions } from '@react-navigation/native';
import { useNavigation, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import colors from '@/components/ui/colors';
import {
  NotificationBell as NotificationBellIcon,
  Profile as ProfileIcon,
} from '@/components/ui/icons';
import { useNotifications } from '@/features/notifications/notifications-context';

const getHeaderTitle = (pathname: string) => {
  if (pathname.includes('/land-wallet')) {
    return 'Land Wallet';
  }
  if (pathname.includes('/nutrient-portfolio')) {
    return 'Nutrient Portfolio';
  }
  if (pathname.includes('/marketplace')) {
    return 'Marketplace';
  }
  return '';
};

export function AppHeader() {
  const router = useRouter();
  const navigation = useNavigation();
  const pathname = usePathname();
  const { unreadCount } = useNotifications();
  const headerTitle = getHeaderTitle(pathname);
  const showLogo =
    pathname === '/' || pathname === '/index' || pathname.endsWith('/(tabs)');

  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
      {showLogo ? (
        <Image
          source={require('../../assets/splash-icon.png')}
          style={styles.logo}
        />
      ) : (
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      )}

      <View className="flex flex-row gap-14">
        <View style={styles.headerRight}>
          <Pressable
            onPress={() => {
              router.push('/(app)/notifications');
            }}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            style={{ padding: 8 }}
          >
            <View className="relative">
              <NotificationBellIcon
                color={colors.neutral[100]}
                className="w-full"
              />
              {unreadCount > 0 && (
                <View className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1">
                  <Text className="text-xs font-bold text-white">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          style={{ padding: 8 }}
        >
          <ProfileIcon color={colors.neutral[100]} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 40,
  },
  logo: {
    width: 100,
    height: 24,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    color: colors.neutral[100],
    fontSize: 20,
    fontFamily: 'Lora-VariableFont_wght',
  },
});
