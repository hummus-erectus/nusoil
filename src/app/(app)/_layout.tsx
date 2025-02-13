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
  Home as HomeIcon,
  LampOn as LampOnIcon,
  Logout as LogoutIcon,
  NutrientPortfolio as NutrientPortfolioIcon,
  Settings as SettingsIcon,
  Shop as ShopIcon,
  Wallet as WalletIcon,
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
  const [isNavigating, setIsNavigating] = useState(false);

  const showAdvancedFeatures =
    subscriptionPlan === 'Mature' || subscriptionPlan === 'Harvest';
  const showHarvestFeatures = subscriptionPlan === 'Harvest';

  const handleDrawerItemPress = (href: DrawerRoute) => {
    if (isNavigating) return;
    setIsNavigating(true);

    // Start drawer close animation
    props.navigation.closeDrawer();

    // Navigate in the next frame after drawer close starts
    requestAnimationFrame(() => {
      router.push(href);
      // Reset navigation state after a shorter delay
      setTimeout(() => {
        setIsNavigating(false);
      }, 300);
    });
  };

  // Clean up navigation state when component unmounts
  useEffect(() => {
    return () => {
      setIsNavigating(false);
    };
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItem
          href="/"
          label="Home"
          icon={<HomeIcon color={colors.neutral[100]} />}
          onPress={() => handleDrawerItemPress('/')}
        />

        <DrawerItem
          href="/(app)/(tabs)/nutrient-portfolio"
          label="Nutrient Portfolio"
          icon={<NutrientPortfolioIcon color={colors.neutral[100]} />}
          onPress={() =>
            handleDrawerItemPress('/(app)/(tabs)/nutrient-portfolio')
          }
        />
        {showAdvancedFeatures && (
          <>
            <DrawerItem
              href="/(app)/(tabs)/marketplace"
              label="Marketplace"
              icon={<ShopIcon color={colors.neutral[100]} />}
              onPress={() => handleDrawerItemPress('/(app)/(tabs)/marketplace')}
            />
            <DrawerItem
              href="/(app)/(tabs)/add-on-services"
              label="Add-on Services"
              icon={<LampOnIcon color={colors.neutral[100]} />}
              onPress={() =>
                handleDrawerItemPress('/(app)/(tabs)/add-on-services')
              }
            />
          </>
        )}
        {showHarvestFeatures && (
          <DrawerItem
            href="/(app)/(tabs)/land-wallet"
            label="Land Wallet"
            icon={<WalletIcon color={colors.neutral[100]} />}
            onPress={() => handleDrawerItemPress('/(app)/(tabs)/land-wallet')}
          />
        )}

        {(subscriptionPlan === 'Seed' || subscriptionPlan === 'Mature') && (
          <Button
            variant="ghost"
            fullWidth={false}
            onPress={() => handleDrawerItemPress('/upgrade')}
            label={
              <View className="flex-row items-center justify-center">
                <Text className="ml-4 text-white underline">
                  Upgrade for more features!
                </Text>
              </View>
            }
          />
        )}

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
