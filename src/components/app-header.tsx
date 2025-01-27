import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import colors from '@/components/ui/colors';
import {
  HamburgerMenu as HamburgerMenuIcon,
  NotificationBell as NotificationBellIcon,
} from '@/components/ui/icons';

export function AppHeader() {
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
          >
            <NotificationBellIcon
              color={colors.neutral[100]}
              className="w-full"
            />
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            /* TODO: Handle menu press */
          }}
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
    paddingBottom: 24,
    paddingTop: 63,
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
