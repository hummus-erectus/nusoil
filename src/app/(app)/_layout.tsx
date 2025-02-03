/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-unstable-nested-components */
import { Env } from '@env';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Link, Redirect, SplashScreen } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback, useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui';
import colors from '@/components/ui/colors';
import {
  Clipboard as ClipboardIcon,
  Home as HomeIcon,
  Key as KeyIcon,
  Logout as LogoutIcon,
  NutrientManagement as NutrientManagementIcon,
  NutrientPortfolio as NutrientPortfolioIcon,
  Profile as ProfileIcon,
  Unlock as UnlockIcon,
} from '@/components/ui/icons';
import { useAuth } from '@/lib';

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
  | '/(app)/(tabs)'
  | '/(app)/(tabs)/nutrient-management'
  | '/(app)/(tabs)/nutrient-portfolio'
  | '/(app)/(tabs)/settings'
  | '/(app)/(tabs)/privacy-statement'
  | '/(app)/(tabs)/terms-of-use'
  | '/(app)/(tabs)/password-policy';

interface DrawerItemProps {
  href: DrawerRoute;
  label: string;
  icon: React.ReactNode;
}

function DrawerItem({ href, label, icon }: DrawerItemProps) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.drawerItem}>
        {icon}
        <Text style={styles.drawerText}>{label}</Text>
      </Pressable>
    </Link>
  );
}

function CustomDrawerContent(props: any) {
  const signOut = useAuth.use.signOut();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItem
          href="/(app)/(tabs)"
          label="Home"
          icon={<HomeIcon color={colors.neutral[100]} />}
        />
        <DrawerItem
          href="/(app)/(tabs)/nutrient-management"
          label="Nutrient Management"
          icon={<NutrientManagementIcon color={colors.neutral[100]} />}
        />
        <DrawerItem
          href="/(app)/(tabs)/nutrient-portfolio"
          label="Nutrient Portfolio"
          icon={<NutrientPortfolioIcon color={colors.neutral[100]} />}
        />
        <DrawerItem
          href="/(app)/(tabs)/settings"
          label="Profile"
          icon={<ProfileIcon color={colors.neutral[100]} />}
        />

        <View style={styles.divider} />

        <DrawerItem
          href="/(app)/(tabs)/privacy-statement"
          label="Privacy Statement"
          icon={<UnlockIcon color={colors.neutral[100]} />}
        />
        <DrawerItem
          href="/(app)/(tabs)/terms-of-use"
          label="Terms of Use"
          icon={<ClipboardIcon color={colors.neutral[100]} />}
        />
        <DrawerItem
          href="/(app)/(tabs)/password-policy"
          label="Password Policy"
          icon={<KeyIcon color={colors.neutral[100]} />}
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
      </View>
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
  );
}
