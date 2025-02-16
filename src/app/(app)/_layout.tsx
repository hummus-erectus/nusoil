/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-unstable-nested-components */
import { Env } from '@env';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Link, Redirect, router, SplashScreen } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui';
import colors from '@/components/ui/colors';
import {
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from '@/components/ui/icons';
import { useAuth } from '@/lib';
import { useUserStore } from '@/stores/user-store';

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  drawerItem: {
    marginVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  drawerText: {
    fontSize: 16,
    fontFamily: 'Poppins-regular',
    color: colors.neutral[100],
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

type DrawerRoute =
  | '/'
  | '/(app)/(tabs)'
  | '/(app)/(tabs)/nutrient-portfolio'
  | '/settings'
  | '/(app)/(tabs)/marketplace'
  | '/(app)/(tabs)/add-on-services'
  | '/(app)/(tabs)/land-wallet'
  | '/upgrade';

interface DrawerItemProps {
  href: DrawerRoute;
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

function DrawerItem({ href, label, icon, onPress }: DrawerItemProps) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.drawerItem} onPress={onPress}>
        {icon}
        <Text style={styles.drawerText}>{label}</Text>
      </Pressable>
    </Link>
  );
}

function CustomDrawerContent(props: any) {
  const signOut = useAuth.use.signOut();
  const subscriptionPlan = useUserStore((state) => state.subscriptionPlan);
  const userName = useUserStore((state) => state.userName);
  const email = useUserStore((state) => state.email);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleDrawerItemPress = (href: DrawerRoute) => {
    if (isNavigating) return;
    setIsNavigating(true);

    props.navigation.closeDrawer();

    requestAnimationFrame(() => {
      router.push(href);
      setTimeout(() => {
        setIsNavigating(false);
      }, 300);
    });
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      {/* Profile Section */}
      <View
        style={[
          styles.drawerItem,
          { flexDirection: 'column', alignItems: 'flex-start', gap: 4 },
        ]}
      >
        <Text
          style={[
            styles.drawerText,
            { fontSize: 20, fontFamily: 'Poppins-semibold' },
          ]}
        >
          {userName}
        </Text>
        <Text
          style={[
            styles.drawerText,
            { fontSize: 14, color: colors.neutral[300] },
          ]}
        >
          {email}
        </Text>
        <View className="flex-row items-center">
          <Text style={[styles.drawerText, { fontSize: 14 }]}>
            {subscriptionPlan} Plan
          </Text>
          {subscriptionPlan !== 'Harvest' && (
            <Button
              variant="ghost"
              fullWidth={false}
              onPress={() => handleDrawerItemPress('/upgrade')}
              label={
                <View className="flex-row items-center justify-center">
                  <Text className="ml-4 text-white underline">Upgrade</Text>
                </View>
              }
            />
          )}
        </View>
      </View>

      <View style={styles.divider} />

      <DrawerItem
        onPress={() => props.navigation.closeDrawer()}
        href="/settings"
        label="Settings"
        icon={<SettingsIcon color={colors.neutral[100]} />}
      />
      <Button
        className="mt-12"
        onPress={signOut}
        variant="outline"
        fullWidth={false}
        label={
          <View className="flex-row items-center justify-center">
            <LogoutIcon color="white" />
            <Text className="ml-4 text-white">Log out</Text>
          </View>
        }
      />
      <Text className="mt-2 text-center text-xs text-neutral-400">
        v{Env?.VERSION ?? '0.0.2'}
      </Text>
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  const status = useAuth.use.status();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }

  return (
    <>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor: colors.primary,
            width: '80%',
          },
          drawerActiveTintColor: colors.primary[600],
          drawerInactiveTintColor: colors.neutral[600],
          swipeEnabled: Platform.OS !== 'android', // Disable swipe gesture on Android
          drawerType: 'front',
          drawerPosition: 'left',
          header: () => <AppHeader />,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            title: 'Home',
          }}
        />
      </Drawer>
    </>
  );
}
