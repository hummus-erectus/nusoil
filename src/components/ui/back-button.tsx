import { router } from 'expo-router';

import { Text, View } from '@/components/ui';
import { Button } from '@/components/ui/button';
import colors from '@/components/ui/colors';
import { ArrowLeftFull as ArrowLeftFullIcon } from '@/components/ui/icons';

export function BackButton() {
  return (
    <Button
      variant="ghost"
      onPress={() => router.back()}
      fullWidth={false}
      label={
        <View className="flex-row items-center justify-center">
          <ArrowLeftFullIcon color={colors.neutral[600]} />
          <Text className="ml-4 text-neutral-600">Back</Text>
        </View>
      }
    />
  );
}
