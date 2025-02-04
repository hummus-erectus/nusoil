/* eslint-disable max-lines-per-function */
import { useNavigationState } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import colors from '@/components/ui/colors';
import {
  Home as HomeIcon,
  NutrientManagement as NutrientManagementIcon,
  NutrientPortfolio as NutrientPortfolioIcon,
  Profile as ProfileIcon,
} from '@/components/ui/icons';

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

interface CustomTabBarButtonProps {
  onPress?: (event: any) => void;
  style?: any;
  children: React.ReactNode;
  testID?: string;
  accessibilityState?: {
    selected?: boolean;
  };
}

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = (props) => {
  const { style, onPress, children, testID, accessibilityState } = props;
  const state = useNavigationState((state) => state);
  const activeIndex = state.index;
  let index = 0;
  if (testID === 'home-tab') {
    index = 0;
  } else if (testID === 'nutrient-management-tab') {
    index = 1;
  } else if (testID === 'nutrient-portfolio-tab') {
    index = 2;
  } else if (testID === 'settings-tab') {
    index = 3;
  }
  const isActive = accessibilityState?.selected;
  let extraStyle: any = {};
  if (isActive) {
    extraStyle = {
      backgroundColor: colors.neutral[100],
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
    };
  } else {
    extraStyle = { backgroundColor: colors.primary };
    if (index === activeIndex + 1) {
      extraStyle.borderTopLeftRadius = 50;
    } else if (index === activeIndex - 1) {
      extraStyle.borderTopRightRadius = 50;
    }
  }
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: isActive ? colors.primary : colors.neutral[100],
        }}
      />
      <Pressable
        onPress={onPress}
        style={[
          style,
          { flex: 1, alignItems: 'center', position: 'relative', zIndex: 1 },
          extraStyle,
        ]}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.neutral[100],
          borderTopWidth: 0,
          height: 110,
          paddingBottom: 0,
          position: 'relative',
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          borderRadius: 0,
          backgroundColor: colors.primary,
          marginHorizontal: 0,
          position: 'relative',
          height: '100%',
          paddingTop: 0,
          paddingBottom: 20,
          flex: 1,
        },
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: 'white',
        tabBarActiveBackgroundColor: colors.neutral[100],
        tabBarInactiveBackgroundColor: colors.primary[600],
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
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
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
          tabBarLabel: ({ color }) => (
            <TabLabel color={color} title="Profile" />
          ),
          tabBarButtonTestID: 'settings-tab',
        }}
      />

      {/* Hide from tabs but keep it in the navigation */}
      <Tabs.Screen
        name="privacy-statement"
        options={{
          href: null, // This prevents the tab from showing in the tab bar
        }}
      />

      <Tabs.Screen
        name="terms-of-use"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="password-policy"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="add-on-services"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="marketplace"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="land-wallet"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
