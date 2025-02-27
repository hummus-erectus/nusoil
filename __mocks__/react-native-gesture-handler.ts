// Mock for react-native-gesture-handler
const mockGestureHandler = jest.requireActual(
  'react-native-gesture-handler/src/mocks.ts'
);

// Mock ScrollView component
mockGestureHandler.ScrollView = function ScrollView(
  _props: Record<string, unknown>
) {
  const { ScrollView } = require('react-native');
  return ScrollView;
};

module.exports = mockGestureHandler;
