/* eslint-disable max-lines-per-function */
import { TransitionPresets } from '@react-navigation/bottom-tabs';
import { Tabs as ExpoTabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';

import colors from '@/components/ui/colors';
import {
  Home as HomeIcon,
  NutrientPortfolio as NutrientPortfolioIcon,
  Shop as ShopIcon,
  Wallet as WalletIcon,
} from '@/components/ui/icons';

const styles = StyleSheet.create({
  tabLabel: {
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 12,
    fontFamily: 'Poppins-Regular',
    flexWrap: 'wrap',
  },
  tabLabelActive: {
    fontFamily: 'Poppins-Bold',
  },
});

interface TabLabelProps {
  color: string;
  title: string;
  focused?: boolean;
}

const TabLabel: React.FC<TabLabelProps> = ({ color, title, focused }) => (
  <Text
    style={[styles.tabLabel, focused && styles.tabLabelActive, { color }]}
    numberOfLines={2}
  >
    {title}
  </Text>
);

export default function TabsLayout() {
  return (
    <ExpoTabs
      screenOptions={{
        ...TransitionPresets.ShiftTransition,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 20,
          ...Platform.select({
            android: {
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.25,
              shadowRadius: 6,
              borderTopWidth: 1,
              borderTopColor: 'rgba(0,0,0,0.1)',
            },
            default: {
              borderTopWidth: 1,
              borderTopColor: 'rgba(0,0,0,0.2)',
            },
          }),
        },
        tabBarItemStyle: {
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primary,
      }}
    >
      <ExpoTabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon
              color={color}
              width={focused ? 28 : 24}
              height={focused ? 28 : 24}
            />
          ),
          tabBarLabel: ({ color, focused }) => (
            <TabLabel color={color} title="Home" focused={focused} />
          ),
        }}
      />
      <ExpoTabs.Screen
        name="nutrient-portfolio"
        options={{
          title: 'Nutrient Portfolio',
          tabBarIcon: ({ color, focused }) => (
            <NutrientPortfolioIcon
              color={color}
              width={focused ? 28 : 24}
              height={focused ? 28 : 24}
            />
          ),
          tabBarLabel: ({ color, focused }) => (
            <TabLabel
              color={color}
              title="Nutrient Portfolio"
              focused={focused}
            />
          ),
        }}
      />
      <ExpoTabs.Screen
        name="marketplace"
        options={{
          title: 'Marketplace',
          tabBarIcon: ({ color, focused }) => (
            <ShopIcon
              color={color}
              width={focused ? 28 : 24}
              height={focused ? 28 : 24}
            />
          ),
          tabBarLabel: ({ color, focused }) => (
            <TabLabel color={color} title="Marketplace" focused={focused} />
          ),
        }}
      />
      <ExpoTabs.Screen
        name="land-wallet"
        options={{
          title: 'Land Wallet',
          tabBarIcon: ({ color, focused }) => (
            <WalletIcon
              color={color}
              width={focused ? 28 : 24}
              height={focused ? 28 : 24}
            />
          ),
          tabBarLabel: ({ color, focused }) => (
            <TabLabel color={color} title="Land Wallet" focused={focused} />
          ),
        }}
      />

      <ExpoTabs.Screen
        name="add-on-services"
        options={{
          href: null,
        }}
      />
    </ExpoTabs>
  );
}
