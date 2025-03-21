import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { BackButton } from '@/components/back-button';
import { Pressable, Text, View } from '@/components/ui';
import { useUserStore } from '@/stores/user-store';

export default function Account() {
  const { userName, email, subscriptionPlan } = useUserStore();
  const router = useRouter();

  return (
    <KeyboardAwareScrollView
      bottomOffset={62}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 gap-6 p-6">
        <View className="-ml-10 self-start">
          <BackButton />
        </View>
        <Text className="text-center font-lora text-3xl text-primary">
          Account
        </Text>

        {/* Account Details */}
        <View className="gap-4">
          <Text className="font-poppins-semibold text-xl text-primary">
            Account Details
          </Text>
          <View className="gap-1">
            <Text className="font-poppins-semibold text-neutral-600">Name</Text>
            <Text className="text-neutral-500">{userName}</Text>
          </View>
          <View className="gap-1">
            <Text className="font-poppins-semibold text-neutral-600">
              Email
            </Text>
            <Text className="text-neutral-500">{email}</Text>
          </View>
        </View>

        {/* Your Plan */}
        <View className="gap-4">
          <Text className="font-poppins-semibold text-xl text-primary">
            Your Plan
          </Text>
          <View className="gap-2">
            <Text className="font-poppins-semibold text-neutral-600">
              Current Plan: {subscriptionPlan}
            </Text>
            <Pressable onPress={() => router.push('/upgrade')} className="mt-2">
              <Text className="font-poppins-semibold text-primary underline">
                See available plans
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
