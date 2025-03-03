import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

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
        <Text className="mt-10 text-center font-lora text-3xl text-primary">
          Account
        </Text>

        {/* Account Details */}
        <View className="gap-4">
          <Text className="font-poppins-bold text-xl text-primary">
            Account Details
          </Text>
          <View className="gap-2">
            <Text className="font-poppins-semibold text-neutral-600">
              Name: {userName}
            </Text>
            <Text className="font-poppins-semibold text-neutral-600">
              Email: {email}
            </Text>
          </View>
        </View>

        {/* Your Plan */}
        <View className="gap-4">
          <Text className="font-poppins-bold text-xl text-primary">
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
