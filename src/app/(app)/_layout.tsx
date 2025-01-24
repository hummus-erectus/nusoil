/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-unstable-nested-components */
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import colors from '@/components/ui/colors';
import {
  Home as HomeIcon,
  NutrientManagement as NutrientManagementIcon,
  NutrientPortfolio as NutrientPortfolioIcon,
  Profile as ProfileIcon,
} from '@/components/ui/icons';
import { useAuth, useIsFirstTime } from '@/lib';

const styles = StyleSheet.create({
  tabLabel: {
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 12,
    fontFamily: 'Poppins-Medium',
    flexWrap: 'wrap',
  },
});

interface TabLabelProps {
  color: string;
  title: string;
}

const TabLabel: React.FC<TabLabelProps> = ({ color, title }) => (
  <Text style={[styles.tabLabel, { color }]} numberOfLines={2}>
    {title}
  </Text>
);

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
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

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.neutral[100],
          borderTopWidth: 0,
          height: 90,
          paddingBottom: 0,
          position: 'relative',
        },
        tabBarItemStyle: {
          borderRadius: 0,
          marginHorizontal: 0,
          position: 'relative',
          height: '100%',
          paddingTop: 0,
          flex: 1,
        },
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: 'white',
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: colors.primary[600],
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarButton: (props) => {
          const { style, onPress, children } = props;
          const isActive = props.accessibilityState?.selected;
          return (
            <View style={{ flex: 1, position: 'relative' }}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: isActive
                    ? colors.primary
                    : colors.neutral[100],
                }}
              />
              <Pressable
                onPress={onPress}
                style={[
                  style,
                  {
                    flex: 1,
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1,
                  },
                  isActive && {
                    backgroundColor: colors.neutral[100],
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                  },
                  !isActive && {
                    backgroundColor: colors.primary,
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                  },
                ]}
              >
                {children}
              </Pressable>
            </View>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          tabBarLabel: ({ color }) => <TabLabel color={color} title="Home" />,
          tabBarButtonTestID: 'home-tab',
        }}
      />

      <Tabs.Screen
        name="nutrient-management"
        options={{
          title: 'Nutrient\nManagement',
          headerShown: false,
          tabBarIcon: ({ color }) => <NutrientManagementIcon color={color} />,
          tabBarLabel: ({ color }) => (
            <TabLabel color={color} title={`Nutrient\nManagement`} />
          ),
          tabBarButtonTestID: 'nutrient-management-tab',
        }}
      />

      <Tabs.Screen
        name="nutrient-portfolio"
        options={{
          title: 'Nutrient\nPortfolio',
          headerShown: false,
          tabBarIcon: ({ color }) => <NutrientPortfolioIcon color={color} />,
          tabBarLabel: ({ color }) => (
            <TabLabel color={color} title={`Nutrient\nPortfolio`} />
          ),
          tabBarButtonTestID: 'nutrient-portfolio-tab',
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
          tabBarLabel: ({ color }) => (
            <TabLabel color={color} title="Profile" />
          ),
          tabBarButtonTestID: 'settings-tab',
        }}
      />
    </Tabs>
  );
}
