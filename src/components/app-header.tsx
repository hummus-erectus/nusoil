import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import colors from '@/components/ui/colors';
import {
  HamburgerMenu as HamburgerMenuIcon,
  NotificationBell as NotificationBellIcon,
} from '@/components/ui/icons';

export function AppHeader() {
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
      <Image
        source={require('../../assets/splash-icon.png')}
        style={styles.logo}
      />

      <View className="flex flex-row gap-14">
        <View style={styles.headerRight}>
          <Pressable
            onPress={() => {
              /* TODO: Handle notification press */
            }}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            style={{ padding: 8 }}
          >
            <NotificationBellIcon
              color={colors.neutral[100]}
              className="w-full"
            />
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          style={{ padding: 8 }}
        >
          <HamburgerMenuIcon color={colors.neutral[100]} />
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
    height: 30,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
