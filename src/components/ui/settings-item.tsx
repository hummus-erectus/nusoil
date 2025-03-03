import { Pressable, Text, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import colors from './colors';

interface SettingsItemProps {
  icon: React.ComponentType<SvgProps>;
  title: string;
  features: string[];
  onPress?: () => void;
}

export function SettingsItem({
  icon: Icon,
  title,
  features,
  onPress,
}: SettingsItemProps) {
  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center p-4">
        <View className="mr-4">
          <Icon width={32} height={32} color={colors.primary} />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-primary">{title}</Text>
          <Text className="text-sm text-neutral-500">
            {features.join(' • ')}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
