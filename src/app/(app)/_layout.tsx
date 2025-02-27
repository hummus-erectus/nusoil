/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-unstable-nested-components */

// import { Env } from '@env';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Link, Redirect, router, SplashScreen } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui';
import colors from '@/components/ui/colors';
import {
  NutrientPortfolio as NutrientPortfolioIcon,
  Plus as PlusIcon,
  Settings as SettingsIcon,
} from '@/components/ui/icons';
import { useAuth } from '@/lib';
import { useUserStore } from '@/stores/user-store';

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
    height: '100%',
    position: 'relative',
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
  | '/settings'
  | '/upgrade'
  | '/land-management'
  | '/land-management/add';

interface DrawerItemProps {
  href: DrawerRoute | string;
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

function DrawerItem({ href, label, icon, onPress }: DrawerItemProps) {
  return (
    <Link href={href as any} asChild>
      <Pressable style={styles.drawerItem} onPress={onPress}>
        {icon}
        <Text style={styles.drawerText}>{label}</Text>
      </Pressable>
    </Link>
  );
}

function CustomDrawerContent(props: any) {
  const subscriptionPlan = useUserStore((state) => state.subscriptionPlan);
  const userName = useUserStore((state) => state.userName);
  const email = useUserStore((state) => state.email);
  const lands = useUserStore((state) => state.lands);
  const setSelectedLandId = useUserStore((state) => state.setSelectedLandId);
  const [isNavigating, setIsNavigating] = useState(false);
  const MAX_DISPLAYED_LANDS = 5;

  const handleDrawerItemPress = (href: DrawerRoute) => {
    if (isNavigating) return;
    setIsNavigating(true);

    props.navigation.closeDrawer();

    requestAnimationFrame(() => {
      router.push(href as any);
      setTimeout(() => {
        setIsNavigating(false);
      }, 300);
    });
  };

  const handleLandPress = (landId: string) => {
    if (isNavigating) return;
    setIsNavigating(true);

    props.navigation.closeDrawer();
    setSelectedLandId(landId);

    requestAnimationFrame(() => {
      router.push('/(app)/(tabs)/nutrient-portfolio' as any);
      setTimeout(() => {
        setIsNavigating(false);
      }, 300);
    });
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: 40,
      }}
    >
      <View>
        {/* Profile Section */}
        <View
          style={[
            styles.drawerItem,
            { flexDirection: 'column', alignItems: 'flex-start', gap: 48 },
          ]}
        >
          <View className="gap-2">
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
          </View>
          <View className="flex-col items-start gap-2">
            <Text style={[styles.drawerText, { fontSize: 14 }]}>
              You are currently on the
            </Text>
            <View className="flex-row gap-6">
              <Text
                style={[styles.drawerText, { fontSize: 14 }]}
                className="font-bold"
              >
                {subscriptionPlan} Plan
              </Text>
              <Button
                variant="link"
                fullWidth={false}
                onPress={() => handleDrawerItemPress('/upgrade')}
                label={
                  <View>
                    <Text className="text-white underline">
                      {subscriptionPlan === 'Harvest' ? 'Manage' : 'Upgrade'}
                    </Text>
                  </View>
                }
              />
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Land Accounts List */}
        {lands.length > 0 ? (
          <View className="mt-2">
            <Text
              style={[
                styles.drawerText,
                {
                  fontSize: 16,
                  fontFamily: 'Poppins-semibold',
                  marginLeft: 20,
                  marginBottom: 6,
                },
              ]}
            >
              My Land Accounts
            </Text>

            {lands.slice(0, MAX_DISPLAYED_LANDS).map((land) => (
              <Pressable
                key={land.id}
                style={styles.drawerItem}
                onPress={() => handleLandPress(land.id)}
              >
                <NutrientPortfolioIcon color={colors.neutral[100]} />
                <Text
                  style={styles.drawerText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {land.farmLocationName || 'Unnamed Land'}
                </Text>
              </Pressable>
            ))}

            {lands.length > MAX_DISPLAYED_LANDS && (
              <View className="ml-20 mt-1">
                <Button
                  variant="link"
                  fullWidth={false}
                  onPress={() =>
                    handleDrawerItemPress('/land-management' as any)
                  }
                  label={
                    <View>
                      <Text className="text-white underline">
                        View all ({lands.length})
                      </Text>
                    </View>
                  }
                />
              </View>
            )}

            <Pressable
              style={[styles.drawerItem, { marginTop: 6 }]}
              onPress={() =>
                handleDrawerItemPress('/land-management/add' as any)
              }
            >
              <PlusIcon color={colors.neutral[100]} />
              <Text style={styles.drawerText}>Add Land Account</Text>
            </Pressable>

            <View style={styles.divider} />
          </View>
        ) : (
          <View className="mb-4 mt-2">
            <Text
              style={[
                styles.drawerText,
                {
                  fontSize: 16,
                  fontFamily: 'Poppins-semibold',
                  marginLeft: 20,
                  marginBottom: 6,
                },
              ]}
            >
              Land Accounts
            </Text>

            <View
              style={[
                styles.drawerItem,
                { flexDirection: 'column', alignItems: 'flex-start' },
              ]}
            >
              <Text
                style={[
                  styles.drawerText,
                  {
                    fontSize: 14,
                    color: colors.neutral[300],
                    marginBottom: 12,
                  },
                ]}
              >
                You haven't added any land accounts yet.
              </Text>

              <Button
                variant="outline"
                fullWidth={false}
                onPress={() =>
                  handleDrawerItemPress('/land-management/add' as any)
                }
                label={
                  <View className="flex-row items-center">
                    <PlusIcon color={colors.neutral[100]} />
                    <Text className="ml-2 text-white">Add Your First Land</Text>
                  </View>
                }
              />
            </View>

            <View style={styles.divider} />
          </View>
        )}
      </View>

      <DrawerItem
        onPress={() => props.navigation.closeDrawer()}
        href="/settings"
        label="Settings"
        icon={<SettingsIcon color={colors.neutral[100]} />}
      />

      {/* <Text className="mt-2 text-center text-xs text-neutral-400">
        v{Env?.VERSION ?? '0.0.2'}
      </Text> */}
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
