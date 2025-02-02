/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-unstable-nested-components */
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Link, Redirect, SplashScreen } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/app-header';
import colors from '@/components/ui/colors';
import { useAuth } from '@/lib';

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  drawerLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: colors.neutral[600],
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <Link href="/(app)/(tabs)" asChild>
          <Pressable style={styles.drawerLabel}>
            <Text>Home</Text>
          </Pressable>
        </Link>
        <Link href="/(app)/(tabs)/nutrient-management" asChild>
          <Pressable style={styles.drawerLabel}>
            <Text>Nutrient Management</Text>
          </Pressable>
        </Link>
        <Link href="/(app)/(tabs)/nutrient-portfolio" asChild>
          <Pressable style={styles.drawerLabel}>
            <Text>Nutrient Portfolio</Text>
          </Pressable>
        </Link>
        <Link href="/(app)/(tabs)/settings" asChild>
          <Pressable style={styles.drawerLabel}>
            <Text>Profile</Text>
          </Pressable>
        </Link>
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
          backgroundColor: colors.neutral[100],
          width: 280,
        },
        drawerActiveTintColor: colors.primary[600],
        drawerInactiveTintColor: colors.neutral[600],
        swipeEnabled: true,
        drawerType: 'front',
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
