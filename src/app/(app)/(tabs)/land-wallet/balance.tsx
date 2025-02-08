import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { FormCard } from '@/components/ui';

interface BalanceData {
  raisingCrop: number;
  lost: number;
  available: number;
}

// Dummy data for demonstration
const dummyBalanceData: BalanceData = {
  raisingCrop: 1250.5,
  lost: 150.75,
  available: 3500.25,
};

// Dummy nutrient data
const dummyNutrientData = {
  type: 'Organic Nitrogen',
  name: 'Legume Cover Crop Blend',
};

// Format the option string to be more readable
function formatOption(option: string): string {
  return option
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Balance() {
  const { accountName, option } = useLocalSearchParams<{
    accountName: string;
    option: string;
  }>();

  const formattedOption = formatOption(option || '');

  return (
    <>
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 gap-6 p-6">
          <Text className="text-center font-lora text-2xl text-primary">
            {accountName}
          </Text>
          <Text className="text-center font-lora text-lg text-primary">
            {formattedOption}
          </Text>
          <View className="gap-2">
            <Text className="font-lora text-xl text-primary">
              Nutrient Type
            </Text>
            <Text className="ml-2 font-poppins-bold text-lg text-neutral-600">
              {dummyNutrientData.type}
            </Text>
            <Text className="mt-2 font-lora text-xl text-primary">
              Nutrient Name
            </Text>
            <Text className="ml-2 font-poppins-bold text-lg text-neutral-600">
              {dummyNutrientData.name}
            </Text>
          </View>
          <View className="gap-4">
            <Text className="font-lora text-xl text-primary">Balance</Text>
            <FormCard>
              <View className="mt-2 gap-4">
                <Text className="ml-2 font-poppins-regular text-sm text-neutral-600">
                  Used for Raising Crop
                </Text>
                <Text className="ml-4 font-poppins-bold text-lg text-primary">
                  € {dummyBalanceData.raisingCrop.toFixed(2)}
                </Text>
              </View>
              <View className="mt-2 gap-4">
                <Text className="ml-2 font-poppins-regular text-sm text-neutral-600">
                  Lost
                </Text>
                <Text className="ml-4 font-poppins-bold text-lg text-danger">
                  € {dummyBalanceData.lost.toFixed(2)}
                </Text>
              </View>
              <View className="mt-2 gap-4">
                <Text className="ml-2 font-poppins-regular text-sm text-neutral-600">
                  Available
                </Text>
                <Text className="ml-4 font-poppins-bold text-lg text-success">
                  € {dummyBalanceData.available.toFixed(2)}
                </Text>
              </View>
            </FormCard>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
