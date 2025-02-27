// Mock for react-native-gesture-handler
import { View } from 'react-native';

// Create a basic mock for the entire module
const mockGestureHandler = {
  // Add any specific handlers that are used in your app
  Swipeable: () => null,
  DrawerLayout: () => null,
  State: {
    UNDETERMINED: 0,
    FAILED: 1,
    BEGAN: 2,
    CANCELLED: 3,
    ACTIVE: 4,
    END: 5,
  },
  ScrollView: (_props: Record<string, unknown>) => View,
  Slider: () => null,
  Switch: () => null,
  TextInput: () => null,
  ToolbarAndroid: () => null,
  ViewPagerAndroid: () => null,
  DrawerLayoutAndroid: () => null,
  WebView: () => null,
  NativeViewGestureHandler: () => null,
  TapGestureHandler: () => null,
  FlingGestureHandler: () => null,
  ForceTouchGestureHandler: () => null,
  LongPressGestureHandler: () => null,
  PanGestureHandler: () => null,
  PinchGestureHandler: () => null,
  RotationGestureHandler: () => null,
  /* Buttons */
  RawButton: () => null,
  BaseButton: () => null,
  RectButton: () => null,
  BorderlessButton: () => null,
  /* Other */
  FlatList: () => null,
  gestureHandlerRootHOC: () => null,
  Directions: {},
};

module.exports = mockGestureHandler;
